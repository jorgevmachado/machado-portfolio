import type { TMonth } from './interface';
import { EMonth } from './enum';

export const months: Array<TMonth> = [
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

export function getCurrentMonth(): EMonth {
  const month = new Date().getMonth();
  return months[month].toUpperCase() as EMonth;
}

export function getMonthIndex(month: EMonth) {
  return months.indexOf(month.toLowerCase() as TMonth);
}

export function getMonthByIndex(index: number) {
  return months[index];
}

export function validateMonth(month: string) {
    if (!months.includes(month.toLowerCase() as TMonth)) {
        throw new Error(`The month provided is invalid: ${month}`);
    }
}