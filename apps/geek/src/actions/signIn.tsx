'use server';

import { emailValidator } from '@repo/services/validator/contact/contact';

import { passwordValidator } from '@repo/services/validator/password/password';

import { AuthErrors, AuthFields, AuthFormState } from './interface';

export async function signIn(prevState: AuthFormState, formData: FormData) {
  const fields: AuthFields = {
    email: formData.get('email')?.toString(),
    password: formData.get('password')?.toString(),
  };

  prevState = validate(fields);

  if (!prevState?.valid) {
    return prevState;
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return prevState;
}

function validate(fields: AuthFields): AuthFormState {
  const errors: AuthErrors = {
    email: emailValidator(fields.email),
    password: passwordValidator(fields.password),
  };

  const formState: AuthFormState = {
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
