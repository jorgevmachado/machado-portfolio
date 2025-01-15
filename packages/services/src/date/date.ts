export function isUnderMinYearsOld(date: Date, min: number = 18): boolean {
  const ageInDays =
    (new Date().getTime() - date.getTime()) / (1000 * 60 * 60 * 24);
  return ageInDays < min * 365.25;
}
