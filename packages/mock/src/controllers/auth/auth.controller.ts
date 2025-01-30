import { USER_FIXTURE } from '../../fixtures';

export function signUp() {
  return {
    message: 'Registration Completed Successfully!',
  };
}

export function signIn() {
  return {
    token:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjgxNGIxMDQ0LTdjOWItNDM4Ny04MGIyLTZjMmJhNzRmYmYwMCIsImlhdCI6MTczNzI0MTc1OSwiZXhwIjoxNzM3MzI4MTU5fQ.DfQIqD3NQ-IFlDYIsmzZzGOgMwYSSpbWX_UTt-I2X9c',
    message: 'Authentication Successfully!',
  };
}

export function getUser() {
  return USER_FIXTURE;
}
