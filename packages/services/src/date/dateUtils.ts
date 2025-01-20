import {
  parseDateFromString,
  validateDay,
  validateMonth,
  validateYear,
} from './stringToDateUtils';

import type { ParseDate, YearMonthDay } from './interface';

interface CreateDateFromYearMonthDayParams extends YearMonthDay {
  fallback?: boolean;
  withValidation?: boolean;
}

interface ParseStartDateParams {
  stringDate?: string;
  initialDate?: ParseDate;
}

export function isUnderMinimumAge(date: Date, min: number = 18): boolean {
  const ageInDays =
    (new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
  return ageInDays < min * 365.25;
}

export function createDateFromYearMonthDay({
  day,
  year,
  month,
  fallback,
  withValidation,
}: CreateDateFromYearMonthDayParams): Date | undefined {
  const {
    year: currentYear,
    month: currentMonth,
    day: currentDay,
  } = validateYearMonthDay({ day, year, month }, fallback, withValidation);

  return currentYear !== undefined &&
    currentMonth !== undefined &&
    currentDay !== undefined
    ? new Date(currentYear, currentMonth, currentDay)
    : undefined;
}

function validateYearMonthDay(
  value: YearMonthDay,
  fallback?: boolean,
  withValidation?: boolean,
): YearMonthDay {
  const day = withValidation ? validateDay(value?.day) : value?.day;
  const year = withValidation ? validateYear(value?.year) : value?.year;
  const month = withValidation ? validateMonth(value?.month) : value?.month;
  return {
    day: day === undefined && fallback ? new Date().getDate() : day,
    year: year === undefined && fallback ? new Date().getFullYear() : year,
    month: month === undefined && fallback ? new Date().getMonth() : month,
  };
}

export function calculateMaxDate(
  date?: Date,
  minAge?: number,
): Date | undefined {
  if ((!date && !minAge) || (minAge && minAge < 0)) return;

  if (minAge) {
    const date = new Date();
    date.setFullYear(date.getFullYear() - minAge);
    return date;
  }

  return date;
}

export function parseStartDate({
  stringDate,
  initialDate,
}: ParseStartDateParams): Date | undefined {
  if (stringDate) {
    return parseDateFromString(stringDate);
  }

  return initialDate ? parseInitialDate(initialDate) : undefined;
}

function parseInitialDate(initialDate: ParseDate): Date | undefined {
  if (!initialDate) return;

  return (
    initialDate.date ??
    createDateFromYearMonthDay({
      day: initialDate.day,
      year: initialDate.year,
      month: initialDate.month,
      fallback: true,
      withValidation: true,
    })
  );
}
