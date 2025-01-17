export type TDateSeparator = '-' | '/';

export interface YearMonthDay {
  day?: number;
  year?: number;
  month?: number;
}

export interface ParseDate extends YearMonthDay {
  date?: Date;
}
