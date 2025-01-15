export type TLocale = 'es' | 'fr' | 'enUS' | 'ptBR';
export interface DatePickerProps {
  id?: string;
  tip?: string;
  open?: boolean;
  name?: string;
  label?: string;
  value?: string;
  locale?: TLocale;
  onChange?: (value?: string) => void;
  showTime?: boolean;
  isInvalid?: boolean;
  dateFormat?: string;
  invalidMessage?: string;
}
