import { ParseDate } from '@repo/services/date';
import type { ValidatorMessage } from '@repo/services/validator/interface';

export type TLocale = 'es' | 'fr' | 'enUS' | 'ptBR';

export interface InitialDate {
  day?: number;
  year?: number;
  date?: Date;
  month?: number;
}

export interface DatePickerProps {
  id: string;
  tip?: string;
  name?: string;
  label?: string;
  value?: string;
  minAge?: number;
  isOpen?: boolean;
  locale?: TLocale;
  maxDate?: Date;
  minDate?: Date;
  validate: (value?: string | Date) => ValidatorMessage;
  showTime?: boolean;
  dateFormat?: string;
  initialDate?: ParseDate;
  placeholder?: string;
}
