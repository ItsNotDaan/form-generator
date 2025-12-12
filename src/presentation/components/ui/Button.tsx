import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button = React.memo<ButtonProps>(
  ({variant = 'primary', size = 'md', children, className = '', ...props}) => {
    const baseStyles =
      'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]';

    const variantStyles = {
      primary:
        'bg-brand-500 text-white hover:bg-brand-600 focus:ring-brand-500 shadow-md hover:shadow-lg',
      secondary:
        'bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-600 shadow-md hover:shadow-lg',
      outline:
        'border-2 border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400 focus:ring-gray-500',
      ghost: 'text-gray-700 hover:bg-gray-100 focus:ring-gray-500',
    };

    const sizeStyles = {
      sm: 'text-sm px-4 py-2 h-9',
      md: 'text-base px-6 py-3 h-11',
      lg: 'text-lg px-8 py-4 h-13',
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
