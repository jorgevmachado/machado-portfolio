export function cepFormatter(value?: string): string {
  if (!value) {
    return '';
  }
  return value
    .replace(/\D/g, '')
    .replace(/^(\d{5})(\d{3})+$/, '$1-$2')
    .replace(/(-d{3})(\d+?)/, '$1');
}
