import React from 'react';

interface FormControlProps {
  children: React.ReactNode;
  isRequired?: boolean;
  id?: string;
  className?: string;
}

export const FormControl = React.memo<FormControlProps>(
  ({children, isRequired, id, className = ''}) => {
    return (
      <div
        id={id}
        className={`flex flex-col gap-1.5 ${className}`}
        data-required={isRequired}
      >
        {children}
      </div>
    );
  }
);

FormControl.displayName = 'FormControl';

interface FormLabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode;
  isRequired?: boolean;
}

export const FormLabel = React.memo<FormLabelProps>(
  ({children, isRequired, className = '', ...props}) => {
    return (
      <label
        className={`text-sm font-medium text-gray-700 ${className}`}
        {...props}
      >
        {children}
        {isRequired && <span className="text-red-500 ml-1">*</span>}
      </label>
    );
  }
);

FormLabel.displayName = 'FormLabel';
