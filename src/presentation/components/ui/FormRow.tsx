import React from 'react';

interface FormRowProps {
  children: React.ReactNode;
  className?: string;
  columns?: 1 | 2 | 3;
}

/**
 * FormRow - A reusable component for form field rows
 * Automatically handles responsive layouts (stacked on mobile, side-by-side on desktop)
 */
export const FormRow = React.memo<FormRowProps>(
  ({children, className = '', columns = 2}) => {
    const colClasses = {
      1: 'flex flex-col gap-4 md:gap-6',
      2: 'flex flex-col md:flex-row gap-4 md:gap-6',
      3: 'flex flex-col md:flex-row md:grid md:grid-cols-3 gap-4 md:gap-6',
    };

    return <div className={`${colClasses[columns]} ${className}`}>{children}</div>;
  }
);

FormRow.displayName = 'FormRow';

interface FormFieldWrapperProps {
  children: React.ReactNode;
  className?: string;
  flex?: boolean;
}

/**
 * FormFieldWrapper - Wrapper for individual fields in a FormRow
 * Adds flex-1 by default for equal width columns
 */
export const FormFieldWrapper = React.memo<FormFieldWrapperProps>(
  ({children, className = '', flex = true}) => {
    return (
      <div className={`${flex ? 'flex-1' : ''} ${className}`}>{children}</div>
    );
  }
);

FormFieldWrapper.displayName = 'FormFieldWrapper';
