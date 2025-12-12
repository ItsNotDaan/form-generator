import React from 'react';
import {BaseLayout} from '@/presentation/components/layout';
import {
  Button,
  Alert,
  AlertIcon,
  FormContainer,
  PageContainer,
} from '@/presentation/components/ui';
import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';
import {Routes} from '../../routes';
import {useAppSelector} from '@/domain/store/hooks';
import {BEHANDELAARS} from '@/presentation/form/constants/formConstants';
import {generateCodes} from '@/utils/codeGenerator';
import {
  findNavigationForWarning,
  getFormRoute,
  scrollToField,
} from '@/utils/warningNavigationMap';

export const FormResultsPageEnhanced = () => {
  const router = useRouter();
  const {t} = useTranslation('form');
  const [copied, setCopied] = React.useState(false);
  const formData = useAppSelector(state => state.formData);

  React.useEffect(() => {
    if (!formData.client) {
      router.push(Routes.form_new_client);
    }
  }, [formData.client, router]);

  if (!formData.client) {
    return null;
  }

  const normalizeValue = (value: any): any => {
    if (value === null || value === undefined) return '';
    if (typeof value === 'boolean') return value ? 'Ja' : '';
    if (typeof value === 'string') {
      if (value.toLowerCase() === 'yes') return 'Ja';
      if (value.toLowerCase() === 'no') return '';
      return value;
    }
    if (Array.isArray(value)) return value.map(normalizeValue);
    if (typeof value === 'object') return normalizeObject(value);
    return value;
  };

  const normalizeObject = (obj: any): any => {
    const normalized: any = {};
    for (const [key, value] of Object.entries(obj)) {
      normalized[key] = normalizeValue(value);
    }
    return normalized;
  };

  const generateCompleteJSON = () => {
    const resolvedClientData = formData.client
      ? normalizeObject({
          ...formData.client,
          practitionerName:
            BEHANDELAARS.find(p => p.value === formData.client?.practitionerId)
              ?.label || formData.client?.practitionerId,
        })
      : null;

    const result: any = {clientData: resolvedClientData};

    if (formData.intakeVLOS) result.intakeVLOS = normalizeObject(formData.intakeVLOS);
    if (formData.intakeOSA) result.intakeOSA = normalizeObject(formData.intakeOSA);
    if (formData.intakePulman) result.intakePulman = normalizeObject(formData.intakePulman);
    if (formData.intakeRebacare) result.intakeRebacare = normalizeObject(formData.intakeRebacare);
    if (formData.intakeOSB) result.intakeOSB = normalizeObject(formData.intakeOSB);
    if (formData.intakeOVAC) result.intakeOVAC = normalizeObject(formData.intakeOVAC);
    if (formData.intakeSteunzolen) result.intakeSteunzolen = normalizeObject(formData.intakeSteunzolen);

    if (formData.client && (formData.intakeVLOS || formData.intakeOSA || formData.intakeOSB)) {
      const {codes, warnings, generalBasiscode} = generateCodes(formData.client, {
        intakeVLOS: formData.intakeVLOS,
        intakeOSA: formData.intakeOSA,
        intakePulman: formData.intakePulman,
        intakeRebacare: formData.intakeRebacare,
        intakeOSB: formData.intakeOSB,
        intakeOVAC: formData.intakeOVAC,
        intakeSteunzolen: formData.intakeSteunzolen,
      });

      result.medicalCodes = normalizeObject(codes);

      if (generalBasiscode) {
        if (formData.intakeVLOS && result.intakeVLOS) result.intakeVLOS.generalBasiscode = generalBasiscode;
        if (formData.intakeOSA && result.intakeOSA) result.intakeOSA.generalBasiscode = generalBasiscode;
        if (formData.intakeOSB && result.intakeOSB) result.intakeOSB.generalBasiscode = generalBasiscode;
      }

      if (warnings.length > 0) result.codeWarnings = warnings;
    }

    result.generatedAt = new Date().toISOString();
    return result;
  };

  const jsonData = generateCompleteJSON();
  const jsonString = JSON.stringify(jsonData, null, 2);
  const codeWarnings = jsonData.codeWarnings as string[] | undefined;

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(jsonString).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    });
  };

  return (
    <BaseLayout
      showBackButton={true}
      onBackButtonClicked={() => router.push(Routes.overview)}
      currentStep={3}
    >
      <FormContainer>
        <PageContainer>
          {/* Header */}
          <div className="text-center space-y-3 pb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {t('formResultsTitle')}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('formResultsDescription')}
            </p>
          </div>

          {/* Success Alert */}
          <Alert status="success" className="rounded-xl">
            <AlertIcon status="success" />
            <span className="font-medium">{t('formDataComplete')}</span>
          </Alert>

          {/* Warnings */}
          {codeWarnings && codeWarnings.length > 0 && (
            <Alert status="warning" className="rounded-xl">
              <AlertIcon status="warning" />
              <div className="flex-1">
                <p className="font-bold mb-3">{t('codeWarningsTitle')}</p>
                <ul className="space-y-2">
                  {codeWarnings.map((warning, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-sm flex-1">{warning}</span>
                      <button
                        onClick={() => {
                          const nav = findNavigationForWarning(warning);
                          if (nav) {
                            const route = getFormRoute(nav.formType);
                            router.push(route).then(() => scrollToField(nav.fieldId));
                          }
                        }}
                        className="text-sm text-brand-600 hover:text-brand-700 font-medium underline whitespace-nowrap"
                      >
                        {t('goToField')}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </Alert>
          )}

          {/* JSON Output */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {t('jsonOutput')}
            </h2>
            <div className="bg-gray-900 rounded-xl p-6 overflow-x-auto">
              <pre className="text-sm font-mono text-green-400">
                {jsonString}
              </pre>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-between sm:justify-end pt-4">
            <Button
              variant="secondary"
              size="lg"
              onClick={handleCopyJSON}
              className="w-full sm:w-auto min-w-[180px]"
            >
              {copied ? '✓ ' + t('jsonCopied') : t('copyJSON')}
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push(Routes.overview)}
              className="w-full sm:w-auto min-w-[180px]"
            >
              {t('backToStart')}
            </Button>
          </div>
        </PageContainer>
      </FormContainer>
    </BaseLayout>
  );
};

export default FormResultsPageEnhanced;
