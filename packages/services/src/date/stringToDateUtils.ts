import type { TDateSeparator } from './interface';

import { dayValidator, monthValidator, yearValidator } from '../validator';

import { createDateFromYearMonthDay } from './dateUtils';

/**
 * Converts a string to a date.
 * @param value
 * @param dateSeparators
 */
export function parseDateFromString(
  value: string,
  dateSeparators: Array<TDateSeparator> = ['-', '/'],
): Date | undefined {
  const isoRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z$/
  const currentValue = isoRegex.test(value) ? value.split('T')[0] : value;
  return dateSeparators
    .map((separator) => parseDateFromStringWithSeparator(currentValue, separator))
    .filter((date) => date !== undefined)
    .shift();
}

/**
 * Converts a string with a custom separator to a date.
 * @param value
 * @param separator
 */
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

/**
 * Ensures that the year provided is within the limits 1000 and 9999
 * @param value
 */
export function parseYear(value?: string | number): number | undefined {
  if (!value && value !== 0) {
    return;
  }

  const valueNumber = Number(value);

  if (isNaN(valueNumber)) {
    return;
  }

  return yearValidator({ value: valueNumber, min: 1000 }).valid
    ? valueNumber
    : undefined;
}

/**
 * Ensures that the given month is within the limits 0 and 12.
 * @param value
 */
export function parseMonth(value?: string | number): number | undefined {
  if (!value && value !== 0) {
    return;
  }
  const valueNumber = Number(value);

  if (isNaN(valueNumber)) {
    return;
  }

  if (!monthValidator({ value: valueNumber }).valid) {
    return;
  }
  return valueNumber === 0 ? valueNumber : valueNumber - 1;
}

/**
 * Ensures that the given day is within the limits 1 and 31.
 * @param value
 */
export function parseDay(value?: string | number): number | undefined {
  if (!value) {
    return;
  }

  const valueNumber = Number(value);

  if (isNaN(valueNumber)) {
    return;
  }

  return dayValidator({ value: valueNumber }).valid ? valueNumber : undefined;
}