export function sanitize(value: string) {
  const regex = /[\WA-Z]/g;
  return value.replace(regex, '');
}
