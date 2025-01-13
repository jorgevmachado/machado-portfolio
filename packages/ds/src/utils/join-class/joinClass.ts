export default function joinClass(
  args: Array<string | null | undefined | boolean>,
) {
  return args.filter((arg) => !!arg).join(' ');
}
