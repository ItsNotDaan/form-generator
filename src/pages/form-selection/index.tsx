import React from 'react';
import {BaseLayout, FormSection} from '@/components/layout';
import {Button} from '@/components/ui/button';
import {FormBlock, FormCard, FormItemWrapper} from '@/components/ui/form-block';
import {Info, FileText, CheckCircle2} from 'lucide-react';
import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';
import {Routes} from '@/lib/routes';
import {useAppSelector, useAppDispatch} from '@/domain/store/hooks';
import {clearIntakeForms} from '@/domain/store/slices/formData';
import {
  clearStepRoute,
  removeFromLocalStorage,
  saveStepRoute,
  loadStepRoute,
} from '@/utils/localStorageHelper';

const FormSelectionPage = () => {
  const router = useRouter();
  const {t} = useTranslation('form');
  const dispatch = useAppDispatch();
  const clientData = useAppSelector(state => state.formData.client);

  // ---------------------------------------------------------------------------
  // FORM SETUP
  // ---------------------------------------------------------------------------

  // Clear all intake forms when entering form selection
  React.useEffect(() => {
    dispatch(clearIntakeForms());
  }, [dispatch]);

  const storageKeyByRoute: Record<string, string> = {
    [Routes.form_intake_osa]: 'intakeOSA',
    [Routes.form_check_foliepas]: 'checkFoliepas',
    [Routes.form_create_shoedesign]: 'shoeDesign',
    [Routes.form_intake_vlos]: 'intakeVLOS',
    [Routes.form_intake_osb]: 'intakeOSB',
    [Routes.form_intake_steunzolen]: 'intakeInsoles',
    [Routes.form_intake_pulman]: 'intakePulman',
    [Routes.form_intake_rebacare]: 'intakeRebacare',
    [Routes.form_intake_ovac]: 'intakeOVAC',
  };

  // ---------------------------------------------------------------------------
  // EVENT HANDLERS
  // ---------------------------------------------------------------------------

  const handleFormSelection = (route: string) => {
    const storageKey = storageKeyByRoute[route];
    if (storageKey) {
      removeFromLocalStorage(storageKey);
    }
    saveStepRoute(3, route);
    clearStepRoute(4);
    void router.push(route);
  };

  const [lastFormRoute, setLastFormRoute] = React.useState<string | null>(null);

  React.useEffect(() => {
    const step3Route = loadStepRoute(3);
    setLastFormRoute(step3Route);
  }, []);

  // ---------------------------------------------------------------------------
  // HELPER FUNCTIONS
  // ---------------------------------------------------------------------------

  const getFormNameFromRoute = (route: string): string => {
    // Extract pathname if route contains query params, then remove trailing slash
    const pathname = route.split('?')[0].replace(/\/$/, '');

    const formNames: Record<string, string> = {
      [Routes.form_intake_osa]: t('intakeOsa'),
      [Routes.form_check_foliepas]: t('checkFoliepas'),
      [Routes.form_create_shoedesign]: t('createShoeDesign'),
      [Routes.form_intake_vlos]: t('intakeVlos'),
      [Routes.form_intake_osb]: t('intakeOsb'),
      [Routes.form_intake_steunzolen]: t('intakeInsoles'),
      [Routes.form_intake_pulman]: t('intakePulman'),
      [Routes.form_intake_rebacare]: t('intakeRebacare'),
      [Routes.form_intake_ovac]: t('intakeOvac'),
    };
    return formNames[pathname] || pathname;
  };

  // ---------------------------------------------------------------------------
  // PAGE RENDER
  // ---------------------------------------------------------------------------

  return (
    <BaseLayout title={t('selectIntakeForm')} currentStep={2}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-3 mb-12">
          <h1 className="text-4xl font-bold text-foreground">
            {t('selectIntakeForm')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('selectIntakeFormDescription')}
          </p>
        </div>

        <FormSection>
          <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-md mb-6">
            <Info className="w-5 h-5 text-blue-600" />
            <p className="text-sm">
              {clientData
                ? `${t('clientInfo')}: ${clientData.initials} ${clientData.clientName}`
                : 'Geen cliënt geladen (testmodus)'}
            </p>
          </div>

          {lastFormRoute && (
            <div className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-md mb-6">
              <CheckCircle2 className="w-5 h-5 text-green-600" />
              <div className="flex-1">
                <p className="text-sm">
                  {t('continueWithLastForm')}:{' '}
                  <strong>{getFormNameFromRoute(lastFormRoute)}</strong>
                </p>
              </div>
              <Button
                variant="default"
                onClick={() => void router.push(lastFormRoute)}
                className="w-1/5"
              >
                {t('continueForm')}
              </Button>
            </div>
          )}

          {/* Intake Forms Section */}
          <FormCard title={t('availableIntakeForms')}>
            <FormBlock columns={3} responsive={true} alignItems="stretch">
              {/* Intake OSA */}
              <FormItemWrapper>
                <Button
                  variant="outline"
                  className="items-center justify-start h-full px-6 py-6 w-full"
                  onClick={() => handleFormSelection(Routes.form_intake_osa)}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  <div className="text-left">
                    <div className="font-semibold">{t('intakeOsa')}</div>
                    <div className="text-xs text-muted-foreground">
                      {t('intakeOsaDescription')}
                    </div>
                  </div>
                </Button>
              </FormItemWrapper>

              {/* Check Foliepas */}
              <FormItemWrapper>
                <Button
                  variant="outline"
                  className="items-center justify-start h-full px-6 py-6 w-full"
                  onClick={() =>
                    handleFormSelection(Routes.form_check_foliepas)
                  }
                >
                  <FileText className="w-4 h-4 mr-2 shrink-0" />

                  <div className="flex flex-col text-left min-w-0 text-wrap">
                    <div className="font-semibold">{t('checkFoliepas')}</div>
                    <div className="text-xs text-muted-foreground">
                      {t('checkFoliepasDescription')}
                    </div>
                  </div>
                </Button>
              </FormItemWrapper>

              {/* Create Shoe Design */}
              <FormItemWrapper>
                <Button
                  variant="outline"
                  className="items-center justify-start h-full px-6 py-6 w-full"
                  onClick={() =>
                    handleFormSelection(Routes.form_create_shoedesign)
                  }
                >
                  <FileText className="w-4 h-4 mr-2 shrink-0" />

                  <div className="flex flex-col text-left min-w-0 text-wrap">
                    <div className="font-semibold">{t('createShoeDesign')}</div>
                    <div className="text-xs text-muted-foreground">
                      {t('createShoeDesignDescription')}
                    </div>
                  </div>
                </Button>
              </FormItemWrapper>

              {/* Intake VLOS */}
              <FormItemWrapper>
                <Button
                  variant="outline"
                  className="items-center justify-start h-full px-6 py-6 w-full"
                  onClick={() => handleFormSelection(Routes.form_intake_vlos)}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  <div className="text-left">
                    <div className="font-semibold">{t('intakeVlos')}</div>
                    <div className="text-xs text-muted-foreground">
                      {t('intakeVlosDescription')}
                    </div>
                  </div>
                </Button>
              </FormItemWrapper>

              {/* Intake OSB */}
              <FormItemWrapper>
                <Button
                  variant="outline"
                  className="items-center justify-start h-full px-6 py-6 w-full"
                  onClick={() => handleFormSelection(Routes.form_intake_osb)}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  <div className="text-left">
                    <div className="font-semibold">{t('intakeOsb')}</div>
                    <div className="text-xs text-muted-foreground">
                      {t('intakeOsbDescription')}
                    </div>
                  </div>
                </Button>
              </FormItemWrapper>

              {/* Intake Steunzolen */}
              <FormItemWrapper>
                <Button
                  variant="outline"
                  className="items-center justify-start h-full px-6 py-6 w-full"
                  onClick={() =>
                    handleFormSelection(Routes.form_intake_steunzolen)
                  }
                >
                  <FileText className="w-4 h-4 mr-2" />
                  <div className="text-left">
                    <div className="font-semibold">{t('intakeInsoles')}</div>
                    <div className="text-xs text-muted-foreground">
                      {t('intakeInsolesDescription')}
                    </div>
                  </div>
                </Button>
              </FormItemWrapper>

              {/* Intake Pulman */}
              <FormItemWrapper>
                <Button
                  variant="outline"
                  className="items-center justify-start h-full px-6 py-6 w-full"
                  onClick={() => handleFormSelection(Routes.form_intake_pulman)}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  <div className="text-left">
                    <div className="font-semibold">{t('intakePulman')}</div>
                    <div className="text-xs text-muted-foreground">
                      {t('intakePulmanDescription')}
                    </div>
                  </div>
                </Button>
              </FormItemWrapper>

              {/* Intake Rebacare */}
              <FormItemWrapper>
                <Button
                  variant="outline"
                  className="items-center justify-start h-full px-6 py-6 w-full"
                  onClick={() =>
                    handleFormSelection(Routes.form_intake_rebacare)
                  }
                >
                  <FileText className="w-4 h-4 mr-2" />
                  <div className="text-left">
                    <div className="font-semibold">{t('intakeRebacare')}</div>
                    <div className="text-xs text-muted-foreground">
                      {t('intakeRebacareDescription')}
                    </div>
                  </div>
                </Button>
              </FormItemWrapper>

              {/* Intake OVAC */}
              <FormItemWrapper>
                <Button
                  variant="outline"
                  className="items-center justify-start h-full px-6 py-6 w-full"
                  onClick={() => handleFormSelection(Routes.form_intake_ovac)}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  <div className="text-left">
                    <div className="font-semibold">{t('intakeOvac')}</div>
                    <div className="text-xs text-muted-foreground">
                      {t('intakeOvacDescription')}
                    </div>
                  </div>
                </Button>
              </FormItemWrapper>
            </FormBlock>
          </FormCard>
        </FormSection>
      </div>
    </BaseLayout>
  );
};

export default FormSelectionPage;
