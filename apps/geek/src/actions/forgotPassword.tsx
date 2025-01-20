import { emailValidator } from '@repo/services/validator/contact/contact';

import type { AuthErrors, AuthFields, AuthFormState } from './interface';

export async function forgotPassword(
  prevState: AuthFormState,
  formData: FormData,
) {
  const fields: AuthFields = {
    email: formData.get('email')?.toString(),
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
    email: emailValidator({ value: fields.email }),
  };

  const formState: AuthFormState = {
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
