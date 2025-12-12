import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
}

/**
 * FormContainer - Main container for form pages
 * Provides consistent padding, background, and gap spacing
 */
export const FormContainer = React.memo<ContainerProps>(
  ({children, className = '', id}) => {
    return (
      <div
        id={id}
        className={`w-full flex flex-col bg-white p-4 md:p-6 rounded-md gap-4 md:gap-6 ${className}`}
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
      <div className={`flex flex-col gap-4 md:gap-6 ${className}`}>
        {children}
      </div>
    );
  }
);

PageContainer.displayName = 'PageContainer';
