import {
  AUTH_TOKEN,
  USER_COMPLETE_FIXTURE,
} from '@repo/business/auth/fixture/user';

export function signUp() {
  return {
    message: 'Registration Completed Successfully!',
  };
}

export function signIn() {
  return {
    token: AUTH_TOKEN,
    message: 'Authentication Successfully!',
  };
}

export function getUser() {
  return USER_COMPLETE_FIXTURE;
}

export function getMe() {
  return USER_COMPLETE_FIXTURE;
}
