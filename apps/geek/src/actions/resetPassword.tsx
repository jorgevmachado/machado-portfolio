import {
  confirmPasswordValidator,
  passwordValidator,
} from '@repo/services/validator/password/password';

import type { AuthErrors, AuthFields, AuthFormState } from './interface';

export async function resetPassword(
  prevState: AuthFormState,
  formData: FormData,
) {
  const fields: AuthFields = {
    token: prevState?.fields?.token ?? '',
    password: formData.get('password')?.toString(),
    passwordConfirmation: formData.get('passwordConfirmation')?.toString(),
  };

  if (!prevState?.fields?.token) {
    return {
      valid: false,
      fields,
      message: 'Invalid token, Please try again later',
    };
  }

  prevState = validate(fields);

  if (!prevState?.valid) {
    return prevState;
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));

  return prevState;
}

function validate(fields: AuthFields): AuthFormState {
  const errors: AuthErrors = {
    password: passwordValidator({ value: fields.password }),
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

  if (!errors?.password?.valid) {
    formState.valid = false;
    messages.push(`password: ${errors?.password?.message ?? 'invalid'}`);
  }

  if (!errors?.passwordConfirmation?.valid) {
    formState.valid = false;
    messages.push(
      `Confirm Password: ${errors?.passwordConfirmation?.message ?? 'invalid'}`,
    );
  }

  if (formState.valid) {
    formState.valid = true;
    formState.errors = undefined;
    formState.message = 'Reset password successfully!';
    return formState;
  }

  formState.message = messages.map((message) => `   ${message}`).join('\n');

  return formState;
}
