import React from 'react';
import { Label } from './label';
import { Input } from './input';
import { cn } from '@/lib/utils';

interface FormFieldProps {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    required?: boolean;
    error?: boolean;
    type?: 'text' | 'email' | 'tel';
    className?: string;
}

export const FormField: React.FC<FormFieldProps> = ({
    id,
    label,
    value,
    onChange,
    placeholder,
    required = false,
    error = false,
    type = 'text',
    className,
}) => {
    return (
        <div className={cn('space-y-2', className)} id={`field-${id}`}>
            <Label htmlFor={id}>
                {label} {required && <span className="text-destructive">*</span>}
            </Label>
            <Input
                id={id}
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className={cn(error && 'border-destructive')}
            />
        </div>
    );
};
