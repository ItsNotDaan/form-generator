import React from 'react';
import {BaseLayout, FormSection} from '@/components/layout';
import {FormCard, FormBlock, FormItemWrapper} from '@/components/ui/form-block';
import useTranslation from 'next-translate/useTranslation';

const HelpPage = () => {
  const {t} = useTranslation('form');

  // ---------------------------------------------------------------------------
  // PAGE RENDER
  // ---------------------------------------------------------------------------

  return (
    <BaseLayout title={t('help')}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-3 mb-12">
          <h1 className="text-4xl font-bold text-foreground">{t('help')}</h1>
        </div>

        <FormSection>
          {/* Aan de slag */}
          <FormCard
            title={t('gettingStartedTitle')}
            description={t('gettingStartedDescription')}
          >
            <FormBlock columns={2} alignItems="start" dividers>
              <FormItemWrapper label={t('newClient')} centerItems={false}>
                <p className="text-sm text-muted-foreground">
                  {t('newClientDescription')}
                </p>
              </FormItemWrapper>
              <FormItemWrapper label={t('existingClient')} centerItems={false}>
                <p className="text-sm text-muted-foreground">
                  {t('existingClientDescription')}
                </p>
              </FormItemWrapper>
            </FormBlock>
          </FormCard>

          {/* Formulier selectie */}
          <FormCard
            title={t('selectIntakeForm')}
            description={t('selectIntakeFormDescription')}
          >
            <FormBlock columns={3} alignItems="start">
              <FormItemWrapper label={t('intakeVlos')} centerItems={false}>
                <p className="text-sm text-muted-foreground">
                  {t('intakeVlosDescription')}
                </p>
              </FormItemWrapper>
              <FormItemWrapper label={t('intakeOsa')} centerItems={false}>
                <p className="text-sm text-muted-foreground">
                  {t('osaDescription')}
                </p>
              </FormItemWrapper>
              <FormItemWrapper label={t('intakePulman')} centerItems={false}>
                <p className="text-sm text-muted-foreground">
                  {t('pulmanDescription')}
                </p>
              </FormItemWrapper>
              <FormItemWrapper label={t('intakeRebacare')} centerItems={false}>
                <p className="text-sm text-muted-foreground">
                  {t('rebacareDescription')}
                </p>
              </FormItemWrapper>
              <FormItemWrapper label={t('intakeOsb')} centerItems={false}>
                <p className="text-sm text-muted-foreground">
                  {t('osbDescription')}
                </p>
              </FormItemWrapper>
              <FormItemWrapper label={t('intakeOvac')} centerItems={false}>
                <p className="text-sm text-muted-foreground">
                  {t('intakeOvacDescription')}
                </p>
              </FormItemWrapper>
              <FormItemWrapper label={t('intakeInsoles')} centerItems={false}>
                <p className="text-sm text-muted-foreground">
                  {t('insolesDescription')}
                </p>
              </FormItemWrapper>
            </FormBlock>
          </FormCard>

          {/* Formulieren invullen */}
          <FormCard
            title={t('helpFillingFormsTitle')}
            description={t('helpFillingFormsDescription')}
          >
            <FormBlock columns={2} alignItems="start">
              <FormItemWrapper
                label={t('helpOptionalSections')}
                centerItems={false}
              >
                <p className="text-sm text-muted-foreground">
                  {t('helpOptionalSectionsDescription')}
                </p>
              </FormItemWrapper>
              <FormItemWrapper
                label={t('helpSideSelection')}
                centerItems={false}
              >
                <p className="text-sm text-muted-foreground">
                  {t('helpSideSelectionDescription')}
                </p>
              </FormItemWrapper>
            </FormBlock>
          </FormCard>

          {/* Resultaten */}
          <FormCard
            title={t('formResults')}
            description={t('formResultsDescription')}
          >
            <FormBlock columns={1} alignItems="start">
              <FormItemWrapper
                label={t('helpSaveAndResults')}
                centerItems={false}
              >
                <p className="text-sm text-muted-foreground">
                  {t('helpSaveAndResultsDescription')}
                </p>
              </FormItemWrapper>
            </FormBlock>
          </FormCard>
        </FormSection>
      </div>
    </BaseLayout>
  );
};

export default HelpPage;
