import { ValidatorMessage } from '@repo/services/validator/interface';
import validator from '@repo/services/validator/validator';

interface ForgotPasswordFields {
  email?: string;
}

interface ForgotPasswordErrors {
  email?: ValidatorMessage;
}

export type ForgotPasswordFormState =
  | {
      valid: boolean;
      fields: ForgotPasswordFields;
      errors?: ForgotPasswordErrors;
      message?: string;
    }
  | undefined;

export async function forgotPassword(
  prevState: ForgotPasswordFormState,
  formData: FormData,
) {
  const fields: ForgotPasswordFields = {
    email: formData.get('email')?.toString(),
  };

  const state = validate(fields);

  if (!state?.valid) {
    prevState = state;
    return prevState;
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));

  prevState = state;
  return prevState;
}

function validate(fields: ForgotPasswordFields): ForgotPasswordFormState {
  const errors: ForgotPasswordErrors = {
    email: validator.email(fields.email),
  };

  const formState: ForgotPasswordFormState = {
    valid: false,
    fields,
    errors,
    message: 'please try again later',
  };

  if (!errors?.email?.valid) {
    formState.message = errors?.email?.message;
    return formState;
  }

  formState.valid = true;
  formState.errors = undefined;
  formState.message = 'Email sent successfully!';

  return formState;
}
