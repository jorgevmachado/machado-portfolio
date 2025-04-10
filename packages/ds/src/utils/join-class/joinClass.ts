export default function joinClass(classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
