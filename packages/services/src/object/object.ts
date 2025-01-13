export function serialize(data: any) {
  if (Object.keys(data).some((key) => key)) {
    return new URLSearchParams(data).toString();
  }
}

export function isObject(value: any) {
  return value instanceof Object;
}
