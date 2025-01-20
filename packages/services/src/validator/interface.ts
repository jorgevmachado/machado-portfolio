export interface ValidatorMessage {
  valid: boolean;
  message: string;
}

export interface ValidatorParams {
  min?: number;
  max?: number;
  value?: string | Date;
  optionalValue?: string | Date;
}
