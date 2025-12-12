import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
}

export const Input = React.memo<InputProps>(
  React.forwardRef<HTMLInputElement, InputProps>(
    ({error, className = '', ...props}, ref) => {
      const baseStyles = [
        'w-full px-4 py-3 text-base border rounded-lg',
        'transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-offset-0',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        'placeholder:text-gray-400 bg-white shadow-sm',
      ].join(' ');
      
      const errorStyles = error
        ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20'
        : 'border-gray-200 focus:border-brand-500 focus:ring-brand-500/20 hover:border-gray-300';

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
