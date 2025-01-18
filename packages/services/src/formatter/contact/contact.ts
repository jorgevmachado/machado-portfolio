export function phoneFormatter(value?: string): string {
  if (!value) {
    return '';
  }
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d)(\d{4})$/, '$1-$2')
    .substring(0, 15);
}

export function mobileFormatter(value?: string): string {
  if (!value) {
    return '';
  }
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
}
