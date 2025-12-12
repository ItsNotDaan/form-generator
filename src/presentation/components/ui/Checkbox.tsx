import React from 'react';

interface CheckboxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  children?: React.ReactNode;
  size?: 'sm' | 'md';
}

export const Checkbox = React.memo<CheckboxProps>(
  React.forwardRef<HTMLInputElement, CheckboxProps>(
    ({children, size = 'md', className = '', ...props}, ref) => {
      const sizeStyles = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
      };

      return (
        <label
          className={`flex items-center gap-2 cursor-pointer ${className}`}
        >
          <input
            ref={ref}
            type="checkbox"
            className={`${sizeStyles[size]} text-brand-500 border-gray-300 rounded-0.5 focus:ring-brand-500 focus:ring-2 focus:ring-offset-0`}
            {...props}
          />
          {children && <span className="text-base text-gray-700">{children}</span>}
        </label>
      );
    }
  )
);

Checkbox.displayName = 'Checkbox';
