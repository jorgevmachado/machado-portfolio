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

import { EGender } from '@repo/business/shared/enum';

import { authService } from '../shared';

import type { AuthErrors, AuthFields, AuthFormState } from './interface';

export async function signUp(prevState: AuthFormState, formData: FormData) {
  const fields: AuthFields = {
    cpf: formData.get('cpf')?.toString(),
    name: formData.get('name')?.toString(),
    email: formData.get('email')?.toString(),
    gender: formData.get('gender')?.toString(),
    whatsapp: formData.get('whatsapp')?.toString(),
    password: formData.get('password')?.toString(),
    dateOfBirth: formData.get('dateOfBirth')?.toString(),
    passwordConfirmation: formData.get('passwordConfirmation')?.toString(),
  };

  console.log('fields => ', fields);

  prevState = validate(fields);

  if (!prevState?.valid) {
    return prevState;
  }

  return await authService
    .signUp({
      cpf: prevState?.fields?.cpf ?? '',
      name: prevState?.fields?.name ?? '',
      email: prevState?.fields?.email ?? '',
      gender: (prevState?.fields?.gender ?? EGender.OTHER) as EGender,
      whatsapp: prevState?.fields?.whatsapp ?? '',
      password: prevState?.fields?.password ?? '',
      date_of_birth: new Date(prevState?.fields?.dateOfBirth ?? ''),
      created_at: new Date(),
      updated_at: new Date(),
      password_confirmation: prevState?.fields?.passwordConfirmation ?? '',
    })
    .then((response) => {
      prevState.valid = true;
      prevState.errors = undefined;
      prevState.message = response;
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
    cpf: cpfValidator({ value: fields.cpf }),
    name: nameValidator({ value: fields.name }),
    email: emailValidator({ value: fields.email }),
    gender: genderValidator({ value: fields.gender }),
    whatsapp: mobileValidator({ value: fields.whatsapp }),
    password: passwordValidator({ value: fields.password }),
    dateOfBirth: dateOfBirthValidator({ value: fields.dateOfBirth }),
    passwordConfirmation: confirmPasswordValidator({
      value: fields.passwordConfirmation,
      optionalValue: fields.password,
    }),
  };

  const formState: AuthFormState = {
    valid: true,
    fields,
    errors,
  };

  const messages: Array<string> = [];

  if (!errors?.cpf?.valid) {
    formState.valid = false;
    messages.push(`CPF: ${errors?.cpf?.message ?? 'invalid'}`);
  }

  if (!errors?.name?.valid) {
    formState.valid = false;
    messages.push(`Name: ${errors?.name?.message ?? 'invalid'}`);
  }

  if (!errors?.email?.valid) {
    formState.valid = false;
    messages.push(`Email: ${errors?.email?.message ?? 'invalid'}`);
  }

  if (!errors?.gender?.valid) {
    formState.valid = false;
    messages.push(`Gender: ${errors?.gender?.message ?? 'invalid'}`);
  }

  if (!errors?.whatsapp?.valid) {
    formState.valid = false;
    messages.push(`Whatsapp: ${errors?.whatsapp?.message ?? 'invalid'}`);
  }

  if (!errors?.password?.valid) {
    formState.valid = false;
    messages.push(`password: ${errors?.password?.message ?? 'invalid'}`);
  }

  if (!errors?.dateOfBirth?.valid) {
    formState.valid = false;
    messages.push(
      `Date Of Birth: ${errors?.dateOfBirth?.message ?? 'invalid'}`,
    );
  }

  if (!errors?.passwordConfirmation?.valid) {
    formState.valid = false;
    messages.push(
      `Confirm Password: ${errors?.passwordConfirmation?.message ?? 'invalid'}`,
    );
  }
  if (formState.valid) {
    formState.errors = undefined;
    formState.message = 'Sign up successfully!';
  }

  formState.message = messages.map((message) => `   ${message}`).join('\n');

  return formState;
}
