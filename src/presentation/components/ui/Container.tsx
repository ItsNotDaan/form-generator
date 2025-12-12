import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

/**
 * FormContainer - Main container for form pages
 * Provides consistent padding, background, and gap spacing with modern card design
 */
export const FormContainer = React.memo<ContainerProps>(
  ({children, className = '', id}) => {
    return (
      <div
        id={id}
        className={`w-full flex flex-col bg-white rounded-2xl p-6 md:p-8 lg:p-10 gap-6 md:gap-8 shadow-lg border border-gray-100 ${className}`}
      >
        {children}
      </div>
    );
  }
);

FormContainer.displayName = 'FormContainer';

interface PageContainerProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * PageContainer - Container for content sections within a page
 * Used for grouping related content with consistent spacing
 */
export const PageContainer = React.memo<PageContainerProps>(
  ({children, className = ''}) => {
    return (
      <div className={`flex flex-col gap-6 md:gap-8 ${className}`}>
        {children}
      </div>
    );
  }
);

PageContainer.displayName = 'PageContainer';
