export function sanitize(value: string) {
  const regex = /[\WA-Z]/g;
  return value.replace(regex, '');
}

export function cleanFormatter(value?: string) {
  if(!value) {
    return '';
  }
  return value.replace(/\W/g, '');
}