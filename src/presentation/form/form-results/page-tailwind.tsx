import React from 'react';
import {BaseLayout} from '@/presentation/components/layout';
import {Button, Alert, AlertIcon} from '@/presentation/components/ui';
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

export const FormResultsPageTailwind = () => {
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
      title={t('formResults')}
      showBackButton={true}
      onBackButtonClicked={() => router.push(Routes.overview)}
    >
      <div className="w-full flex flex-col bg-white p-4 md:p-6 rounded-md gap-4 md:gap-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">{t('formResultsTitle')}</h1>
          <p className="text-base text-gray-600">{t('formResultsDescription')}</p>
        </div>

        <Alert status="success">
          <AlertIcon status="success" />
          <span>{t('formDataComplete')}</span>
        </Alert>

        {codeWarnings && codeWarnings.length > 0 && (
          <Alert status="warning">
            <AlertIcon status="warning" />
            <div>
              <p className="font-bold mb-2">{t('codeWarningsTitle')}</p>
              <ul className="list-disc list-inside">
                {codeWarnings.map((warning, idx) => (
                  <li key={idx} className="text-sm">
                    {warning}
                    <button
                      onClick={() => {
                        const nav = findNavigationForWarning(warning);
                        if (nav) {
                          const route = getFormRoute(nav.formType);
                          router.push(route).then(() => scrollToField(nav.fieldId));
                        }
                      }}
                      className="ml-2 text-brand-500 hover:text-brand-700 underline"
                    >
                      {t('goToField')}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </Alert>
        )}

        <div className="border-t border-gray-200" />

        <div>
          <h2 className="text-lg font-bold mb-3">{t('jsonOutput')}</h2>
          <div className="bg-gray-100 p-4 rounded-md overflow-x-auto">
            <pre className="text-xs font-mono">{jsonString}</pre>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-end mt-4">
          <Button
            variant="secondary"
            onClick={handleCopyJSON}
            className="w-full sm:w-auto"
          >
            {copied ? t('jsonCopied') : t('copyJSON')}
          </Button>
          <Button
            variant="primary"
            onClick={() => router.push(Routes.overview)}
            className="w-full sm:w-auto"
          >
            {t('backToStart')}
          </Button>
        </div>
      </div>
    </BaseLayout>
  );
};

export default FormResultsPageTailwind;
