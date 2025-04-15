export interface ValidatorMessage {
  value?: string | Date | number | boolean;
  valid: boolean;
  accept?: string;
  message: string;
}

export interface ValidatorParams {
  min?: number;
  max?: number;
  value?: string | Date | number | boolean;
  accept?: string;
  optionalValue?: string | Date;
}
