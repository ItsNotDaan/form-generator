import React from 'react';
import {BaseLayout} from '@/components/layout';
import {Button} from '@/components/ui/button';
import {NavigationCard} from '@/components/ui/navigation-card';
import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';
import {Routes} from '@/lib/routes';
import {clearAllFormStorage} from '@/utils/localStorageHelper';
import {UserPlus, Users, FileText, ClipboardList} from 'lucide-react';
import {useAppDispatch} from '@/domain/store/hooks';
import {clearFormData} from '@/domain/store/slices/formData';
import {FormBlock, FormCard, FormItemWrapper} from '@/components/ui/form-block';

const OverviewPage = () => {
  const router = useRouter();
  const {t} = useTranslation('form');
  const dispatch = useAppDispatch();

  const handleNavigate = (route: string, clearStorage: boolean = false) => {
    if (clearStorage) {
      dispatch(clearFormData());
      clearAllFormStorage();
    }
    void router.push(route);
  };

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
        </FormCard>

        {/* Intake Forms Section */}
        <FormCard
          title={t('intakeForms')}
          toggleAble={true}
          defaultOpen={false}
          toggleLabel={t('intakeForms')}
        >
          <FormBlock columns={3} responsive={true} alignItems="stretch">
            {/* Intake OSA */}
            <FormItemWrapper>
              <Button
                variant="outline"
                className="items-center justify-start h-full px-6 py-6 w-full"
                onClick={() => handleNavigate(Routes.form_intake_osa)}
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
                onClick={() => handleNavigate(Routes.form_check_foliepas)}
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
                onClick={() => void router.push(Routes.form_create_shoedesign)}
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
                onClick={() => handleNavigate(Routes.form_intake_vlos)}
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
                onClick={() => handleNavigate(Routes.form_intake_osb)}
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
                onClick={() => handleNavigate(Routes.form_intake_steunzolen)}
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
                onClick={() => handleNavigate(Routes.form_intake_pulman)}
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
                onClick={() => handleNavigate(Routes.form_intake_rebacare)}
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
                onClick={() => handleNavigate(Routes.form_intake_ovac)}
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
      </div>
    </BaseLayout>
  );
};

export default OverviewPage;
