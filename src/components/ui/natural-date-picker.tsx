'use client';

import * as React from 'react';
import {parseDate} from 'chrono-node';
import {CalendarIcon} from 'lucide-react';

import {Button} from '@/components/ui/button';
import {Calendar} from '@/components/ui/calendar';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {cn} from '@/lib/utils';

function formatDate(date: Date | undefined) {
  if (!date) {
    return '';
  }

  return date.toLocaleDateString('nl-NL', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

interface NaturalDatePickerProps {
  date?: Date;
  onDateChanged?: (date?: Date) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  error?: boolean;
}

export function NaturalDatePicker({
  date: initialDate,
  onDateChanged,
  placeholder = 'Tomorrow or next week',
  label,
  className = '',
  error = false,
}: NaturalDatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(
    initialDate ? formatDate(initialDate) : ''
  );
  const [date, setDate] = React.useState<Date | undefined>(initialDate);
  const [month, setMonth] = React.useState<Date | undefined>(
    initialDate || new Date()
  );

  // Sync with external date changes
  React.useEffect(() => {
    if (initialDate) {
      setDate(initialDate);
      setValue(formatDate(initialDate));
      setMonth(initialDate);
    }
  }, [initialDate]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);

    const parsedDate = parseDate(inputValue);
    if (parsedDate) {
      setDate(parsedDate);
      setMonth(parsedDate);
      onDateChanged?.(parsedDate);
    } else if (inputValue === '') {
      setDate(undefined);
      onDateChanged?.(undefined);
    }
  };

  const handleCalendarSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setValue(formatDate(selectedDate));
    setOpen(false);
    onDateChanged?.(selectedDate);
  };

  const errorStyles = error
    ? 'border-destructive focus:border-destructive focus:ring-destructive'
    : 'border-input focus:border-ring focus:ring-ring';

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {label && (
        <Label htmlFor="date" className="px-1">
          {label}
        </Label>
      )}
      <div className="relative flex gap-2">
        <Input
          id="date"
          value={value}
          placeholder={placeholder}
          className={cn('bg-background pr-10', errorStyles)}
          onChange={handleInputChange}
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
              id="date-picker"
              variant="ghost"
              className="absolute top-1/2 right-2 size-6 -translate-y-1/2"
              size="icon"
            >
              <CalendarIcon className="size-3.5" />
              <span className="sr-only">Select date</span>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto overflow-hidden p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              month={month}
              onMonthChange={setMonth}
              onSelect={handleCalendarSelect}
              fromYear={1900}
              toYear={new Date().getFullYear() + 10}
            />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
