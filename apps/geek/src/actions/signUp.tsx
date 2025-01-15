'use server';
import { ValidatorMessage } from '@repo/services/validator/interface';
import validator from '@repo/services/validator/validator';

interface SignUpFields {
  cpf?: string;
  name?: string;
  email?: string;
  gender?: string;
  whatsup?: string;
  password?: string;
  dateOfBirth?: string;
  passwordConfirmation?: string;
}

interface SignUpErrors {
  cpf?: ValidatorMessage;
  name?: ValidatorMessage;
  email?: ValidatorMessage;
  gender?: ValidatorMessage;
  whatsup?: ValidatorMessage;
  password?: ValidatorMessage;
  dateOfBirth?: ValidatorMessage;
  passwordConfirmation?: ValidatorMessage;
}

export type SignUpFormState =
  | {
      valid: boolean;
      fields: SignUpFields;
      errors?: SignUpErrors;
      message?: string;
    }
  | undefined;

export async function signUp(prevState: SignUpFormState, formData: FormData) {
  const fields: SignUpFields = {
    cpf: formData.get('cpf')?.toString(),
    name: formData.get('name')?.toString(),
    email: formData.get('email')?.toString(),
    gender: formData.get('gender')?.toString(),
    whatsup: formData.get('whatsup')?.toString(),
    password: formData.get('password')?.toString(),
    dateOfBirth: formData.get('dateOfBirth')?.toString(),
    passwordConfirmation: formData.get('passwordConfirmation')?.toString(),
  };

  const state = validateSignUp(fields);

  if (!state?.valid) {
    prevState = state;
    return prevState;
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));

  prevState = state;
  return prevState;
}

function validateSignUp(fields: SignUpFields): SignUpFormState {
  const errors: SignUpErrors = {
    cpf: validator.cpf(fields.cpf),
    name: validator.name(fields.name),
    email: validator.email(fields.email),
    gender: validator.gender(fields.gender),
    whatsup: validator.mobile(fields.whatsup),
    password: validator.password(fields.password),
    dateOfBirth: validator.dateOfBirth(fields.dateOfBirth),
    passwordConfirmation: validator.password(fields.password),
  };

  const formState: SignUpFormState = {
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
