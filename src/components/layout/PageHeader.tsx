import React, {memo} from 'react';
import useTranslation from 'next-translate/useTranslation';
import {ArrowLeft} from 'lucide-react';
import {Routes} from '@/lib/routes';
import {getAssetPath} from '@/utils/assetPath';
import {Link} from './Link';
import {StepIndicator} from './StepIndicator';
import {ThemeToggle} from '@/components/ui/theme-toggle';

export interface PageHeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackButtonClicked?: () => void;
  currentStep?: number;
}

export const PageHeader = memo(
  ({
    title,
    showBackButton,
    onBackButtonClicked,
    currentStep,
  }: PageHeaderProps) => {
    const {t} = useTranslation('common');

    return (
      <nav className="fixed top-0 w-full border-b z-25 bg-primary start-0 border-primary-foreground/10">
        <div className="grid items-center h-16 max-w-screen-xl grid-cols-3 grid-rows-1 gap-4 p-4 mx-auto">
          {/* Left Column - Logo & Back Button */}
          <div className="flex items-center gap-4">
            <Link href={Routes.overview} className="flex items-center">
              <img
                src={getAssetPath(
                  '/images/global/eemland-logo-alleen-white.png'
                )}
                className="w-auto h-10"
                alt="Eemland Logo"
              />
            </Link>

            {showBackButton && (
              <button
                onClick={() => onBackButtonClicked?.()}
                className="inline-flex items-center justify-center gap-2 px-3 text-sm font-medium rounded-md text-primary-foreground hover:bg-primary-foreground/15 h-9 cursor-pointer"
                aria-label={t('back')}
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">{t('back')}</span>
              </button>
            )}
          </div>

          {/* Center Column - Title or Step Indicator */}
          <div className="flex justify-center">
            {currentStep ? (
              <StepIndicator
                currentStep={currentStep}
                onBackButtonClicked={onBackButtonClicked}
              />
            ) : title ? (
              <h1 className="text-base font-semibold text-center truncate md:text-lg text-primary-foreground">
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
  }
);

PageHeader.displayName = 'PageHeader';
