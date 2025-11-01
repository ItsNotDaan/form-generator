import {DateTime} from 'luxon';

export enum DateFormat {
  WITH_SLASH = 'dd/LL/yyyy',
  WITH_DASH = 'dd-LL-yyyy',
  ISO_LOCAL_DATE = 'yyyy-LL-dd',
  DATE_TIME_WITH_SLASH = 'dd/LL/yyyy HH:mm',
  DATE_TIME_WITH_DASH = 'dd-LL-yyyy HH:mm',
  SHORT = 'dd-LL-yy',
  STRING_MONTH_DAY = 'LLLL dd',
  DAY_OF_WEEK_SHORT = 'ccc',
  MONTH_YEAR = 'LLLL yyyy',
  WEEK_NUMBER = 'WW',
}

export enum TimeFormat {
  HOUR_MINUTE = 'HH:mm',
}

function getDateTime(date: string | Date) {
  const dateTime =
    typeof date === 'string'
      ? DateTime.fromISO(date)
      : DateTime.fromJSDate(date);
  return dateTime.setLocale('nl');
}

export function formatDate(
  date?: string | Date,
  dateFormat: DateFormat = DateFormat.WITH_DASH
): string {
  if (!date) {
    return '';
  }
  const dateTime = getDateTime(date);
  return dateTime.toFormat(dateFormat);
}

export function formatTimeFromDate(
  date?: string | Date,
  timeFormat: TimeFormat = TimeFormat.HOUR_MINUTE
): string {
  if (!date) {
    return '';
  }
  const dateTime = getDateTime(date);
  return dateTime.toFormat(timeFormat);
}

/**
 * Formats a time in hours, minutes and seconds to a string
 * NOTE: Uses UTC time, i.e. the passed time will be formatted
 * to the requested string format independent of the timezone
 */
export function formatTime(
  hours: number,
  minutes = 0,
  seconds = 0,
  timeFormat: TimeFormat = TimeFormat.HOUR_MINUTE
): string {
  return DateTime.fromSeconds((hours * 60 + minutes) * 60 + seconds)
    .toUTC()
    .toFormat(timeFormat);
}

export function isToday(date: Date): boolean {
  return DateTime.now().hasSame(DateTime.fromJSDate(date), 'day');
}

export function isPast(date: Date): boolean {
  return DateTime.now().diff(DateTime.fromJSDate(date)).milliseconds > 0;
}

export function isWeekday(date: Date): boolean {
  return DateTime.fromJSDate(date).weekday < 6;
}

export function stringToDate(date: string | undefined): Date | undefined {
  if (!date) {
    return undefined;
  }
  return DateTime.fromISO(date).toJSDate();
}

export function getStartOfDay(date: Date) {
  return DateTime.fromJSDate(date).startOf('day').toJSDate();
}

export function getStartOfMonth(date: Date) {
  return DateTime.fromJSDate(date).startOf('month').toJSDate();
}

export function getStartOfWeek(date: Date) {
  return DateTime.fromJSDate(date).startOf('week').toJSDate();
}

export function getNumberOfMonths(from: Date, to: Date) {
  return DateTime.fromJSDate(to).diff(DateTime.fromJSDate(from), 'months')
    .months;
}

export function getNumberOfDays(from: Date, to: Date) {
  return DateTime.fromJSDate(to).diff(DateTime.fromJSDate(from), 'days').days;
}

export function getNumberOfMinutes(from: Date, to: Date) {
  return DateTime.fromJSDate(to).diff(DateTime.fromJSDate(from), 'minutes')
    .minutes;
}

export function isInRange(date: Date, from: Date, to: Date): boolean {
  return from.getTime() <= date.getTime() && date.getTime() < to.getTime();
}

export function isInRangeExclusive(date: Date, from: Date, to: Date): boolean {
  return from.getTime() < date.getTime() && date.getTime() < to.getTime();
}

export function isInSameDay(date1: Date, date2: Date): boolean {
  return DateTime.fromJSDate(date1).hasSame(DateTime.fromJSDate(date2), 'day');
}

export function addMonths(date: Date, months: number): Date {
  return DateTime.fromJSDate(date).plus({months}).toJSDate();
}

export function addWeeks(date: Date, weeks: number): Date {
  return DateTime.fromJSDate(date).plus({weeks}).toJSDate();
}

export function addDays(date: Date, days: number): Date {
  return DateTime.fromJSDate(date).plus({days}).toJSDate();
}

export function addMinutes(date: Date, minutes: number): Date {
  return DateTime.fromJSDate(date).plus({minutes}).toJSDate();
}

export function getLastDayOfTheMonth(month: number, year: number): number {
  const nextMonth = new Date(year, month, 1);
  nextMonth.setDate(0);
  return nextMonth.getDate();
}

/**
 * Returns an array of dates for all days in the week
 * @param date JS date around which to find the week
 */
export function getWeekFromDate(date: Date) {
  const startOfWeek = DateTime.fromJSDate(date).startOf('week');
  const week = [];
  for (let i = 0; i < 7; i++) {
    week.push(startOfWeek.plus({days: i}).toJSDate());
  }
  return week;
}

export function isOverlapping(
  range1: {start: Date; end: Date},
  range2: {start: Date; end: Date}
): boolean {
  return (
    isInRange(range1.start, range2.start, range2.end) ||
    isInRangeExclusive(range1.end, range2.start, range2.end) ||
    isInRange(range2.start, range1.start, range1.end)
  );
}

export function daysFromNow(
  date: string,
  t: (key: string) => string
): {number: number; string: string} {
  const now = DateTime.now();
  const targetDate = DateTime.fromISO(date);
  const diff = targetDate.diff(now, 'days').days;

  const roundedDiff = Math.round(diff);
  const absoluteDiff = Math.abs(roundedDiff);

  let resultString = '';
  if (roundedDiff === 0) {
    resultString = 'Vandaag';
  } else {
    resultString = `${roundedDiff < 0 ? '-' : ''}${absoluteDiff} ${
      absoluteDiff > 1 ? t('days').toLowerCase() : t('day').toLowerCase()
    }`;
  }

  return {number: roundedDiff, string: resultString};
}
