import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';
import {ArrowLeft} from 'lucide-react';
import {Routes} from '@/lib/routes';

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
        router.push(step.route);
      }
    };

    const handleBackClick = () => {
      if (onBackButtonClicked) {
        onBackButtonClicked();
      } else if (currentStep > 1) {
        router.push(steps[currentStep - 2].route);
      }
    };

    return (
      <div className="flex items-center justify-center gap-4">
        {/* Back Button */}
        <button
          onClick={handleBackClick}
          className="inline-flex items-center justify-center gap-2 px-3 text-sm font-medium rounded-md text-primary-foreground hover:bg-primary-foreground/15"
          aria-label={t('back')}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="hidden sm:inline">{t('back')}</span>
        </button>

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
                      ? 'bg-white text-brand-700 ring-2 ring-white ring-offset-2 ring-offset-brand-700'
                      : step.number < currentStep
                        ? 'bg-white/30 text-white hover:bg-white/40'
                        : 'bg-brand-800 text-white/50'
                  }`}
                >
                  {step.number}
                </div>
                <span
                  className={`text-sm font-medium hidden lg:inline ${
                    step.number === currentStep
                      ? 'text-white'
                      : step.number < currentStep
                        ? 'text-white/80'
                        : 'text-white/50'
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div
                  className={`h-0.5 w-12 ${
                    step.number < currentStep ? 'bg-white/50' : 'bg-white/20'
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
