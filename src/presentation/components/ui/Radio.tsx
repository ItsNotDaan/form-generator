import React, {createContext, useContext} from 'react';

interface RadioGroupContextValue {
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
}

const RadioGroupContext = createContext<RadioGroupContextValue>({});

interface RadioGroupProps {
  children: React.ReactNode;
  value?: string;
  onChange?: (value: string) => void;
  name?: string;
  className?: string;
}

export const RadioGroup = React.memo<RadioGroupProps>(
  ({children, value, onChange, name, className = ''}) => {
    return (
      <RadioGroupContext.Provider value={{value, onChange, name}}>
        <div className={className}>{children}</div>
      </RadioGroupContext.Provider>
    );
  }
);

RadioGroup.displayName = 'RadioGroup';

interface RadioProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'size'> {
  value: string;
  children: React.ReactNode;
  size?: 'sm' | 'md';
}

export const Radio = React.memo<RadioProps>(
  ({value, children, size = 'md', className = '', ...props}) => {
    const {value: groupValue, onChange, name} = useContext(RadioGroupContext);
    const isChecked = groupValue === value;

    const sizeStyles = {
      sm: 'w-4 h-4',
      md: 'w-5 h-5',
    };

    return (
      <label className={`flex items-center gap-2 cursor-pointer ${className}`}>
        <input
          type="radio"
          value={value}
          checked={isChecked}
          onChange={() => onChange?.(value)}
          name={name}
          className={`${sizeStyles[size]} text-brand-500 border-gray-300 focus:ring-brand-500 focus:ring-2 focus:ring-offset-0`}
          {...props}
        />
        <span className="text-base text-gray-700">{children}</span>
      </label>
    );
  }
);

Radio.displayName = 'Radio';
