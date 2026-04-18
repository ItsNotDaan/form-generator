import React, {useEffect, useState} from 'react';
import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';
import {Upload, X, CheckCircle2, AlertTriangle, ClipboardPaste} from 'lucide-react';
import {Button} from '@/components/ui/button';
import {Textarea} from '@/components/ui/textarea';
import {Checkbox} from '@/components/ui/checkbox';
import {Label} from '@/components/ui/label';
import {useAppDispatch} from '@/domain/store/hooks';
import {importFormData, clearFormData} from '@/domain/store/slices/formData';
import {Routes} from '@/lib/routes';
import type {FormRawData, FormStoreKey} from '@/domain/form/types/importExport';
import type {FormDataState} from '@/domain/store/slices/formData';
import {FORM_REGISTRY, INTAKE_FORM_BY_TYPE} from '@/domain/form/registry';
import {
  saveToLocalStorage,
  clearAllFormStorage,
  saveStepRoute,
  clearStepRoute,
} from '@/utils/localStorageHelper';

// ---------------------------------------------------------------------------
// TYPES
// ---------------------------------------------------------------------------

type ImportableFormKey = FormStoreKey;

// ---------------------------------------------------------------------------
// COMPONENT
// ---------------------------------------------------------------------------

interface ImportDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

type ParseStep = 'input' | 'select' | 'success';

export const ImportDialog: React.FC<ImportDialogProps> = ({
  isOpen,
  onClose,
}) => {
  const {t} = useTranslation('form');
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [step, setStep] = useState<ParseStep>('input');
  const [jsonInput, setJsonInput] = useState('');
  const [parseError, setParseError] = useState('');
  const [rawData, setRawData] = useState<FormRawData | null>(null);
  const [selectedForms, setSelectedForms] = useState<Set<ImportableFormKey>>(
    new Set(),
  );

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Reset state when dialog opens
  useEffect(() => {
    if (isOpen) {
      setStep('input');
      setJsonInput('');
      setParseError('');
      setRawData(null);
      setSelectedForms(new Set());
    }
  }, [isOpen]);

  // ---------------------------------------------------------------------------
  // HELPERS
  // ---------------------------------------------------------------------------

  const handleClose = () => {
    onClose();
  };

  const getAvailableForms = (data: FormRawData): ImportableFormKey[] => {
    return FORM_REGISTRY.filter(f => data[f.storeKey] !== undefined).map(
      f => f.storeKey as ImportableFormKey,
    );
  };

  // ---------------------------------------------------------------------------
  // EVENT HANDLERS
  // ---------------------------------------------------------------------------

  const handleAnalyze = (textOverride?: string) => {
    setParseError('');

    const text = textOverride !== undefined ? textOverride : jsonInput;
    let parsed: unknown;
    try {
      parsed = JSON.parse(text.trim());
    } catch {
      setParseError(t('importError'));
      return;
    }

    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      !('_rawData' in parsed)
    ) {
      setParseError(t('importNoRawData'));
      return;
    }

    const raw = (parsed as {_rawData: unknown})._rawData;
    if (typeof raw !== 'object' || raw === null || !('client' in raw)) {
      setParseError(t('importNoRawData'));
      return;
    }

    // Issue 5: Reset all form data and autosave before loading import data.
    // Also clear all step routes so stale routes from a previous session
    // (e.g. an earlier OSA form) cannot show up in the step indicator or popup.
    dispatch(clearFormData());
    clearAllFormStorage();
    clearStepRoute(1);
    clearStepRoute(2);
    clearStepRoute(3);
    clearStepRoute(4);

    const validRawData = raw as FormRawData;
    setRawData(validRawData);

    // Pre-select all available forms
    const available = getAvailableForms(validRawData);
    setSelectedForms(new Set(available));

    setStep('select');
  };

  const handlePasteAndAnalyze = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setJsonInput(text);
      handleAnalyze(text);
    } catch {
      setParseError(t('importError'));
    }
  };

  const toggleForm = (key: ImportableFormKey) => {
    setSelectedForms(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const handleImport = () => {
    if (!rawData) {
      return;
    }

    // Build the client data – potentially strip intakeType if the intake form was deselected
    const clientData = {...rawData.client};
    if (clientData.intakeType) {
      const intakeEntry = INTAKE_FORM_BY_TYPE[clientData.intakeType];
      if (
        intakeEntry &&
        !selectedForms.has(intakeEntry.storeKey as ImportableFormKey)
      ) {
        // Issue 1: user deselected this intake form – remove intakeType so it
        // doesn't appear in the JSON output on the results page
        delete (clientData as Partial<typeof clientData>).intakeType;
      }
    }

    // Build the partial state to import – always include (possibly modified) client data
    const toImport: Partial<FormDataState> = {
      client: clientData,
    };

    for (const key of Array.from(selectedForms)) {
      const value = rawData[key as keyof FormRawData];
      if (value !== undefined) {
        (toImport as Record<string, unknown>)[key] = value;

        // Issue 4: persist to form_autosave_* so form pages load the data via useFormPersistence
        const entry = FORM_REGISTRY.find(f => f.storeKey === key);
        if (entry) {
          saveToLocalStorage(entry.storageKey, value);
        }
      }
    }

    dispatch(importFormData(toImport));

    // Save step routes so the step indicator is lit up and the "continue" popup
    // appears in form-selection with the correct form name.

    // Step 1 = the client form page (new or existing client)
    if (clientData.clientType === 'newClient') {
      saveStepRoute(1, Routes.form_new_client);
    } else if (clientData.clientType === 'oldClient') {
      saveStepRoute(1, Routes.form_old_client);
    }

    // Step 2 = form-selection (the page we're about to navigate to)
    saveStepRoute(2, Routes.form_selection);

    // Step 3 = the imported intake form route (if one was selected)
    if (clientData.intakeType) {
      const intakeEntry = INTAKE_FORM_BY_TYPE[clientData.intakeType];
      if (intakeEntry) {
        saveStepRoute(3, intakeEntry.route);
        clearStepRoute(4);
      }
    }

    setStep('success');

    // Always redirect to form-selection so the user can pick/continue a form
    setTimeout(() => {
      handleClose();
      void router.push(Routes.form_selection);
    }, 1200);
  };

  // ---------------------------------------------------------------------------
  // RENDER
  // ---------------------------------------------------------------------------

  if (!isOpen) {
    return null;
  }

  const availableForms = rawData ? getAvailableForms(rawData) : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="import-dialog-title"
        className="relative z-10 bg-background border border-border rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <div className="flex items-center gap-3">
            <Upload className="w-5 h-5 text-primary" />
            <h2 id="import-dialog-title" className="text-xl font-semibold">
              {t('importTitle')}
            </h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleClose}
            aria-label={t('cancel')}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 flex-1 flex flex-col gap-5">
          {/* Step 1: JSON input */}
          {step === 'input' && (
            <>
              <p className="text-sm text-muted-foreground">
                {t('importDescription')}
              </p>

              <div className="flex flex-col gap-2">
                <Label htmlFor="import-json-input">
                  {t('importJsonLabel')}
                </Label>
                <Textarea
                  id="import-json-input"
                  value={jsonInput}
                  onChange={e => setJsonInput(e.target.value)}
                  placeholder={t('importJsonPlaceholder')}
                  className="font-mono text-xs min-h-48 resize-y"
                  aria-invalid={parseError ? true : undefined}
                />
                {parseError && (
                  <div className="flex items-center gap-2 text-destructive text-sm">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>{parseError}</span>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3">
                <Button variant="outline" onClick={handleClose}>
                  {t('cancel')}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => void handlePasteAndAnalyze()}
                >
                  <ClipboardPaste className="w-4 h-4 mr-2" />
                  {t('importPasteAndAnalyze')}
                </Button>
                <Button onClick={() => handleAnalyze()} disabled={!jsonInput.trim()}>
                  {t('importAnalyze')}
                </Button>
              </div>
            </>
          )}

          {/* Step 2: Form selection */}
          {step === 'select' && rawData && (
            <>
              <p className="text-sm text-muted-foreground">
                {t('importSelectFormsDescription')}
              </p>

              <div className="flex flex-col gap-3">
                {/* Client data – always selected, disabled */}
                <div className="flex items-center gap-3 p-3 rounded-md border bg-muted/50">
                  <Checkbox checked disabled />
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">
                      {t('importFormClient')}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {t('importFormAlwaysSelected')}
                    </span>
                  </div>
                </div>

                {/* Optional forms – derived from registry */}
                {availableForms.length === 0 && (
                  <p className="text-sm text-muted-foreground italic">
                    {t('importNoFormsAvailable')}
                  </p>
                )}
                {FORM_REGISTRY.filter(entry =>
                  availableForms.includes(entry.storeKey as ImportableFormKey),
                ).map(entry => (
                  <label
                    key={entry.storeKey}
                    className="flex items-center gap-3 p-3 rounded-md border cursor-pointer hover:bg-accent/30 transition-colors"
                  >
                    <Checkbox
                      checked={selectedForms.has(
                        entry.storeKey as ImportableFormKey,
                      )}
                      onCheckedChange={() =>
                        toggleForm(entry.storeKey as ImportableFormKey)
                      }
                    />
                    <span className="text-sm font-medium">
                      {t(entry.labelKey)}
                    </span>
                  </label>
                ))}
              </div>

              <div className="flex justify-end gap-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setStep('input');
                    setParseError('');
                  }}
                >
                  {t('cancel')}
                </Button>
                <Button onClick={handleImport}>{t('importConfirm')}</Button>
              </div>
            </>
          )}

          {/* Step 3: Success */}
          {step === 'success' && (
            <div className="flex flex-col items-center gap-4 py-6">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
              <div className="text-center">
                <p className="text-lg font-semibold">{t('importSuccess')}</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {t('importSuccessDescription')}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
