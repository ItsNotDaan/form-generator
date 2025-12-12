import React from 'react';
import {BaseLayout} from '@/presentation/components/layout';
import {
  Button,
  Alert,
  AlertIcon,
  FormContainer,
  PageContainer,
  SimpleGrid,
} from '@/presentation/components/ui';
import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';
import {Routes} from '../../routes';
import {useAppSelector, useAppDispatch} from '@/domain/store/hooks';
import {clearIntakeForms} from '@/domain/store/slices/formData';

export const FormSelectionPageEnhanced = () => {
  const router = useRouter();
  const {t} = useTranslation('form');
  const dispatch = useAppDispatch();
  const clientData = useAppSelector(state => state.formData.client);

  React.useEffect(() => {
    if (!clientData) {
      router.push(Routes.form_new_client);
    }
  }, [clientData, router]);

  React.useEffect(() => {
    dispatch(clearIntakeForms());
  }, [dispatch]);

  if (!clientData) {
    return null;
  }

  const intakeForms = [
    {route: Routes.form_intake_vlos, label: t('intakeVlos')},
    {route: Routes.form_intake_osa, label: t('intakeOsa')},
    {route: Routes.form_intake_pulman, label: t('intakePulman')},
    {route: Routes.form_intake_rebacare, label: t('intakeRebacare')},
    {route: Routes.form_intake_osb, label: t('intakeOsb')},
    {route: Routes.form_intake_ovac, label: t('intakeOvac')},
    {route: Routes.form_intake_steunzolen, label: t('intakeInsoles')},
  ];

  return (
    <BaseLayout
      showBackButton={true}
      onBackButtonClicked={() => router.back()}
      currentStep={2}
    >
      <FormContainer>
        <PageContainer>
          {/* Header */}
          <div className="text-center space-y-3 pb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {t('selectIntakeForm')}
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {t('selectIntakeFormDescription')}
            </p>
          </div>

          {/* Client Info Alert */}
          <Alert status="info" className="rounded-xl">
            <AlertIcon status="info" />
            <div className="flex flex-col sm:flex-row sm:items-center gap-1">
              <span className="font-semibold">{t('clientInfo')}:</span>
              <span className="text-gray-700">
                {clientData.initials} {clientData.clientName}
              </span>
            </div>
          </Alert>

          {/* Form Grid */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              {t('availableIntakeForms')}
            </h2>
            <SimpleGrid columns={{base: 1, md: 2, lg: 3}} spacing={4}>
              {intakeForms.map(form => (
                <Button
                  key={form.route}
                  variant="primary"
                  size="lg"
                  onClick={() => router.push(form.route)}
                  className="h-auto py-6 text-lg hover:scale-105 transition-transform"
                >
                  {form.label}
                </Button>
              ))}
            </SimpleGrid>
          </div>

          {/* Helper Text */}
          <div className="text-center text-sm text-gray-500 pt-4">
            <p>{t('selectFormToBegin')}</p>
          </div>
        </PageContainer>
      </FormContainer>
    </BaseLayout>
  );
};

export default FormSelectionPageEnhanced;
