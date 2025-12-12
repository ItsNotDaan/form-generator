import React from 'react';
import {BaseLayout} from '@/presentation/components/layout';
import {Button, SimpleGrid, Alert, AlertIcon} from '@/presentation/components/ui';
import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';
import {Routes} from '../../routes';
import {useAppSelector, useAppDispatch} from '@/domain/store/hooks';
import {clearIntakeForms} from '@/domain/store/slices/formData';

export const FormSelectionPageTailwind = () => {
  const router = useRouter();
  const {t} = useTranslation('form');
  const dispatch = useAppDispatch();
  const clientData = useAppSelector(state => state.formData.client);

  // If no client data exists, redirect to new client page
  React.useEffect(() => {
    if (!clientData) {
      router.push(Routes.form_new_client);
    }
  }, [clientData, router]);

  // Clear all intake forms when entering form selection
  React.useEffect(() => {
    dispatch(clearIntakeForms());
  }, [dispatch]);

  if (!clientData) {
    return null;
  }

  return (
    <BaseLayout
      title={t('selectIntakeForm')}
      showBackButton={true}
      onBackButtonClicked={() => router.back()}
    >
      <div className="w-full flex flex-col bg-white p-4 md:p-6 rounded-md gap-4 md:gap-6">
        <div>
          <p className="font-bold text-xl mb-2">{t('clientDataSaved')}</p>
          <p className="text-base text-gray-600">
            {t('selectIntakeFormDescription')}
          </p>
        </div>

        <Alert status="info">
          <AlertIcon status="info" />
          <span>
            {t('clientInfo')}: {clientData.initials} {clientData.clientName}
          </span>
        </Alert>

        <div>
          <p className="font-bold mb-3 text-lg">{t('availableIntakeForms')}</p>
          <SimpleGrid columns={{base: 1, md: 2}} spacing={4}>
            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push(Routes.form_intake_vlos)}
            >
              {t('intakeVlos')}
            </Button>

            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push(Routes.form_intake_osa)}
            >
              {t('intakeOsa')}
            </Button>

            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push(Routes.form_intake_pulman)}
            >
              {t('intakePulman')}
            </Button>

            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push(Routes.form_intake_rebacare)}
            >
              {t('intakeRebacare')}
            </Button>

            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push(Routes.form_intake_osb)}
            >
              {t('intakeOsb')}
            </Button>

            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push(Routes.form_intake_ovac)}
            >
              {t('intakeOvac')}
            </Button>

            <Button
              variant="primary"
              size="lg"
              onClick={() => router.push(Routes.form_intake_steunzolen)}
            >
              {t('intakeInsoles')}
            </Button>
          </SimpleGrid>
        </div>
      </div>
    </BaseLayout>
  );
};

export default FormSelectionPageTailwind;
