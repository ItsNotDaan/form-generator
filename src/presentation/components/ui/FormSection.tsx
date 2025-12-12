import React from 'react';

interface FormSectionProps {
  title?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
  bordered?: boolean;
}

export const FormSection = React.memo<FormSectionProps>(
  ({title, required, children, className = '', bordered = false}) => {
    return (
      <div className={`flex flex-col ${className}`}>
        {title && (
          <p className="font-bold mb-3 text-base md:text-lg">
            {title}
            {required && <span className="text-red-500 ml-1">*</span>}
          </p>
        )}
        <div
          className={
            bordered
              ? 'border border-gray-200 rounded-md p-4 mt-2'
              : undefined
          }
        >
          {children}
        </div>
      </div>
    );
  }
);

FormSection.displayName = 'FormSection';

interface FormDividerProps {
  className?: string;
}

export const FormDivider = React.memo<FormDividerProps>(
  ({className = ''}) => {
    return <div className={`border-t border-gray-200 ${className}`} />;
  }
);

FormDivider.displayName = 'FormDivider';
