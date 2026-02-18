import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';
import {ArrowLeft} from 'lucide-react';
import {Routes} from '@/lib/routes';
import {Button} from '../ui/button';

interface StepIndicatorProps {
  currentStep: number;
  onBackButtonClicked?: () => void;
}

export const StepIndicator = React.memo<StepIndicatorProps>(
  ({currentStep, onBackButtonClicked}) => {
    const {t} = useTranslation('common');
    const router = useRouter();

    const stepLabels = ['Client', 'Form', 'Results'];

    const handleBackClick = () => {
      if (onBackButtonClicked) {
        onBackButtonClicked();
      } else if (currentStep === 1) {
        void router.push(Routes.overview);
      } else {
        router.back();
      }
    };

    return (
      <div className="flex items-center justify-center gap-4">
        {/* Back Button */}
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-navbar-foreground hover:text-navbar-foreground/60"
          onClick={handleBackClick}
          aria-label={t('back')}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">{t('back')}</span>
        </Button>

        {/* Step Indicator */}
        <div className="items-center hidden gap-2 md:flex">
          {stepLabels.map((label, index) => {
            const stepNumber = index + 1;
            const isComplete = stepNumber < currentStep;
            const isCurrent = stepNumber === currentStep;

            return (
              <React.Fragment key={stepNumber}>
                <div className="flex items-center gap-2">
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-all ${
                      isCurrent
                        ? 'bg-navbar-foreground text-navbar ring-2 ring-navbar-foreground ring-offset-2 ring-offset-navbar'
                        : isComplete
                          ? 'bg-navbar-foreground/30 text-navbar-foreground'
                          : 'bg-navbar-border text-navbar-foreground/50'
                    }`}
                  >
                    {stepNumber}
                  </div>
                  <span
                    className={`text-sm font-medium hidden lg:inline ${
                      isCurrent
                        ? 'text-navbar-foreground'
                        : isComplete
                          ? 'text-navbar-foreground/80'
                          : 'text-navbar-foreground/50'
                    }`}
                  >
                    {label}
                  </span>
                </div>
                {index < stepLabels.length - 1 && (
                  <div
                    className={`h-0.5 w-12 ${
                      isComplete
                        ? 'bg-navbar-foreground/50'
                        : 'bg-navbar-foreground/20'
                    }`}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  },
);

StepIndicator.displayName = 'StepIndicator';
