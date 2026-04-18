import React from 'react';
import {BaseLayout} from '@/components/layout';
import {Button} from '@/components/ui/button';
import {NavigationCard} from '@/components/ui/navigation-card';
import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';
import {Routes} from '@/lib/routes';
import {
  clearStepRoute,
  removeFromLocalStorage,
  clearAllFormStorage,
} from '@/utils/localStorageHelper';
import {UserPlus, Users, FileText, Upload} from 'lucide-react';
import {FormBlock, FormCard, FormItemWrapper} from '@/components/ui/form-block';
import {ImportDialog} from '@/components/forms/ImportDialog';
import {FORM_REGISTRY} from '@/domain/form/registry';

const OverviewPage = () => {
  const router = useRouter();
  const {t} = useTranslation('form');
  const [importDialogOpen, setImportDialogOpen] = React.useState(false);

  // ---------------------------------------------------------------------------
  // FORM SETUP
  // ---------------------------------------------------------------------------

  // Derived from registry: route → localStorage key (client forms added separately)
  const storageKeyByRoute: Record<string, string> = React.useMemo(
    () => ({
      [Routes.form_new_client]: 'newClient',
      [Routes.form_old_client]: 'oldClient',
      ...Object.fromEntries(FORM_REGISTRY.map(f => [f.route, f.storageKey])),
    }),
    [],
  );

  // ---------------------------------------------------------------------------
  // EVENT HANDLERS
  // ---------------------------------------------------------------------------

  const handleNavigate = (route: string, resetSteps: boolean = false) => {
    if (resetSteps) {
      // Starting a new client workflow - clear all data
      clearAllFormStorage();
      clearStepRoute(2);
      clearStepRoute(3);
      clearStepRoute(4);
    } else {
      // Direct navigate to form - clear only that form's data
      const storageKey = storageKeyByRoute[route];
      if (storageKey) {
        removeFromLocalStorage(storageKey);
      }
    }
    void router.push(route);
  };

  // ---------------------------------------------------------------------------
  // PAGE RENDER
  // ---------------------------------------------------------------------------

  return (
    <BaseLayout title={t('title')}>
      <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8 space-y-8">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center gap-3">
          <h1 className="text-4xl font-bold text-foreground">{t('forms')}</h1>
        </div>

        {/* Info Card */}
        <FormCard
          title={t('gettingStartedTitle')}
          description={t('gettingStartedDescription')}
        />

        {/* Client Forms Section */}
        <FormCard title={t('clientFormsSection')}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NavigationCard
              icon={UserPlus}
              title={t('newClientForm')}
              description={t('newClientFormDescription')}
              buttonText={t('newClientButton')}
              buttonIcon={UserPlus}
              onClick={() => handleNavigate(Routes.form_new_client, true)}
            />

            <NavigationCard
              icon={Users}
              title={t('existingClientForm')}
              description={t('existingClientFormDescription')}
              buttonText={t('existingClientButton')}
              buttonIcon={Users}
              onClick={() => handleNavigate(Routes.form_old_client, true)}
            />
          </div>

          {/* Import button */}
          <div className="flex justify-end mt-4">
            <Button
              variant="outline"
              className="flex items-center gap-2"
              onClick={() => setImportDialogOpen(true)}
            >
              <Upload className="w-4 h-4" />
              {t('importButton')}
            </Button>
          </div>
        </FormCard>

        {/* Intake Forms Section */}
        <FormCard
          title={t('intakeForms')}
          toggleAble={true}
          defaultOpen={false}
          toggleLabel={t('intakeForms')}
        >
          <FormBlock columns={3} responsive={true} alignItems="stretch">
            {FORM_REGISTRY.map(entry => (
              <FormItemWrapper key={entry.storeKey}>
                <Button
                  variant="outline"
                  className="items-center justify-start h-full px-6 py-6 w-full"
                  onClick={() => handleNavigate(entry.route)}
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
      </div>

      {/* Import dialog */}
      <ImportDialog
        isOpen={importDialogOpen}
        onClose={() => setImportDialogOpen(false)}
      />
    </BaseLayout>
  );
};

export default OverviewPage;
