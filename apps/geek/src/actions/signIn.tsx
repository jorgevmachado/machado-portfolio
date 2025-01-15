'use server';
import { ValidatorMessage } from '@repo/services/validator/interface';
import validator from '@repo/services/validator/validator';

export type SignInFormState =
  | {
      valid: boolean;
      fields: {
        email?: string;
        password?: string;
      };
      errors?: {
        email?: ValidatorMessage;
        password?: ValidatorMessage;
      };
      message?: string;
    }
  | undefined;

export async function signIn(prevState: SignInFormState, formData: FormData) {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  const invalidate = validateSignIn(email, password);

  if (invalidate) {
    prevState = invalidate;
    return prevState;
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));
  prevState = {
    valid: true,
    fields: {
      email,
      password,
    },
    errors: undefined,
    message: 'Sign up successfully!',
  };
  return prevState;
}

function validateSignIn(email?: string, password?: string): SignInFormState {
  const validEmail = validator.email(email);
  const validPassword = validator.password(password);
  if (validEmail.valid && validPassword.valid) {
    return;
  }
  return {
    valid: false,
    fields: {
      email,
      password,
    },
    errors: {
      email: validEmail,
      password: validPassword,
    },
    message: validEmail.valid ? validPassword.message : validEmail.message,
  };
}
