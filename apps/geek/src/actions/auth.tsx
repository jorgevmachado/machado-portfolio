import { ValidatorMessage } from '@repo/services/validator/interface';
import validator from '@repo/services/validator/validator';

export type FormState =
  | {
      errors?: {
        email?: ValidatorMessage;
        password?: ValidatorMessage;
      };
      message?: string;
    }
  | undefined;

export async function signup(state: FormState, formData: FormData) {
  const email = formData.get('email')?.toString();
  const password = formData.get('password')?.toString();
  const invalidate = validateSignup(email, password);
  if (invalidate) {
    return invalidate;
  }
  return invalidate;
}

function validateSignup(email?: string, password?: string): FormState {
  const validEmail = validator.email(email);
  const validPassword = validator.password(password);
  if (validEmail.valid && validPassword.valid) {
    return;
  }
  return {
    errors: {
      email: validEmail,
      password: validPassword,
    },
    message: validEmail.valid ? validPassword.message : validEmail.message,
  };
}
