import React, { useState } from 'react';
import { BaseLayout, FormSection, FormFooter } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CheckCircle2, AlertTriangle, Copy, Check } from 'lucide-react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Routes } from '@/lib/routes';
import { useAppSelector } from '@/domain/store/hooks';
import { BEHANDELAARS } from '@/lib/constants/formConstants';
import { generateCodes } from '@/utils/codeGenerator';
import {
  findNavigationForWarning,
  getFormRoute,
  scrollToField,
} from '@/utils/warningNavigationMap';

const FormResultsPage = () => {
  const router = useRouter();
  const { t } = useTranslation('form');
  const formData = useAppSelector(state => state.formData);
  const [copied, setCopied] = useState(false);

  // If no client data exists, redirect to new client page
  React.useEffect(() => {
    if (!formData.client) {
      router.push(Routes.form_new_client);
    }
  }, [formData.client, router]);

  if (!formData.client) {
    return null;
  }

  // Normalize values: false/"nee" -> "", true/"ja" -> "Ja"
  // Keep all keys for Word document generation (no exclusion)
  const normalizeValue = (value: any): any => {
    if (value === null || value === undefined) {
      return '';
    }
    if (typeof value === 'boolean') {
      return value ? 'Ja' : ''; // false becomes empty string, not excluded
    }
    if (typeof value === 'string') {
      if (value.toLowerCase() === 'yes') return 'Ja';
      if (value.toLowerCase() === 'no') return '';
      return value;
    }
    if (Array.isArray(value)) {
      return value.map(normalizeValue);
    }
    if (typeof value === 'object') {
      return normalizeObject(value);
    }
    return value;
  };

  const normalizeObject = (obj: any): any => {
    const normalized: any = {};
    for (const [key, value] of Object.entries(obj)) {
      normalized[key] = normalizeValue(value);
    }
    return normalized;
  };

  // Generate complete JSON with all data and constants
  const generateCompleteJSON = () => {
    // Resolve practitioner ID to name
    const resolvedClientData = formData.client
      ? normalizeObject({
        ...formData.client,
        practitionerName:
          BEHANDELAARS.find(p => p.value === formData.client?.practitionerId)
            ?.label || formData.client?.practitionerId,
      })
      : null;

    // Build result object with only non-null intake forms
    const result: any = {
      clientData: resolvedClientData,
    };

    // Only include intake forms that have data (normalized)
    if (formData.intakeVLOS) {
      result.intakeVLOS = normalizeObject(formData.intakeVLOS);
    }
    if (formData.intakeOSA) {
      result.intakeOSA = normalizeObject(formData.intakeOSA);
    }
    if (formData.intakePulman) {
      result.intakePulman = normalizeObject(formData.intakePulman);
    }
    if (formData.intakeRebacare) {
      result.intakeRebacare = normalizeObject(formData.intakeRebacare);
    }
    if (formData.intakeOSB) {
      result.intakeOSB = normalizeObject(formData.intakeOSB);
    }
    if (formData.intakeOVAC) {
      result.intakeOVAC = normalizeObject(formData.intakeOVAC);
    }
    if (formData.intakeSteunzolen) {
      result.intakeSteunzolen = normalizeObject(formData.intakeSteunzolen);
    }

    // Generate medical codes if applicable
    if (
      formData.client &&
      (formData.intakeVLOS || formData.intakeOSA || formData.intakeOSB)
    ) {
      const { codes, warnings, generalBasiscode } = generateCodes(
        formData.client,
        {
          intakeVLOS: formData.intakeVLOS,
          intakeOSA: formData.intakeOSA,
          intakePulman: formData.intakePulman,
          intakeRebacare: formData.intakeRebacare,
          intakeOSB: formData.intakeOSB,
          intakeOVAC: formData.intakeOVAC,
          intakeSteunzolen: formData.intakeSteunzolen,
        }
      );

      // Group normalized codes under medicalCodes object
      result.medicalCodes = normalizeObject(codes);

      // Add generalBasiscode to the appropriate intake data
      if (generalBasiscode) {
        if (formData.intakeVLOS && result.intakeVLOS) {
          result.intakeVLOS.generalBasiscode = generalBasiscode;
        }
        if (formData.intakeOSA && result.intakeOSA) {
          result.intakeOSA.generalBasiscode = generalBasiscode;
        }
        if (formData.intakeOSB && result.intakeOSB) {
          result.intakeOSB.generalBasiscode = generalBasiscode;
        }
      }

      // Add warnings if any
      if (warnings.length > 0) {
        result.codeWarnings = warnings;
      }
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
      setTimeout(() => setCopied(false), 2000);
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
      <div key={label} className="mb-2">
        <p className="text-sm font-semibold text-muted-foreground">
          {label}:
        </p>
        <p className="text-md">
          {displayValue}
        </p>
      </div>
    );
  };

  const renderSection = (title: string, data: any) => {
    if (!data) {
      return null;
    }

    return (
      <div>
        <h3 className="text-lg font-bold mb-3">
          {title}
        </h3>
        <div className="flex flex-col gap-2">
          {Object.entries(data).map(([key, value]) =>
            renderFieldValue(key, value)
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
          <h1 className="text-4xl font-bold text-foreground">{t('formResultsTitle')}</h1>
          <p className="text-lg text-muted-foreground">{t('formResultsDescription')}</p>
        </div>

        <FormSection>
          <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-md">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <p className="text-sm">
              {t('formDataComplete')}
            </p>
          </div>

          {/* Display code generation warnings if any */}
          {codeWarnings && codeWarnings.length > 0 && (
            <div className="flex flex-col gap-3 p-4 bg-orange-50 border border-orange-200 rounded-md">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-orange-600" />
                <p className="font-bold">{t('codeWarnings')}:</p>
              </div>
              <div className="flex flex-col gap-2 ml-6">
                {codeWarnings.map((warning, idx) => {
                  const navInfo = findNavigationForWarning(warning);
                  return (
                    <div key={idx} className="flex justify-between items-center gap-2">
                      <p className="text-sm">{warning}</p>
                      {navInfo && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-orange-300 text-orange-700 hover:bg-orange-100"
                          onClick={() => {
                            router.push(
                              getFormRoute(navInfo.formType),
                              undefined,
                              {
                                shallow: true,
                              }
                            );
                            // Use setTimeout to ensure navigation completes before scrolling
                            setTimeout(() => {
                              scrollToField(navInfo.fieldId);
                            }, 100);
                          }}
                        >
                          {t('goToField', {
                            fieldLabel: navInfo.fieldLabel,
                          })}
                        </Button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <Separator />

          {/* Display all form data */}
          <div>
            <h2 className="text-xl font-bold mb-4">
              {t('submittedData')}
            </h2>

            {renderSection(t('clientData'), formData.client)}

            {formData.intakeVLOS && (
              <>
                <Separator className="my-4" />
                {renderSection(t('intakeVlos'), formData.intakeVLOS)}
              </>
            )}

            {formData.intakeOSA && (
              <>
                <Separator className="my-4" />
                {renderSection(t('intakeOsa'), formData.intakeOSA)}
              </>
            )}

            {formData.intakePulman && (
              <>
                <Separator className="my-4" />
                {renderSection(t('intakePulman'), formData.intakePulman)}
              </>
            )}

            {formData.intakeRebacare && (
              <>
                <Separator className="my-4" />
                {renderSection(t('intakeRebacare'), formData.intakeRebacare)}
              </>
            )}

            {formData.intakeOSB && (
              <>
                <Separator className="my-4" />
                {renderSection(t('intakeOsb'), formData.intakeOSB)}
              </>
            )}

            {formData.intakeOVAC && (
              <>
                <Separator className="my-4" />
                {renderSection(t('intakeOvac'), formData.intakeOVAC)}
              </>
            )}

            {formData.intakeSteunzolen && (
              <>
                <Separator className="my-4" />
                {renderSection(t('intakeInsoles'), formData.intakeSteunzolen)}
              </>
            )}
          </div>

          <Separator />

          {/* JSON Output Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">{t('jsonOutput')}</h2>
              <Button
                onClick={handleCopyJSON}
                className="flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    {t('copyJson')}
                  </>
                )}
              </Button>
            </div>

            <p className="text-sm text-muted-foreground mb-3">
              {t('jsonOutputDescription')}
            </p>

            <div className="bg-gray-50 p-4 rounded-md border border-gray-200 max-h-[500px] overflow-y-auto">
              <pre className="text-sm whitespace-pre font-mono">
                {jsonString}
              </pre>
            </div>
          </div>

          {/* Action Buttons */}
          <FormFooter>
            <Button
              variant="outline"
              onClick={() => router.push(Routes.form_selection)}
            >
              {t('fillAnotherForm')}
            </Button>
            <Button
              onClick={() => router.push(Routes.overview)}
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
