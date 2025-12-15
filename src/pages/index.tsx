import React from 'react';
import { BaseLayout } from '@/components/layout';
import { Button } from '@/components/ui/button';
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
            {/* New Client Card */}
            <Card className="transition-shadow duration-200 cursor-pointer hover:shadow-lg group" onClick={() => handleNavigate(Routes.form_new_client)}>
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-center w-12 h-12 transition-colors rounded-full bg-primary/10 group-hover:bg-primary/20">
                  <UserPlus className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">{t('newClientForm')}</CardTitle>
                <CardDescription className="text-base">
                  {t('newClientFormDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigate(Routes.form_new_client);
                  }}
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  {t('newClientButton')}
                </Button>
              </CardContent>
            </Card>

            {/* Existing Client Card */}
            <Card className="transition-shadow duration-200 cursor-pointer hover:shadow-lg group" onClick={() => handleNavigate(Routes.form_old_client)}>
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-center w-12 h-12 transition-colors rounded-full bg-primary/10 group-hover:bg-primary/20">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">{t('existingClientForm')}</CardTitle>
                <CardDescription className="text-base">
                  {t('existingClientFormDescription')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  className="w-full"
                  size="lg"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNavigate(Routes.form_old_client);
                  }}
                >
                  <Users className="w-4 h-4 mr-2" />
                  {t('existingClientButton')}
                </Button>
              </CardContent>
            </Card>
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
            <Button
              variant="outline"
              className="justify-start h-auto px-6 py-6 text-left hover:bg-muted"
              onClick={() => handleNavigate(Routes.form_intake_osa)}
            >
              <div className="flex flex-col items-start w-full gap-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="font-semibold">{t('intakeOsa')}</span>
                </div>
                <span className="text-xs text-muted-foreground">{t('intakeOsaDescription')}</span>
              </div>
            </Button>

            <Button
              variant="outline"
              className="justify-start h-auto px-6 py-6 text-left hover:bg-muted"
              onClick={() => handleNavigate(Routes.form_intake_vlos)}
            >
              <div className="flex flex-col items-start w-full gap-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="font-semibold">{t('intakeVlos')}</span>
                </div>
                <span className="text-xs text-muted-foreground">{t('intakeVlosDescription')}</span>
              </div>
            </Button>

            <Button
              variant="outline"
              className="justify-start h-auto px-6 py-6 text-left hover:bg-muted"
              onClick={() => handleNavigate(Routes.form_intake_pulman)}
            >
              <div className="flex flex-col items-start w-full gap-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="font-semibold">{t('intakePulman')}</span>
                </div>
                <span className="text-xs text-muted-foreground">{t('intakePulmanDescription')}</span>
              </div>
            </Button>

            <Button
              variant="outline"
              className="justify-start h-auto px-6 py-6 text-left hover:bg-muted"
              onClick={() => handleNavigate(Routes.form_intake_osb)}
            >
              <div className="flex flex-col items-start w-full gap-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="font-semibold">{t('intakeOsb')}</span>
                </div>
                <span className="text-xs text-muted-foreground">{t('intakeOsbDescription')}</span>
              </div>
            </Button>

            <Button
              variant="outline"
              className="justify-start h-auto px-6 py-6 text-left hover:bg-muted"
              onClick={() => handleNavigate(Routes.form_intake_rebacare)}
            >
              <div className="flex flex-col items-start w-full gap-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="font-semibold">{t('intakeRebacare')}</span>
                </div>
                <span className="text-xs text-muted-foreground">{t('intakeRebacareDescription')}</span>
              </div>
            </Button>

            <Button
              variant="outline"
              className="justify-start h-auto px-6 py-6 text-left hover:bg-muted"
              onClick={() => handleNavigate(Routes.form_intake_ovac)}
            >
              <div className="flex flex-col items-start w-full gap-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="font-semibold">{t('intakeOvac')}</span>
                </div>
                <span className="text-xs text-muted-foreground">{t('intakeOvacDescription')}</span>
              </div>
            </Button>

            <Button
              variant="outline"
              className="justify-start h-auto px-6 py-6 text-left hover:bg-muted"
              onClick={() => handleNavigate(Routes.form_intake_steunzolen)}
            >
              <div className="flex flex-col items-start w-full gap-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  <span className="font-semibold">{t('intakeInsoles')}</span>
                </div>
                <span className="text-xs text-muted-foreground">{t('intakeInsolesDescription')}</span>
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
