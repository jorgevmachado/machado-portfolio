import { TCountry } from '../interface';

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
    maximumSignificantDigits: 7,
  })
    .format(value)
    .replace(/\s/, ' ');
}

export function removeCurrencyFormatter(value: string): number {
  return Number(value.replace(/[^0-9,-]+/g, ''));
}
