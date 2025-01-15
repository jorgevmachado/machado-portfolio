export type TCountry = 'br';

class Formatter {
  public sanitize(value: string) {
    const regex = /[\WA-Z]/g;
    return value.replace(regex, '');
  }

  public maskPhone(value?: string): string {
    if (!value) {
      return '';
    }
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '($1) $2')
      .replace(/(\d)(\d{4})$/, '$1-$2')
      .substring(0, 15);
  }

  public maskMobile(value?: string): string {
    if (!value) {
      return '';
    }
    return value
      .replace(/\D/g, '')
      .replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  }

  public maskCurrency(value: number = 0, country: TCountry = 'br'): string {
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

  public removeCurrencyMask(value: string): number {
    return Number(value.replace(/[^0-9,-]+/g, ''));
  }

  public maskCep(value: string): string {
    return value
      .replace(/\D/g, '')
      .replace(/^(\d{5})(\d{3})+$/, '$1-$2')
      .replace(/(-d{3})(\d+?)/, '$1');
  }

  public maskCpf(value?: string): string {
    if (!value) {
      return '';
    }
    return value
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d)/, '$1.$2')
      .replace(/(\d{3})(\d{1,2})$/, '$1-$2');
  }
}

export default new Formatter();
