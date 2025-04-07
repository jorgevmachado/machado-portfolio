export interface ValidatorMessage {
  value?: string | Date | number | boolean;
  valid: boolean;
  message: string;
}

export interface ValidatorParams {
  min?: number;
  max?: number;
  value?: string | Date | number | boolean;
  optionalValue?: string | Date;
}
