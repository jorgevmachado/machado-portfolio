import { TDateSeparator } from './interface';

import { createDateFromYearMonthDay } from './dateUtils';

export function parseDateFromString(
  value: string,
  dateSeparators: Array<TDateSeparator> = ['-', '/'],
): Date | undefined {
  return dateSeparators
    .map((separator) => parseDateFromStringWithSeparator(value, separator))
    .filter((date) => date !== undefined)
    .shift();
}

export function parseDateFromStringWithSeparator(
  value: string,
  separator: TDateSeparator = '-',
): Date | undefined {
  const splitValue = splitDateString(value, separator);
  return !splitValue ? undefined : createDateFromParts(splitValue);
}

function splitDateString(
  value: string,
  separator: TDateSeparator,
): Array<string> | undefined {
  const array = value.split(separator);
  return array.length === 3 ? normalizeDateParts(array, separator) : undefined;
}

function normalizeDateParts(
  array: Array<string>,
  separator: string,
): Array<string> {
  switch (separator) {
    case '/':
      return array.reverse();
    case '-':
    default:
      return array;
  }
}

function createDateFromParts(array: Array<string>): Date | undefined {
  const year = parseYear(array[0]);
  const month = parseMonth(array[1]);
  const day = parseDay(array[2]);
  return createDateFromYearMonthDay({ year, month, day });
}

function parseYear(value?: string): number | undefined {
  if (!value) {
    return;
  }

  const valueNumber = Number(value);

  return isNaN(valueNumber) ? undefined : validateYear(valueNumber);
}

export function validateYear(year?: number): number | undefined {
  if (!year) {
    return;
  }
  return year >= 1000 && year <= 9999 ? year : undefined;
}

function parseMonth(value?: string): number | undefined {
  if (!value) {
    return;
  }
  const valueNumber = Number(value);

  return isNaN(valueNumber) ? undefined : validateMonth(valueNumber);
}

export function validateMonth(month?: number): number | undefined {
  if (month === undefined) {
    return;
  }

  if (month < 0 || month > 12) {
    return;
  }

  return month === 0 ? month : month - 1;
}

function parseDay(value?: string): number | undefined {
  if (!value) {
    return;
  }

  const valueNumber = Number(value);

  return isNaN(valueNumber) ? undefined : validateDay(valueNumber);
}

export function validateDay(day?: number): number | undefined {
  if (!day) {
    return;
  }

  return day <= 0 ? undefined : day;
}
