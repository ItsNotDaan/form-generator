import React from 'react';
import { BaseLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
import { NavigationCard } from '@/components/ui/navigation-card';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Routes } from '@/lib/routes';
import { UserPlus, Users, FileText, ClipboardList } from 'lucide-react';

const OverviewPage = () => {
  const router = useRouter();
  const { t } = useTranslation('form');

  const handleNavigate = (route: string) => {
    router.push(route);
  };

  return (
    <BaseLayout title={t('title')}>
      <div className="w-full px-4 py-8 mx-auto sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col items-center justify-center gap-3 mb-12">
          <h1 className="text-4xl font-bold text-foreground">
            {t('forms')}
          </h1>
          <p className="text-lg text-muted-foreground">
            {t('selectOptionToGetStarted')}
          </p>
        </div>

        {/* Client Forms Section */}
        <div className="mb-12">
          <h2 className="flex items-center gap-2 mb-6 text-2xl font-semibold text-foreground">
            <Users className="w-6 h-6" />
            {t('clientFormsSection')}
          </h2>
          <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-2">
            <NavigationCard
              icon={UserPlus}
              title={t('newClientForm')}
              description={t('newClientFormDescription')}
              buttonText={t('newClientButton')}
              buttonIcon={UserPlus}
              onClick={() => handleNavigate(Routes.form_new_client)}
            />

            <NavigationCard
              icon={Users}
              title={t('existingClientForm')}
              description={t('existingClientFormDescription')}
              buttonText={t('existingClientButton')}
              buttonIcon={Users}
              onClick={() => handleNavigate(Routes.form_old_client)}
            />
          </div>
        </div>

        <Separator className="my-8" />

        {/* Intake Forms Section */}
        <div>
          <h2 className="flex items-center gap-2 mb-6 text-2xl font-semibold text-foreground">
            <ClipboardList className="w-6 h-6" />
            {t('intakeForms')}
          </h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Button variant="outline" className="justify-start h-auto px-6 py-6" onClick={() => handleNavigate(Routes.form_intake_osa)}>
              <FileText className="w-4 h-4 mr-2" />
              <div className="text-left">
                <div className="font-semibold">{t('intakeOsa')}</div>
                <div className="text-xs text-muted-foreground">{t('intakeOsaDescription')}</div>
              </div>
            </Button>

            <Button variant="outline" className="justify-start h-auto px-6 py-6" onClick={() => handleNavigate(Routes.form_intake_vlos)}>
              <FileText className="w-4 h-4 mr-2" />
              <div className="text-left">
                <div className="font-semibold">{t('intakeVlos')}</div>
                <div className="text-xs text-muted-foreground">{t('intakeVlosDescription')}</div>
              </div>
            </Button>

            <Button variant="outline" className="justify-start h-auto px-6 py-6" onClick={() => handleNavigate(Routes.form_intake_pulman)}>
              <FileText className="w-4 h-4 mr-2" />
              <div className="text-left">
                <div className="font-semibold">{t('intakePulman')}</div>
                <div className="text-xs text-muted-foreground">{t('intakePulmanDescription')}</div>
              </div>
            </Button>

            <Button variant="outline" className="justify-start h-auto px-6 py-6" onClick={() => handleNavigate(Routes.form_intake_osb)}>
              <FileText className="w-4 h-4 mr-2" />
              <div className="text-left">
                <div className="font-semibold">{t('intakeOsb')}</div>
                <div className="text-xs text-muted-foreground">{t('intakeOsbDescription')}</div>
              </div>
            </Button>

            <Button variant="outline" className="justify-start h-auto px-6 py-6" onClick={() => handleNavigate(Routes.form_intake_rebacare)}>
              <FileText className="w-4 h-4 mr-2" />
              <div className="text-left">
                <div className="font-semibold">{t('intakeRebacare')}</div>
                <div className="text-xs text-muted-foreground">{t('intakeRebacareDescription')}</div>
              </div>
            </Button>

            <Button variant="outline" className="justify-start h-auto px-6 py-6" onClick={() => handleNavigate(Routes.form_intake_ovac)}>
              <FileText className="w-4 h-4 mr-2" />
              <div className="text-left">
                <div className="font-semibold">{t('intakeOvac')}</div>
                <div className="text-xs text-muted-foreground">{t('intakeOvacDescription')}</div>
              </div>
            </Button>

            <Button variant="outline" className="justify-start h-auto px-6 py-6" onClick={() => handleNavigate(Routes.form_intake_steunzolen)}>
              <FileText className="w-4 h-4 mr-2" />
              <div className="text-left">
                <div className="font-semibold">{t('intakeInsoles')}</div>
                <div className="text-xs text-muted-foreground">{t('intakeInsolesDescription')}</div>
              </div>
            </Button>
          </div>
        </div>

        {/* Info Card */}
        <Card className="mt-8 bg-muted/50">
          <CardHeader>
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <CardTitle className="text-lg">{t('gettingStartedTitle')}</CardTitle>
                <CardDescription className="mt-2">
                  {t('gettingStartedDescription')}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    </BaseLayout>
  );
};

export default OverviewPage;
