import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';
import {ArrowLeft} from 'lucide-react';
import {Routes} from '@/lib/routes';
import {Button} from '../ui/button';

interface Step {
  number: number;
  label: string;
  route: string;
}

interface StepIndicatorProps {
  currentStep: number;
  onBackButtonClicked?: () => void;
}

export const StepIndicator = React.memo<StepIndicatorProps>(
  ({currentStep, onBackButtonClicked}) => {
    const {t} = useTranslation('common');
    const router = useRouter();

    const steps: Step[] = [
      {number: 1, label: 'Client', route: Routes.form_new_client},
      {number: 2, label: 'Form', route: Routes.form_selection},
      {number: 3, label: 'Results', route: Routes.form_results},
    ];

    const handleStepClick = (step: Step) => {
      if (step.number < currentStep) {
        void router.push(step.route);
      }
    };

    const handleBackClick = () => {
      if (onBackButtonClicked) {
        onBackButtonClicked();
      } else if (currentStep === 1) {
        void router.push(Routes.overview);
      } else {
        void router.push(steps[currentStep - 2].route);
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
          {steps.map((step, index) => (
            <React.Fragment key={step.number}>
              <div
                className={`flex items-center gap-2 ${
                  step.number < currentStep ? 'cursor-pointer' : ''
                }`}
                onClick={() => handleStepClick(step)}
              >
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-all ${
                    step.number === currentStep
                      ? 'bg-navbar-foreground text-navbar ring-2 ring-navbar-foreground ring-offset-2 ring-offset-navbar'
                      : step.number < currentStep
                        ? 'bg-navbar-foreground/30 text-navbar-foreground hover:bg-navbar-foreground/40'
                        : 'bg-navbar-border text-navbar-foreground/50'
                  }`}
                >
                  {step.number}
                </div>
                <span
                  className={`text-sm font-medium hidden lg:inline ${
                    step.number === currentStep
                      ? 'text-navbar-foreground'
                      : step.number < currentStep
                        ? 'text-navbar-foreground/80'
                        : 'text-navbar-foreground/50'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 w-12 ${
                    step.number < currentStep
                      ? 'bg-navbar-foreground/50'
                      : 'bg-navbar-foreground/20'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    );
  },
);

StepIndicator.displayName = 'StepIndicator';
