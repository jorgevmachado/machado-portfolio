export type FormState =
  | {
      error: string;
      message: string;
      statusCode: number;
    }
  | undefined;

export async function signup(state: FormState, formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');
  console.log('signUp => state => ', state);
  console.log('signUp => formData => email => ', email);
  console.log('signUp => formData => password => ', password);

  return {
    error: 'error',
    message: 'message error',
    statusCode: 403,
  };
}
