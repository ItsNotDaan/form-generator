import React from 'react';
import { BaseLayout, FormSection } from '@/components/layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import useTranslation from 'next-translate/useTranslation';

const FormIntakeOVACPage = () => {
  const { t } = useTranslation('form');

  return (
    <BaseLayout title={t('intakeOvac')} currentStep={2}>
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col items-center justify-center gap-3 mb-12">
          <h1 className="text-4xl font-bold text-foreground">{t('intakeOvac')}</h1>
          <p className="text-lg text-muted-foreground">Under Development</p>
        </div>

        <FormSection>
          <Card>
            <CardHeader>
              <div className="flex items-start gap-3">
                <AlertCircle className="w-6 h-6 text-amber-500" />
                <div>
                  <CardTitle className="text-2xl">Under Development</CardTitle>
                  <CardDescription className="mt-2">
                    This page is currently being migrated to the new Tailwind CSS design system with shadcn/ui components.
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Page: FormIntakeOVACPage - Migration in progress
              </p>
            </CardContent>
          </Card>
        </FormSection>
      </div>
    </BaseLayout>
  );
};

export default FormIntakeOVACPage;
