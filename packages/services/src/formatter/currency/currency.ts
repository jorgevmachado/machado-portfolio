import type { TCountry } from '../interface';

/**
 * Responsible for formatting a value to monetary value.
 * @param value
 * @param country
 */
export function currencyFormatter(
  value: number = 0,
  country: TCountry = 'br',
): string {
  const MAP = {
    br: { locale: 'pt-BR', currency: 'BRL' },
  };
  const mapped = MAP[country];

  return new Intl.NumberFormat(mapped.locale, {
    style: 'currency',
    currency: mapped.currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
    maximumSignificantDigits: 7,
  })
    .format(value)
    .replace(/\s/, ' ');
}

/**
 * Responsible for removing formatting from a monetary value.
 * @param value
 */
export function removeCurrencyFormatter(value: string): number {
  return Number(value.replace(/[^0-9,-]+/g, ''));
}
