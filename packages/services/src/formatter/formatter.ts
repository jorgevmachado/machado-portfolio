/**
 * Responsible for performing text sanitization
 * @param value
 */
export function sanitize(value: string) {
  const regex = /[\WA-Z]/g;
  return value.replace(regex, '');
}

/**
 * Responsible for cleaning the text formatting.
 * @param value
 */
export function cleanFormatter(value?: string) {
  if(!value) {
    return '';
  }
  return value.replace(/\W/g, '');
}