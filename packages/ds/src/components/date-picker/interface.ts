export type TLocale = 'es' | 'fr' | 'enUS' | 'ptBR';
export interface DatePickerProps {
  id?: string;
  open?: boolean;
  name?: string;
  value?: string;
  locale?: TLocale;
  onChange?: (value?: string) => void;
  showTime?: boolean;
  isInvalid?: boolean;
  dateFormat?: string;
  invalidMessage?: string;
}
