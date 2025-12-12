import React, {memo} from 'react';
import {PageHeader, PageHeaderProps} from './PageHeader';

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
    parentClassName = '',
  }: Props) => {
    return (
      <div className="flex flex-col w-full min-h-screen h-full">
        <PageHeader
          title={title}
          showBackButton={showBackButton}
          onBackButtonClicked={onBackButtonClicked}
        />

        <div className="flex flex-row flex-1 w-full h-full items-stretch">
          {/* Main container */}
          <div className="bg-gray-100 flex-1">
            <div className={`p-4 flex flex-col h-full w-full ${parentClassName}`}>
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

BaseLayout.displayName = 'BaseLayout';
