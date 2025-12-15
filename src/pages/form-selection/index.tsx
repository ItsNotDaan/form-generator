import React from 'react';
import { BaseLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Info } from 'lucide-react';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Routes } from '@/lib/routes';
import { useAppSelector, useAppDispatch } from '@/domain/store/hooks';
import { clearIntakeForms } from '@/domain/store/slices/formData';

const FormSelectionPage = () => {
  const router = useRouter();
  const { t } = useTranslation('form');
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
    <BaseLayout title={t('selectIntakeForm')}>
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col gap-6 bg-white p-6 rounded-md">
          <div>
            <h1 className="text-xl font-bold mb-2">
              {t('clientDataSaved')}
            </h1>
            <p className="text-md text-gray-600">
              {t('selectIntakeFormDescription')}
            </p>
          </div>

          <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-md">
            <Info className="w-5 h-5 text-blue-600" />
            <p className="text-sm">
              {t('clientInfo')}: {clientData.initials} {clientData.clientName}
            </p>
          </div>

          <Separator />

          <div>
            <h2 className="text-lg font-bold mb-3">
              {t('availableIntakeForms')}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                variant="default"
                size="lg"
                className="w-full"
                onClick={() => router.push(Routes.form_intake_vlos)}
              >
                {t('intakeVlos')}
              </Button>

              <Button
                variant="default"
                size="lg"
                className="w-full"
                onClick={() => router.push(Routes.form_intake_osa)}
              >
                {t('intakeOsa')}
              </Button>

              <Button
                variant="default"
                size="lg"
                className="w-full"
                onClick={() => router.push(Routes.form_intake_pulman)}
              >
                {t('intakePulman')}
              </Button>

              <Button
                variant="default"
                size="lg"
                className="w-full"
                onClick={() => router.push(Routes.form_intake_rebacare)}
              >
                {t('intakeRebacare')}
              </Button>

              <Button
                variant="default"
                size="lg"
                className="w-full"
                onClick={() => router.push(Routes.form_intake_osb)}
              >
                {t('intakeOsb')}
              </Button>

              <Button
                variant="default"
                size="lg"
                className="w-full"
                onClick={() => router.push(Routes.form_intake_ovac)}
              >
                {t('intakeOvac')}
              </Button>

              <Button
                variant="default"
                size="lg"
                className="w-full"
                onClick={() => router.push(Routes.form_intake_steunzolen)}
              >
                {t('intakeInsoles')}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </BaseLayout>
  );
};

export default FormSelectionPage;
