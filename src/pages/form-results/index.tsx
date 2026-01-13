import React, {useState} from 'react';
import {BaseLayout, FormSection, FormFooter} from '@/components/layout';
import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';
import {CheckCircle2, AlertTriangle, Copy, Check} from 'lucide-react';
import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';
import {Routes} from '@/lib/routes';
import {useAppSelector} from '@/domain/store/hooks';
import {PRACTITIONERS} from '@/lib/constants/formConstants';
import {generateCodes} from '@/utils/codeGenerator';
import {clearAllFormStorage} from '@/utils/localStorageHelper';
import {FormBlock, FormCard, FormItemWrapper} from '@/components/ui/form-block';
import {
  normalizeClientData,
  normalizeIntakeVLOSData,
  normalizeIntakeOSAData,
  normalizeIntakePulmanData,
  normalizeIntakeRebacareData,
  normalizeIntakeOSBData,
  normalizeIntakeOVACData,
  normalizeIntakeInsolesData,
} from '@/utils/formDataNormalizer';

const FormResultsPage = () => {
  const router = useRouter();
  const {t} = useTranslation('form');
  const formData = useAppSelector(state => state.formData);
  const [copied, setCopied] = useState(false);

  // If no client data exists, redirect to new client page
  React.useEffect(() => {
    if (!formData.client) {
      void router.push(Routes.form_new_client);
    }
  }, [formData.client, router]);

  if (!formData.client) {
    return null;
  }

  // Type for the complete JSON result
  interface FormResultJSON {
    clientData: Record<string, string>;
    intakeVLOS?: Record<string, string>;
    intakeOSA?: Record<string, string>;
    intakePulman?: Record<string, string>;
    intakeRebacare?: Record<string, string>;
    intakeOSB?: Record<string, string>;
    intakeOVAC?: Record<string, string>;
    intakeInsoles?: Record<string, string>;
    medicalCodes?: Record<string, string>;
    codeWarnings?: string[];
    generatedAt: string;
  }

  // Generate complete JSON with all data and constants
  const generateCompleteJSON = (): FormResultJSON => {
    // Normalize and resolve client data
    const normalizedClientData = normalizeClientData(formData.client);
    const practitionerName =
      PRACTITIONERS.find(p => p.value === formData.client?.practitionerId)
        ?.label ||
      formData.client?.practitionerId ||
      '';

    // Build result object with normalized data
    const result: FormResultJSON = {
      clientData: {
        ...normalizedClientData,
        practitionerName,
      },
      generatedAt: new Date().toISOString(),
    };

    // Normalize and include intake forms with complete field sets
    if (formData.intakeVLOS) {
      result.intakeVLOS = normalizeIntakeVLOSData(formData.intakeVLOS);
    }
    if (formData.intakeOSA) {
      result.intakeOSA = normalizeIntakeOSAData(formData.intakeOSA);
    }
    if (formData.intakePulman) {
      result.intakePulman = normalizeIntakePulmanData(formData.intakePulman);
    }
    if (formData.intakeRebacare) {
      result.intakeRebacare = normalizeIntakeRebacareData(
        formData.intakeRebacare,
      );
    }
    if (formData.intakeOSB) {
      result.intakeOSB = normalizeIntakeOSBData(formData.intakeOSB);
    }
    if (formData.intakeOVAC) {
      result.intakeOVAC = normalizeIntakeOVACData(formData.intakeOVAC);
    }
    if (formData.intakeInsoles) {
      result.intakeInsoles = normalizeIntakeInsolesData(formData.intakeInsoles);
    }

    // Generate medical codes if applicable
    if (
      formData.client &&
      (formData.intakeVLOS || formData.intakeOSA || formData.intakeOSB)
    ) {
      const {codes, warnings, generalBaseCode} = generateCodes(
        formData.client,
        {
          intakeVLOS: formData.intakeVLOS,
          intakeOSA: formData.intakeOSA,
          intakePulman: formData.intakePulman,
          intakeRebacare: formData.intakeRebacare,
          intakeOSB: formData.intakeOSB,
          intakeOVAC: formData.intakeOVAC,
          intakeInsoles: formData.intakeInsoles,
        },
      );

      // Flatten medical codes to simple key-value pairs
      // Note: Using underscore as separator (e.g., "vlos_code" from nested {vlos: {code: "1"}})
      // This is safe as code keys don't contain underscores in the current implementation
      const flattenedCodes: Record<string, string> = {};
      for (const [key, value] of Object.entries(codes)) {
        if (typeof value === 'object' && value !== null) {
          // Flatten nested code objects
          for (const [nestedKey, nestedValue] of Object.entries(value)) {
            flattenedCodes[`${key}_${nestedKey}`] =
              nestedValue?.toString() || '';
          }
        } else {
          flattenedCodes[key] = value?.toString() || '';
        }
      }
      result.medicalCodes = flattenedCodes;

      // Add generalBaseCode to the appropriate intake data
      if (generalBaseCode) {
        if (formData.intakeVLOS && result.intakeVLOS) {
          result.intakeVLOS.generalBaseCode = generalBaseCode;
        }
        if (formData.intakeOSA && result.intakeOSA) {
          result.intakeOSA.generalBaseCode = generalBaseCode;
        }
        if (formData.intakeOSB && result.intakeOSB) {
          result.intakeOSB.generalBaseCode = generalBaseCode;
        }
      }

      // Add warnings if any
      if (warnings.length > 0) {
        result.codeWarnings = warnings;
      }
    }

    return result;
  };

  const jsonData = generateCompleteJSON();
  const jsonString = JSON.stringify(jsonData, null, 2);
  const codeWarnings = jsonData.codeWarnings as string[] | undefined;

  const handleCopyJSON = () => {
    navigator.clipboard
      .writeText(jsonString)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => {
        // Handle clipboard error silently
      });
  };

  const renderFieldValue = (label: string, value: any) => {
    if (value === null || value === undefined || value === '') {
      return null;
    }

    let displayValue = value;
    if (typeof value === 'boolean') {
      displayValue = value ? t('yes') : t('no');
    } else if (typeof value === 'object') {
      displayValue = JSON.stringify(value);
    }

    return (
      <FormItemWrapper
        key={label}
        centerItems={false}
        centerTitle={false}
        label={label}
      >
        <p className="text-md text-foreground wrap-break-word">
          {displayValue}
        </p>
      </FormItemWrapper>
    );
  };

  const renderSection = (title: string, data: any) => {
    if (!data) {
      return null;
    }

    return (
      <div className="flex flex-col gap-4">
        <h3 className="text-lg font-bold">{title}</h3>
        <div className="grid gap-3 md:grid-cols-2">
          {Object.entries(data).map(([key, value]) =>
            renderFieldValue(key, value),
          )}
        </div>
      </div>
    );
  };

  return (
    <BaseLayout title={t('formResults')}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-3 mb-12">
          <h1 className="text-4xl font-bold text-foreground">
            {t('formResultsTitle')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('formResultsDescription')}
          </p>
        </div>

        <FormSection>
          <div className="flex flex-col gap-6">
            {/* Alle formuliergegevens zijn succesvol opgeslagen. */}
            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-md">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <p className="text-sm">{t('formDataComplete')}</p>
            </div>

            {codeWarnings && codeWarnings.length > 0 && (
              <div className="flex flex-col gap-3 p-4 bg-orange-50 border border-orange-200 rounded-md">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-orange-600" />
                  <p className="font-bold">{t('codeWarnings')}:</p>
                </div>
                <div className="flex flex-col gap-2 ml-6">
                  {codeWarnings.map((warning, idx) => (
                    <div
                      key={idx}
                      className="flex justify-between items-center gap-2"
                    >
                      <p className="text-sm">{warning}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="flex justify-center">
              <Button
                onClick={handleCopyJSON}
                className="flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    {t('copied') ?? 'Copied!'}
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    {t('copyJson')}
                  </>
                )}
              </Button>
            </div>

            {/* Alle gegevens van het formulier */}
            <FormBlock
              columns={1}
              responsive
              alignItems="stretch"
              centerTitle={false}
            >
              {/* De ingediende gegevens */}
              <FormCard
                title={t('submittedData')}
                description={t('formResultsDescription')}
                toggleAble
                toggleLabel="Open/Sluit"
                defaultOpen={false}
                contentClassName="space-y-6"
              >
                {renderSection(t('clientData'), formData.client)}

                {formData.intakeVLOS &&
                  renderSection(t('intakeVlos'), formData.intakeVLOS)}
                {formData.intakeOSA &&
                  renderSection(t('intakeOsa'), formData.intakeOSA)}
                {formData.intakePulman &&
                  renderSection(t('intakePulman'), formData.intakePulman)}
                {formData.intakeRebacare &&
                  renderSection(t('intakeRebacare'), formData.intakeRebacare)}
                {formData.intakeOSB &&
                  renderSection(t('intakeOsb'), formData.intakeOSB)}
                {formData.intakeOVAC &&
                  renderSection(t('intakeOvac'), formData.intakeOVAC)}
                {formData.intakeInsoles &&
                  renderSection(t('intakeInsoles'), formData.intakeInsoles)}
              </FormCard>

              {/* De volledige JSON output */}
              <FormCard
                title={t('jsonOutput')}
                description={t('jsonOutputDescription')}
                toggleAble
                toggleLabel="Open/Sluit"
                defaultOpen
              >
                <FormItemWrapper
                  centerItems={false}
                  centerTitle={false}
                  label={t('jsonOutput')}
                >
                  <pre className="p-4 bg-gray-50 rounded-md border border-gray-200 max-h-125 overflow-y-auto text-sm whitespace-pre-wrap wrap-break-word font-mono">
                    {jsonString}
                  </pre>
                </FormItemWrapper>
              </FormCard>
            </FormBlock>
          </div>

          <Separator />

          <FormFooter>
            <Button
              variant="outline"
              onClick={() => {
                clearAllFormStorage();
                void router.push(Routes.form_selection);
              }}
            >
              {t('fillAnotherForm')}
            </Button>
            <Button
              onClick={() => {
                clearAllFormStorage();
                void router.push(Routes.overview);
              }}
            >
              {t('backToOverview')}
            </Button>
          </FormFooter>
        </FormSection>
      </div>
    </BaseLayout>
  );
};

export default FormResultsPage;
