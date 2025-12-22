'use client';

import * as React from 'react';
import {CalendarIcon} from 'lucide-react';

import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Popover, PopoverContent, PopoverTrigger} from '@/components/ui/popover';
import {cn} from '@/lib/utils';

function formatDate(date: Date | undefined) {
  if (!date) {
    return '';
  }

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
}

function parseDate(dateString: string): Date | undefined {
  if (!dateString) {
    return undefined;
  }

  // Try DD-MM-YYYY format
  const parts = dateString.split('-');
  if (parts.length === 3) {
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);

    if (!isNaN(day) && !isNaN(month) && !isNaN(year)) {
      // Create date at noon to avoid timezone issues
      const date = new Date(year, month, day, 12, 0, 0);
      if (
        date.getDate() === day &&
        date.getMonth() === month &&
        date.getFullYear() === year
      ) {
        return date;
      }
    }
  }

  return undefined;
}

function isValidDate(date: Date | undefined) {
  if (!date) {
    return false;
  }
  return !isNaN(date.getTime());
}

interface DatePickerProps {
  label?: string;
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  error?: boolean;
  disabled?: (date: Date) => boolean;
  className?: string;
}

export function DatePicker({
  label,
  value,
  onChange,
  placeholder = 'Select date',
  error = false,
  disabled,
  className = 'w-full',
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [month, setMonth] = React.useState<Date | undefined>(value);
  const [inputValue, setInputValue] = React.useState(formatDate(value));

  React.useEffect(() => {
    setInputValue(formatDate(value));
    setMonth(value);
  }, [value]);

  return (
    <div className="flex flex-col gap-2">
      {label && <Label className="px-1">{label}</Label>}
      <div className="relative w-full">
        <Input
          value={inputValue}
          placeholder={placeholder}
          className={cn(
            'w-full bg-background pr-10',
            error && 'border-destructive focus:border-destructive',
          )}
          onChange={e => {
            const newValue = e.target.value;
            setInputValue(newValue);
            const date = parseDate(newValue);
            if (date && isValidDate(date)) {
              onChange?.(date);
              setMonth(date);
            }
          }}
          onKeyDown={e => {
            if (e.key === 'ArrowDown') {
              e.preventDefault();
              setOpen(true);
            }
          }}
        />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                'absolute top-1/2 right-2 h-6 w-6 -translate-y-1/2 p-0',
                error && 'text-destructive',
              )}
            >
              <CalendarIcon className="h-4 w-4" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={value}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              disabled={disabled}
              onSelect={date => {
                onChange?.(date);
                setInputValue(formatDate(date));
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
