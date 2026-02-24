import React, {useState} from 'react';
import {BaseLayout, FormSection, FormFooter} from '@/components/layout';
import {Button} from '@/components/ui/button';
import {Separator} from '@/components/ui/separator';
import {CheckCircle2, AlertTriangle, Copy, Check} from 'lucide-react';
import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';
import {Routes} from '@/lib/routes';
import {useAppSelector} from '@/domain/store/hooks';
import {PRACTITIONERS} from '@/domain/form/constants/formConstants';
import {generateCodes} from '@/domain/form/generators/codeGenerator';
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
  normalizeIntakeSteunzolenData,
  normalizeCheckFoliepasData,
  normalizeShoeDesignData,
  normalizeValue,
} from '@/domain/form/normalizers/formDataNormalizer';

const FormResultsPage = () => {
  const router = useRouter();
  const {t} = useTranslation('form');
  const formData = useAppSelector(state => state.formData);
  const [copied, setCopied] = useState(false);
  const [copiedAndRedirected, setCopiedAndRedirected] = useState(false);

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
    checkFoliepas?: Record<string, string>;
    shoeDesign?: Record<string, string>;
    medicalCodes?: Record<string, string>;
    codeWarnings?: string[];
    generatedAt: string;
  }

  // ---------------------------------------------------------------------------
  // HELPER FUNCTIONS
  // ---------------------------------------------------------------------------

  // Helper function to apply translations to normalized data
  const applyTranslations = (
    data: Record<string, string>,
  ): Record<string, string> => {
    const translated: Record<string, string> = {};

    const translateIfAvailable = (val: string): string => {
      const maybe = t(val);
      return maybe === val ? val : maybe;
    };

    for (const [key, value] of Object.entries(data)) {
      // Handle aggregated values (e.g., "hmsn + degeneratie")
      // These contain field labels separated by " + " that need translation
      if (key.startsWith('all') && value.includes(' + ')) {
        const translatedLabels = value
          .split(' + ')
          .map(label => translateIfAvailable(label.trim()))
          .join(' + ');
        translated[key] = translatedLabels;
      }
      // Translate value if a translation exists; otherwise keep as-is
      else {
        translated[key] = translateIfAvailable(value);
      }
    }
    return translated;
  };

  // ---------------------------------------------------------------------------
  // FORM CONFIGURATION
  // ---------------------------------------------------------------------------

  // Configuration mapping for intake form types
  const INTAKE_FORM_CONFIG = {
    VLOS: {
      key: 'intakeVLOS' as const,
      normalizer: normalizeIntakeVLOSData,
      data: formData.intakeVLOS,
    },
    OSA: {
      key: 'intakeOSA' as const,
      normalizer: normalizeIntakeOSAData,
      data: formData.intakeOSA,
    },
    Pulman: {
      key: 'intakePulman' as const,
      normalizer: normalizeIntakePulmanData,
      data: formData.intakePulman,
    },
    Rebacare: {
      key: 'intakeRebacare' as const,
      normalizer: normalizeIntakeRebacareData,
      data: formData.intakeRebacare,
    },
    OSB: {
      key: 'intakeOSB' as const,
      normalizer: normalizeIntakeOSBData,
      data: formData.intakeOSB,
    },
    OVAC: {
      key: 'intakeOVAC' as const,
      normalizer: normalizeIntakeOVACData,
      data: formData.intakeOVAC,
    },
    Steunzolen: {
      key: 'intakeInsoles' as const,
      normalizer: normalizeIntakeSteunzolenData,
      data: formData.intakeInsoles,
    },
  };

  const INTAKE_TYPES_WITH_CODES = new Set(['VLOS', 'OSA', 'OSB', 'OVAC']);

  const flattenCodes = (codes: Record<string, any>): Record<string, string> => {
    const flattened: Record<string, string> = {};
    for (const [key, value] of Object.entries(codes)) {
      if (typeof value === 'object' && value !== null) {
        for (const [nestedKey, nestedValue] of Object.entries(value)) {
          flattened[`${key}_${nestedKey}`] = normalizeValue(nestedValue);
        }
      } else {
        flattened[key] = normalizeValue(value);
      }
    }
    return flattened;
  };

  const addGeneralBaseCode = (
    result: FormResultJSON,
    generalBaseCode: string,
  ) => {
    const CODES_BY_TYPE: Record<string, keyof FormResultJSON> = {
      intakeVLOS: 'intakeVLOS',
      intakeOSA: 'intakeOSA',
      intakeOSB: 'intakeOSB',
    };

    for (const [dataKey, resultKey] of Object.entries(CODES_BY_TYPE)) {
      if ((formData as any)[dataKey] && result[resultKey]) {
        (result[resultKey] as any).generalBaseCode = generalBaseCode;
      }
    }
  };

  // ---------------------------------------------------------------------------
  // JSON GENERATION
  // ---------------------------------------------------------------------------

  // Generate complete JSON with all data and constants
  const generateCompleteJSON = (): FormResultJSON => {
    //Generate normalized client data
    const normalizedClientData = normalizeClientData(formData.client);
    const practitionerName =
      PRACTITIONERS.find(p => p.value === formData.client?.practitionerId)
        ?.label ||
      formData.client?.practitionerId ||
      '';

    const result: FormResultJSON = {
      clientData: applyTranslations({
        ...normalizedClientData,
        practitionerName,
      }),
      generatedAt: new Date().toISOString(),
    };

    // Add the matching intake form data
    const config =
      INTAKE_FORM_CONFIG[
        formData.client.intakeType as keyof typeof INTAKE_FORM_CONFIG
      ];
    if (config?.data) {
      (result as any)[config.key] = applyTranslations(
        config.normalizer(config.data),
      );
    }

    // Only add CheckFoliepas data when it has been actively submitted
    if (formData.checkFoliepas) {
      result.checkFoliepas = applyTranslations(
        normalizeCheckFoliepasData(formData.checkFoliepas),
      );
    }

    // Only add ShoeDesign data when it has been actively submitted
    if (formData.shoeDesign) {
      result.shoeDesign = applyTranslations(
        normalizeShoeDesignData(formData.shoeDesign),
      );
    }

    // Generate medical codes if applicable
    if (INTAKE_TYPES_WITH_CODES.has(formData.client.intakeType)) {
      const {codes, warnings, generalBaseCode} = generateCodes(
        formData.client,
        {
          intakeVLOS: formData.intakeVLOS || null,
          intakeOSA: formData.intakeOSA || null,
          intakeOSB: formData.intakeOSB || null,
          intakeOVAC: formData.intakeOVAC || null,
          intakePulman: null,
          intakeRebacare: null,
          intakeInsoles: formData.intakeInsoles || null,
        },
      );

      result.medicalCodes = flattenCodes(codes);

      if (generalBaseCode) {
        addGeneralBaseCode(result, generalBaseCode);
      }

      if (warnings.length > 0) {
        result.codeWarnings = warnings;
      }
    }

    return result;
  };

  const jsonData = generateCompleteJSON();
  const jsonString = JSON.stringify(jsonData, null, 2);
  const codeWarnings = jsonData.codeWarnings as string[] | undefined;

  // ---------------------------------------------------------------------------
  // EVENT HANDLERS
  // ---------------------------------------------------------------------------

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

  const handleCopyJSONAndRedirect = () => {
    navigator.clipboard
      .writeText(jsonString)
      .then(() => {
        setCopiedAndRedirected(true);
        setTimeout(() => setCopiedAndRedirected(false), 2000);

        // Redirect to google.com in a new tab after a small delay to show the feedback
        setTimeout(() => {
          window.open('https://app.proculgroep.nl/client', '_blank');
        }, 700);
      })
      .catch(() => {
        // Handle clipboard error silently
      });
  };

  // ---------------------------------------------------------------------------
  // RENDER HELPERS
  // ---------------------------------------------------------------------------

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

  // ---------------------------------------------------------------------------
  // PAGE RENDER
  // ---------------------------------------------------------------------------

  return (
    <BaseLayout title={t('formResults')} currentStep={4}>
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

            <div className="flex justify-center gap-2">
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
              <Button
                onClick={handleCopyJSONAndRedirect}
                className="flex items-center gap-2"
              >
                {/* This state is set by the handleCopyJSONAndRedirect function */}
                {copiedAndRedirected ? (
                  <>
                    {/* Shows a checkmark with the text: Copied! */}
                    <Check className="w-4 h-4" />
                    {t('copiedAndRedirected')}
                  </>
                ) : (
                  <>
                    {/* Shows a copy icon with the text: Copy & Open */}
                    <Copy className="w-4 h-4" />
                    {t('copyAndRedirect')}
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
                {formData.checkFoliepas &&
                  renderSection(t('checkFoliepas'), formData.checkFoliepas)}
                {formData.shoeDesign &&
                  renderSection(t('createShoeDesign'), formData.shoeDesign)}
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
                  // centerItems={false}
                  // centerTitle={false}
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
