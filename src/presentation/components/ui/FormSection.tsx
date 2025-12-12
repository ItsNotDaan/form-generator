import React from 'react';

interface FormSectionProps {
  title?: string;
  required?: boolean;
  children: React.ReactNode;
  className?: string;
  bordered?: boolean;
  description?: string;
}

export const FormSection = React.memo<FormSectionProps>(
  ({title, required, children, className = '', bordered = false, description}) => {
    return (
      <div className={`flex flex-col space-y-4 ${className}`}>
        {title && (
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-gray-900">
              {title}
              {required && <span className="text-red-500 ml-1">*</span>}
            </h3>
            {description && (
              <p className="text-sm text-gray-500">{description}</p>
            )}
          </div>
        )}
        <div
          className={
            bordered
              ? 'border border-gray-200 rounded-xl p-6 bg-white shadow-sm'
              : 'bg-white rounded-xl p-6 shadow-sm border border-gray-100'
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
    return <div className={`border-t border-gray-200 my-6 ${className}`} />;
  }
);

FormDivider.displayName = 'FormDivider';
