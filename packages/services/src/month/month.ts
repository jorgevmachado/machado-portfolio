import type { TMonth } from './interface';
import { EMonth } from './enum';

export const MONTHS: Array<TMonth> = [
  'january',
  'february',
  'march',
  'april',
  'may',
  'june',
  'july',
  'august',
  'september',
  'october',
  'november',
  'december',
];

/**
 * Responsible for returning the current month.
 */
export function getCurrentMonth(): EMonth {
  const month = new Date().getMonth();
  return MONTHS[month].toUpperCase() as EMonth;
}

/**
 * Responsible for transforming the month enum into a month index.
 * @param month
 */
export function getMonthIndex(month: EMonth) {
  return MONTHS.indexOf(month.toLowerCase() as TMonth);
}

/**
 * Responsible for transforming an index into a month enum.
 * @param index
 */
export function getMonthByIndex(index: number) {
  return MONTHS[index];
}

/**
 * Check if it is a valid month.
 * @param month
 */
export function validateMonth(month?: string) {
    if (!MONTHS.includes(month?.toLowerCase() as TMonth)) {
        throw new Error(`The month provided is invalid: ${month}`);
    }
}