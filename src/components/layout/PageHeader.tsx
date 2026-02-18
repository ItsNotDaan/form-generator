import React, {memo} from 'react';
import useTranslation from 'next-translate/useTranslation';
import {useRouter} from 'next/router';
import {ArrowLeft} from 'lucide-react';
import {Routes} from '@/lib/routes';
import {getAssetPath} from '@/utils/assetPath';
import {Link} from './Link';
import {ThemeToggle} from '@/components/ui/theme-toggle';
import {Button} from '../ui/button';
import {loadStepRoute, saveStepRoute} from '@/utils/localStorageHelper';

export interface PageHeaderProps {
  title?: string;
  onBackButtonClicked?: () => void;
  currentStep?: number;
}

interface StepIndicatorProps {
  currentStep: number;
  onBackButtonClicked?: () => void;
}

const StepIndicator = memo<StepIndicatorProps>(
  ({currentStep, onBackButtonClicked}) => {
    const {t} = useTranslation('common');
    const router = useRouter();

    const [stepRoutes, setStepRoutes] = React.useState<Array<string | null>>([
      null,
      null,
      null,
      null,
    ]);

    const stepLabels = ['Client', 'Form Selection', 'Form', 'Results'];

    const handleBackClick = () => {
      if (onBackButtonClicked) {
        onBackButtonClicked();
      } else {
        router.back();
      }
    };

    React.useEffect(() => {
      if (!currentStep) return;

      saveStepRoute(currentStep, router.asPath);
      setStepRoutes([
        loadStepRoute(1),
        loadStepRoute(2),
        loadStepRoute(3),
        loadStepRoute(4),
      ]);
    }, [currentStep, router.asPath]);

    const handleStepClick = (stepIndex: number) => {
      const route = stepRoutes[stepIndex];
      const stepNumber = stepIndex + 1;
      if (!route || stepNumber === currentStep) return;
      void router.push(route);
    };

    return (
      <div className="flex items-center justify-center gap-4">
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

        <div className="items-center hidden gap-2 md:flex">
          {stepLabels.map((label, index) => {
            const stepNumber = index + 1;
            const hasRoute = !!stepRoutes[index];
            const isCurrent = stepNumber === currentStep;
            const canNavigate = hasRoute && !isCurrent;

            return (
              <React.Fragment key={stepNumber}>
                <div
                  className={`flex items-center gap-2 ${
                    canNavigate
                      ? 'cursor-pointer'
                      : !hasRoute
                        ? 'cursor-not-allowed opacity-60'
                        : ''
                  }`}
                  onClick={() => handleStepClick(index)}
                >
                  <div
                    className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-semibold transition-all ${
                      isCurrent
                        ? 'bg-navbar-foreground text-navbar ring-2 ring-navbar-foreground ring-offset-2 ring-offset-navbar'
                        : hasRoute
                          ? 'bg-navbar-foreground/30 text-navbar-foreground'
                          : 'bg-navbar-border text-navbar-foreground/50'
                    }`}
                  >
                    {stepNumber}
                  </div>
                  <span
                    className={`text-sm font-medium hidden lg:inline whitespace-nowrap ${
                      isCurrent
                        ? 'text-navbar-foreground'
                        : hasRoute
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
                      hasRoute && stepRoutes[index + 1]
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

export const PageHeader = memo(
  ({title, onBackButtonClicked, currentStep}: PageHeaderProps) => {
    return (
      <nav className="fixed top-0 w-full border-b z-25 bg-navbar start-0 border-navbar-border">
        <div className="grid items-center h-16 max-w-screen-xl grid-cols-3 grid-rows-1 gap-4 p-4 mx-auto">
          <div className="flex items-center gap-4">
            <Link href={Routes.overview} className="flex items-center">
              <img
                src={getAssetPath(
                  '/images/global/eemland-logo-alleen-white.png',
                )}
                className="w-auto h-10"
                alt="Eemland Logo"
              />
            </Link>
          </div>

          {/* Center Column - Title or Step Indicator */}
          <div className="flex justify-center">
            {currentStep ? (
              <StepIndicator
                currentStep={currentStep}
                onBackButtonClicked={onBackButtonClicked}
              />
            ) : title ? (
              <h1 className="text-base font-semibold text-center truncate md:text-lg text-navbar-foreground">
                {title}
              </h1>
            ) : null}
          </div>

          {/* Right Column - Actions */}
          <div className="flex items-center justify-end gap-2">
            <ThemeToggle className="w-8 h-8" />
          </div>
        </div>
      </nav>
    );
  },
);

PageHeader.displayName = 'PageHeader';
