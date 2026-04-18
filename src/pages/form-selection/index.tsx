import React from 'react';
import {BaseLayout, FormSection} from '@/components/layout';
import {Button} from '@/components/ui/button';
import {FormBlock, FormCard, FormItemWrapper} from '@/components/ui/form-block';
import {Info, FileText, CheckCircle2} from 'lucide-react';
import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';
import {useAppSelector, useAppDispatch} from '@/domain/store/hooks';
import {clearIntakeForms} from '@/domain/store/slices/formData';
import {
  clearStepRoute,
  removeFromLocalStorage,
  saveStepRoute,
  loadStepRoute,
} from '@/utils/localStorageHelper';
import {FORM_REGISTRY, FORM_BY_ROUTE} from '@/domain/form/registry';

const FormSelectionPage = () => {
  const router = useRouter();
  const {t} = useTranslation('form');
  const dispatch = useAppDispatch();
  const clientData = useAppSelector(state => state.formData.client);

  // ---------------------------------------------------------------------------
  // FORM SETUP
  // ---------------------------------------------------------------------------

  // Derived from registry: route → localStorage key
  const storageKeyByRoute: Record<string, string> = React.useMemo(
    () => Object.fromEntries(FORM_REGISTRY.map(f => [f.route, f.storageKey])),
    [],
  );

  // ---------------------------------------------------------------------------
  // EVENT HANDLERS
  // ---------------------------------------------------------------------------

  const handleFormSelection = (route: string) => {
    // Clear all previously-imported / previously-filled intake data so the new
    // form starts blank (only fires when the user explicitly picks a NEW form).
    dispatch(clearIntakeForms());

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
    const entry = FORM_BY_ROUTE[pathname];
    return entry ? t(entry.labelKey) : pathname;
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
              {FORM_REGISTRY.map(entry => (
                <FormItemWrapper key={entry.storeKey}>
                  <Button
                    variant="outline"
                    className="items-center justify-start h-full px-6 py-6 w-full"
                    onClick={() => handleFormSelection(entry.route)}
                  >
                    <FileText className="w-4 h-4 mr-2 shrink-0" />
                    <div className="flex flex-col text-left min-w-0">
                      <div className="font-semibold">{t(entry.labelKey)}</div>
                      <div className="text-xs text-muted-foreground text-wrap">
                        {t(entry.descriptionKey)}
                      </div>
                    </div>
                  </Button>
                </FormItemWrapper>
              ))}
            </FormBlock>
          </FormCard>
        </FormSection>
      </div>
    </BaseLayout>
  );
};

export default FormSelectionPage;
