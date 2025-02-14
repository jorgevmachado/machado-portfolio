import { EMonth } from '../../api/nest/finance';

export const MONTH_KEYS: Array<string> = [
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
  return MONTH_KEYS[month].toUpperCase() as EMonth;
}

export function getMonthIndex(month: EMonth) {
    return MONTH_KEYS.indexOf(month.toLowerCase());
}

export function getMonthByIndex(index: number) {
  return MONTH_KEYS[index];
}


export function validateMonth(month: EMonth) {
  if (!MONTH_KEYS.includes(month.toLowerCase())) {
    throw new Error(`The month provided is invalid: ${month}`);
  }
}