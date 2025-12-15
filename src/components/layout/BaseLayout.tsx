import React, { memo } from 'react';
import { PageHeader, PageHeaderProps } from './PageHeader';

interface Props extends PageHeaderProps {
  children: JSX.Element[] | JSX.Element;
  parentClassName?: string;
}

export const BaseLayout = memo(
  ({
    children,
    title,
    showBackButton,
    onBackButtonClicked,
    currentStep,
    parentClassName = '',
  }: Props) => {
    return (
      <div className="flex flex-col w-full min-h-screen h-full bg-background pt-16">
        <PageHeader
          title={title}
          showBackButton={showBackButton}
          onBackButtonClicked={onBackButtonClicked}
          currentStep={currentStep}
        />

        <div className="flex flex-row flex-1 w-full h-full items-stretch">
          {/* Main container */}
          <div className="flex-1 bg-background">
            <div className={`p-4 md:p-6 lg:p-8 flex flex-col h-full w-full max-w-7xl mx-auto ${parentClassName}`}>
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

BaseLayout.displayName = 'BaseLayout';
