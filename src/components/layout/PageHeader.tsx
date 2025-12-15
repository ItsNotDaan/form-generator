import React, { memo } from 'react';
import useTranslation from 'next-translate/useTranslation';
import { LeftArrowIcon } from '@/components/icons/LeftArrowIcon';
import { Routes } from '@/lib/routes';
import { Link } from './Link';
import { StepIndicator } from './StepIndicator';
import { ThemeToggle } from '@/components/ui/theme-toggle';

export interface PageHeaderProps {
  title?: string;
  showBackButton?: boolean;
  onBackButtonClicked?: () => void;
  currentStep?: number;
}

export const PageHeader = memo(
  ({ title, showBackButton, onBackButtonClicked, currentStep }: PageHeaderProps) => {
    const { t } = useTranslation('common');

    return (
      <div className="w-full bg-primary shadow-md">
        {/* Desktop & Tablet Layout */}
        <div className="hidden md:block">
          <div className="max-w-[1400px] mx-auto px-3 py-4 flex items-center relative">
            {/* Left: Back button */}
            <div className="flex justify-start flex-1 min-w-0 z-10 gap-3">
              {showBackButton && (
                <button
                  aria-label={t('back')}
                  onClick={() => onBackButtonClicked?.()}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-md text-primary-foreground hover:bg-primary-foreground/20 transition-all text-sm"
                >
                  <LeftArrowIcon className="w-6 h-6" color="currentColor" />
                  <span className="text-lg font-semibold">{t('back')}</span>
                </button>
              )}
            </div>

            {/* Center: Title or Step Indicator */}
            <div className="absolute left-1/2 -translate-x-1/2">
              {currentStep ? (
                <StepIndicator currentStep={currentStep} />
              ) : title ? (
                <p className="text-primary-foreground text-lg font-semibold text-center truncate max-w-[300px]">
                  {title}
                </p>
              ) : null}
            </div>

            {/* Right: Theme Toggle & Eemland Logo */}
            <div className="flex justify-end items-center gap-3 flex-1 min-w-0 z-10">
              <ThemeToggle />
              <Link
                href={Routes.overview}
                className="px-2 py-2 rounded-md hover:bg-primary-foreground/20 transition-all"
              >
                <span className="text-primary-foreground text-lg font-bold tracking-wider">
                  EEMLAND
                </span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="block md:hidden">
          <div className="px-3 py-4 flex items-center">
            {/* Left: Back arrow only */}
            <div className="flex justify-start flex-1 min-w-0">
              {showBackButton && (
                <button
                  aria-label={t('back')}
                  onClick={() => onBackButtonClicked?.()}
                  className="px-2 py-1 rounded-md hover:bg-primary-foreground/20 transition-all min-w-0"
                >
                  <LeftArrowIcon className="w-6 h-6" color="currentColor" />
                </button>
              )}
            </div>

            {/* Center: Title */}
            <div className="flex justify-center flex-1 min-w-0">
              {title && (
                <p className="text-primary-foreground text-base font-semibold text-center truncate">
                  {title}
                </p>
              )}
            </div>

            {/* Right: Theme Toggle & Eemland Logo */}
            <div className="flex justify-end items-center gap-2 flex-1 min-w-0">
              <div className="scale-90">
                <ThemeToggle />
              </div>
              <Link
                href={Routes.overview}
                className="px-2 py-1 rounded-md hover:bg-primary-foreground/20 transition-all"
              >
                <span className="text-primary-foreground text-base font-bold tracking-wide">
                  EEMLAND
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

PageHeader.displayName = 'PageHeader';
