import React, {memo} from 'react';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import useTranslation from 'next-translate/useTranslation';
import {DateTime} from 'luxon';
import {capitalizeFirstLetter} from '@/utils/string';

interface DatePickerProps {
  date?: Date;
  onDateChanged?: (date?: Date) => void;
  maxDate?: Date | null;
  placeholder?: string;
  className?: string;
  error?: boolean;
}

export const DatePicker = memo<DatePickerProps>(
  ({
    date,
    onDateChanged,
    maxDate = new Date(),
    placeholder,
    className = '',
    error = false,
  }) => {
    const {t, lang} = useTranslation('common');

    const errorStyles = error
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
      : 'border-gray-200 focus:border-brand-500 focus:ring-brand-500';

    return (
      <div className={`relative ${className}`}>
        <ReactDatePicker
          selected={date}
          onChange={(date: Date | null) => onDateChanged?.(date || undefined)}
          dateFormat="dd-MM-yyyy"
          maxDate={maxDate}
          placeholderText={placeholder || t('selectDate')}
          locale={lang}
          showMonthDropdown
          showYearDropdown
          dropdownMode="select"
          className={`w-full px-3 py-2 text-sm border rounded-1.5 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 ${errorStyles}`}
          calendarClassName="tailwind-datepicker"
          wrapperClassName="w-full"
        />
        <style jsx global>{`
          .tailwind-datepicker {
            font-family: inherit;
            border: 1px solid #DCE7F6;
            border-radius: 6px;
            box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.15);
          }
          .react-datepicker__header {
            background-color: #F7FAFE;
            border-bottom: 1px solid #DCE7F6;
          }
          .react-datepicker__day--selected,
          .react-datepicker__day--keyboard-selected {
            background-color: #3D7014;
            color: white;
          }
          .react-datepicker__day:hover {
            background-color: #EFF4FA;
          }
        `}</style>
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';
