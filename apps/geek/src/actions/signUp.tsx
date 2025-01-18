'use server';
import {
  confirmPasswordValidator,
  passwordValidator,
} from '@repo/services/validator/password/password';
import {
  dateOfBirthValidator,
  genderValidator,
  nameValidator,
} from '@repo/services/validator/personal/personal';

import {
  emailValidator,
  mobileValidator,
} from '@repo/services/validator/contact/contact';
import { cpfValidator } from '@repo/services/validator/document/document';

import { AuthErrors, AuthFields, AuthFormState } from './interface';

export async function signUp(prevState: AuthFormState, formData: FormData) {
  const fields: AuthFields = {
    cpf: formData.get('cpf')?.toString(),
    name: formData.get('name')?.toString(),
    email: formData.get('email')?.toString(),
    gender: formData.get('gender')?.toString(),
    whatsup: formData.get('whatsup')?.toString(),
    password: formData.get('password')?.toString(),
    dateOfBirth: formData.get('dateOfBirth')?.toString(),
    passwordConfirmation: formData.get('passwordConfirmation')?.toString(),
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
    cpf: cpfValidator(fields.cpf),
    name: nameValidator(fields.name),
    email: emailValidator(fields.email),
    gender: genderValidator(fields.gender),
    whatsup: mobileValidator(fields.whatsup),
    password: passwordValidator(fields.password),
    dateOfBirth: dateOfBirthValidator(fields.dateOfBirth),
    passwordConfirmation: confirmPasswordValidator(
      fields.passwordConfirmation,
      fields.password,
    ),
  };

  const formState: AuthFormState = {
    valid: false,
    fields,
    errors,
    message: 'Unable to register, please try again later',
  };

  if (!errors?.cpf?.valid) {
    formState.message = errors?.cpf?.message;
    return formState;
  }

  if (!errors?.name?.valid) {
    formState.message = errors?.name?.message;
    return formState;
  }

  if (!errors?.email?.valid) {
    formState.message = errors?.email?.message;
    return formState;
  }

  if (!errors?.gender?.valid) {
    formState.message = errors?.gender?.message;
    return formState;
  }

  if (!errors?.whatsup?.valid) {
    formState.message = errors?.whatsup?.message;
    return formState;
  }

  if (!errors?.password?.valid) {
    formState.message = errors?.password?.message;
    return formState;
  }

  if (!errors?.dateOfBirth?.valid) {
    formState.message = errors?.dateOfBirth?.message;
    return formState;
  }

  if (!errors?.passwordConfirmation?.valid) {
    formState.message = errors?.passwordConfirmation?.message;
    return formState;
  }

  formState.valid = true;
  formState.errors = undefined;
  formState.message = 'Sign up successfully!';

  return formState;
}
