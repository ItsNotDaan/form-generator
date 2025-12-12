import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = React.memo<ButtonProps>(
  ({variant = 'primary', size = 'md', children, className = '', ...props}) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

    const variantStyles = {
      primary:
        'bg-brand-500 text-white hover:bg-brand-700 focus:ring-brand-500 shadow-secondary',
      secondary:
        'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-600 shadow-secondary',
      outline:
        'border border-gray-200 bg-white text-gray-700 hover:bg-gray-50 focus:ring-gray-500',
      ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    };

    const sizeStyles = {
      sm: 'text-sm px-3 py-1.5 h-8',
      md: 'text-base px-4 py-2 h-10',
      lg: 'text-lg px-6 py-3 h-12',
    };

    return (
      <button
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
