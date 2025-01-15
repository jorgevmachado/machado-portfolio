'use server';
import { ValidatorMessage } from '@repo/services/validator/interface';
import validator from '@repo/services/validator/validator';

interface SignInFields {
  email?: string;
  password?: string;
}

interface SignInErrors {
  email?: ValidatorMessage;
  password?: ValidatorMessage;
}

export type SignInFormState =
  | {
      valid: boolean;
      fields: SignInFields;
      errors?: SignInErrors;
      message?: string;
    }
  | undefined;

export async function signIn(prevState: SignInFormState, formData: FormData) {
  const fields: SignInFields = {
    email: formData.get('email')?.toString(),
    password: formData.get('password')?.toString(),
  };

  const state = validateSignIn(fields);

  if (!state?.valid) {
    prevState = state;
    return prevState;
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));

  prevState = state;
  return prevState;
}

function validateSignIn(fields: SignInFields): SignInFormState {
  const errors: SignInErrors = {
    email: validator.email(fields.email),
    password: validator.password(fields.password),
  };

  const formState: SignInFormState = {
    valid: false,
    fields,
    errors,
    message: 'Unable to register, please try again later',
  };

  if (!errors?.email?.valid) {
    formState.message = errors?.email?.message;
    return formState;
  }

  if (!errors?.password?.valid) {
    formState.message = errors?.password?.message;
    return formState;
  }

  formState.valid = true;
  formState.errors = undefined;
  formState.message = 'Sign in successfully!';

  return formState;
}
