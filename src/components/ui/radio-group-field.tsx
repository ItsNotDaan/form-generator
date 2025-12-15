import React from 'react';
import { Label } from './label';
import { RadioGroup, RadioGroupItem } from './radio-group';
import { cn } from '@/lib/utils';

interface RadioOption {
    value: string;
    label: string;
}

interface RadioGroupFieldProps {
    id?: string;
    label?: string;
    value: string;
    onChange: (value: string) => void;
    options: RadioOption[];
    required?: boolean;
    error?: boolean;
    layout?: 'vertical' | 'horizontal' | 'grid-2' | 'grid-4';
    className?: string;
}

export const RadioGroupField: React.FC<RadioGroupFieldProps> = ({
    id,
    label,
    value,
    onChange,
    options,
    required = false,
    error = false,
    layout = 'vertical',
    className,
}) => {
    const layoutClasses = {
        vertical: 'flex flex-col space-y-2',
        horizontal: 'flex gap-6',
        'grid-2': 'grid grid-cols-1 md:grid-cols-2 gap-4',
        'grid-4': 'grid grid-cols-2 md:grid-cols-4 gap-4',
    };

    return (
        <div className={cn('space-y-2', className)} id={id ? `field-${id}` : undefined}>
            {label && (
                <Label>
                    {label} {required && <span className="text-destructive">*</span>}
                </Label>
            )}
            <RadioGroup value={value} onValueChange={onChange} className={layoutClasses[layout]}>
                {options.map((option) => (
                    <div key={option.value} className="flex items-center space-x-2">
                        <RadioGroupItem
                            value={option.value}
                            id={`${id || 'radio'}-${option.value}`}
                            className={cn(!value && error && 'border-destructive')}
                        />
                        <Label htmlFor={`${id || 'radio'}-${option.value}`} className="font-normal cursor-pointer">
                            {option.label}
                        </Label>
                    </div>
                ))}
            </RadioGroup>
        </div>
    );
};
