import React from 'react';
import { BaseLayout } from '@/components/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import useTranslation from 'next-translate/useTranslation';

const NotFoundPage = () => {
  const { t } = useTranslation('form');

  return (
    <BaseLayout title={t('notFound')}>
      <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-amber-500" />
              <div>
                <CardTitle className="text-2xl">{t('underDevelopment')}</CardTitle>
                <CardDescription className="mt-2">
                  {t('underDevelopmentDescription')}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {t('pageInProgress', { page: 'NotFoundPage' })}
            </p>
          </CardContent>
        </Card>
      </div>
    </BaseLayout>
  );
};

export default NotFoundPage;
