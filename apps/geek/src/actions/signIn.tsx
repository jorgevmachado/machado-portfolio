'use server';
import { cookies } from 'next/headers';

import { emailValidator } from '@repo/services/validator/contact/contact';

import { passwordValidator } from '@repo/services/validator/password/password';

import { authService } from '../shared';

import { AuthErrors, AuthFields, AuthFormState } from './interface';

export async function signIn(prevState: AuthFormState, formData: FormData) {
  console.log('formData => ', formData);
  const fields: AuthFields = {
    email: formData.get('email')?.toString(),
    password: formData.get('password')?.toString(),
  };

  console.log('fields => ', fields);

  const cookieStore = await cookies();

  prevState = validate(fields);

  if (!prevState?.valid) {
    return prevState;
  }

  return await authService
    .signIn({
      email: prevState?.fields?.email ?? '',
      password: prevState?.fields?.password ?? '',
    })
    .then((response) => {
      cookieStore.set('geekAccessToken', response);
      return prevState;
    })
    .catch((error) => {
      prevState.valid = false;
      prevState.message = error.message;
      return prevState;
    });
}

function validate(fields: AuthFields): AuthFormState {
  const errors: AuthErrors = {
    email: emailValidator({ value: fields.email }),
    password: passwordValidator({ value: fields.password }),
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
