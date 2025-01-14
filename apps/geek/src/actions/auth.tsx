export type FormState =
  | {
      error: string;
      message: string;
      statusCode: number;
    }
  | undefined;

export async function signup(state: FormState, formData: FormData) {
  console.log('signUp => state => ', state);
  console.log('signUp => formData => ', formData);

  return {
    error: 'error',
    message: 'message error',
    statusCode: 403,
  };
}
