import React from 'react';
import {BaseLayout, FormSection} from '@/components/layout';
import {Button} from '@/components/ui/button';
import {FormBlock} from '@/components/ui/form-block';
import {Info} from 'lucide-react';
import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';
import {Routes} from '@/lib/routes';
import {useAppSelector, useAppDispatch} from '@/domain/store/hooks';
import {clearFormData, clearIntakeForms} from '@/domain/store/slices/formData';
import {clearAllFormStorage} from '@/utils/localStorageHelper';

const FormSelectionPage = () => {
  const router = useRouter();
  const {t} = useTranslation('form');
  const dispatch = useAppDispatch();
  const clientData = useAppSelector(state => state.formData.client);

  // Clear all intake forms when entering form selection
  React.useEffect(() => {
    dispatch(clearIntakeForms());
  }, [dispatch]);

  const handleBackToMain = () => {
    dispatch(clearFormData());
    clearAllFormStorage();
    void router.push(Routes.overview);
  };

  return (
    <BaseLayout
      title={t('selectIntakeForm')}
      showBackButton
      onBackButtonClicked={handleBackToMain}
    >
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
          <div>
            <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-md mb-6">
              <Info className="w-5 h-5 text-blue-600" />
              <p className="text-sm">
                {clientData
                  ? `${t('clientInfo')}: ${clientData.initials} ${clientData.clientName}`
                  : 'Geen cliënt geladen (testmodus)'}
              </p>
            </div>

            <div>
              <h2 className="text-lg font-bold mb-3">
                {t('availableIntakeForms')}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button
                  variant="default"
                  size="lg"
                  className="w-full"
                  onClick={() => void router.push(Routes.form_intake_vlos)}
                >
                  {t('intakeVlos')}
                </Button>

                <Button
                  variant="default"
                  size="lg"
                  className="w-full"
                  onClick={() => void router.push(Routes.form_intake_osa)}
                >
                  {t('intakeOsa')}
                </Button>

                <Button
                  variant="default"
                  size="lg"
                  className="w-full"
                  onClick={() => void router.push(Routes.form_intake_pulman)}
                >
                  {t('intakePulman')}
                </Button>

                <Button
                  variant="default"
                  size="lg"
                  className="w-full"
                  onClick={() => void router.push(Routes.form_intake_rebacare)}
                >
                  {t('intakeRebacare')}
                </Button>

                <Button
                  variant="default"
                  size="lg"
                  className="w-full"
                  onClick={() => void router.push(Routes.form_intake_osb)}
                >
                  {t('intakeOsb')}
                </Button>

                <Button
                  variant="default"
                  size="lg"
                  className="w-full"
                  onClick={() => void router.push(Routes.form_intake_ovac)}
                >
                  {t('intakeOvac')}
                </Button>

                <Button
                  variant="default"
                  size="lg"
                  className="w-full"
                  onClick={() =>
                    void router.push(Routes.form_intake_steunzolen)
                  }
                >
                  {t('intakeInsoles')}
                </Button>
              </div>
            </div>
          </div>
        </FormSection>
      </div>
    </BaseLayout>
  );
};

export default FormSelectionPage;
