import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.memo<InputProps>(
  React.forwardRef<HTMLInputElement, InputProps>(
    ({error, className = '', ...props}, ref) => {
      const baseStyles =
        'w-full px-3 py-2 text-base border rounded-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed';
      const errorStyles = error
        ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
        : 'border-gray-200 focus:border-brand-500 focus:ring-brand-500';

      return (
        <input
          ref={ref}
          className={`${baseStyles} ${errorStyles} ${className}`}
          {...props}
        />
      );
    }
  )
);

Input.displayName = 'Input';
