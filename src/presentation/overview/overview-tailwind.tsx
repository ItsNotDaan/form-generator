import React from 'react';
import {BaseLayout} from '@/presentation/components/layout';
import {Button} from '@/presentation/components/ui';
import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';
import {Routes} from '../routes';

export const OverviewPageTailwind = () => {
  const router = useRouter();
  const {t} = useTranslation('form');

  return (
    <BaseLayout title={t('title')}>
      <div className="w-full h-full bg-white rounded-2 flex-1 p-4 flex flex-col gap-6">
        <p className="text-xl font-bold w-full truncate">{t('forms')}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button
            variant="primary"
            className="p-4"
            onClick={event => {
              event.preventDefault();
              router.push(Routes.form_new_client);
            }}
          >
            {t('newClientForm')}
          </Button>
          <Button
            variant="primary"
            className="p-4"
            onClick={event => {
              event.preventDefault();
              router.push(Routes.form_old_client);
            }}
          >
            {t('existingClientForm')}
          </Button>
        </div>
      </div>

      <div className="border-t border-gray-200" />

      <div className="w-full h-full bg-white rounded-2 flex-1 p-4 flex flex-col gap-6">
        <p className="text-xl font-bold w-full truncate">{t('intakeForms')}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Button
            variant="secondary"
            className="p-4"
            onClick={event => {
              event.preventDefault();
              router.push(Routes.form_intake_osa);
            }}
          >
            {t('intakeOsa')}
          </Button>

          <Button
            variant="secondary"
            className="p-4"
            onClick={event => {
              event.preventDefault();
              router.push(Routes.form_intake_vlos);
            }}
          >
            {t('intakeVlos')}
          </Button>

          <Button
            variant="secondary"
            className="p-4"
            onClick={event => {
              event.preventDefault();
              router.push(Routes.form_intake_pulman);
            }}
          >
            {t('intakePulman')}
          </Button>

          <Button
            variant="secondary"
            className="p-4"
            onClick={event => {
              event.preventDefault();
              router.push(Routes.form_intake_osb);
            }}
          >
            {t('intakeOsb')}
          </Button>

          <Button
            variant="secondary"
            className="p-4"
            onClick={event => {
              event.preventDefault();
              router.push(Routes.form_intake_rebacare);
            }}
          >
            {t('intakeRebacare')}
          </Button>

          <Button
            variant="secondary"
            className="p-4"
            onClick={event => {
              event.preventDefault();
              router.push(Routes.form_intake_ovac);
            }}
          >
            {t('intakeOvac')}
          </Button>

          <Button
            variant="secondary"
            className="p-4"
            onClick={event => {
              event.preventDefault();
              router.push(Routes.form_intake_steunzolen);
            }}
          >
            {t('intakeInsoles')}
          </Button>
        </div>
      </div>
    </BaseLayout>
  );
};
