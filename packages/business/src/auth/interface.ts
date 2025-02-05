import type {
  ISignInParams,
  ISignUpParams,
  IUpdateUserParams,
  IUser,
} from '../api/nest/auth';

export type User = IUser;

export type SignUpParams = ISignUpParams;

export type SignInParams = ISignInParams;

export type UpdateParams = IUpdateUserParams;
