import React from 'react';
import { BaseLayout } from '@/presentation/components/layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from 'next/router';
import { Routes } from '../routes';
import { UserPlus, Users, FileText } from 'lucide-react';

export const OverviewPage = () => {
  const router = useRouter();
  const { t } = useTranslation('form');

  const handleNavigate = (route: string) => {
    router.push(route);
  };

  return (
    <BaseLayout title={t('title')}>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header Section */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            {t('forms')}
          </h1>
          <p className="text-lg text-gray-600">
            Select an option below to get started
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {/* New Client Card */}
          <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer group" onClick={() => handleNavigate(Routes.form_new_client)}>
            <CardHeader className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <UserPlus className="w-6 h-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">{t('newClientForm')}</CardTitle>
              <CardDescription className="text-base">
                Create a new client profile and start the intake process
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
                New Client
              </Button>
            </CardContent>
          </Card>

          {/* Existing Client Card */}
          <Card className="hover:shadow-lg transition-shadow duration-200 cursor-pointer group" onClick={() => handleNavigate(Routes.form_old_client)}>
            <CardHeader className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center group-hover:bg-secondary/20 transition-colors">
                <Users className="w-6 h-6 text-secondary-foreground" />
              </div>
              <CardTitle className="text-2xl">{t('existingClientForm')}</CardTitle>
              <CardDescription className="text-base">
                Continue with an existing client profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                variant="secondary"
                className="w-full" 
                size="lg"
                onClick={(e) => {
                  e.stopPropagation();
                  handleNavigate(Routes.form_old_client);
                }}
              >
                <Users className="w-4 h-4 mr-2" />
                Existing Client
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Info Card */}
        <Card className="mt-8 max-w-4xl mx-auto bg-muted/50">
          <CardHeader>
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-muted-foreground mt-0.5" />
              <div>
                <CardTitle className="text-lg">Getting Started</CardTitle>
                <CardDescription className="mt-2">
                  Choose whether you're creating a profile for a new client or continuing with an existing one. 
                  After client information is complete, you'll be able to select the appropriate intake form.
                </CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
    </BaseLayout>
  );
};
