import type {
  ISignInParams,
  ISignUpParams,
  IUpdateUserParams,
  IUser,
} from '../api/nest/auth';

export type UserEntity = IUser;

export type User = Omit<IUser, 'salt' | 'recover_token' | 'confirmation_token'>;

export type SignUpParams = ISignUpParams;

export type SignInParams = ISignInParams;

export type UpdateParams = IUpdateUserParams;

export interface UserConstructorParams
    extends Omit<UserEntity, 'id' | 'created_at' | 'updated_at' | 'deleted_at'> {
  id?: UserEntity['id'];
  clean?: boolean;
  created_at?: UserEntity['created_at'];
  updated_at?: UserEntity['updated_at'];
  deleted_at?: UserEntity['deleted_at'];
  cleanAllFormatter?: boolean;
}
