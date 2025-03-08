import { EGender, ERole, EStatus } from '../../../shared';
import { INestBaseEntity } from '../interface';

export interface IUser extends INestBaseEntity {
  cpf: string;
  role: ERole;
  salt?: string;
  name: string;
  email: string;
  gender: EGender;
  status: EStatus;
  picture?: string;
  whatsapp: string;
  password?: string;
  date_of_birth: Date;
  recover_token?: string;
  confirmation_token?: string;
}

export interface ISignUpParams
  extends Omit<
    IUser,
    | 'id'
    | 'role'
    | 'status'
    | 'password'
    | 'created_at'
    | 'updated_at'
    | 'deleted_at'
  > {
  password: string;
  password_confirmation: string;
}

export interface ISignInParams extends Pick<IUser, 'email'> {
  password: string;
}

export type IUpdateUserParams = Pick<
  IUser,
  'name' | 'role' | 'gender' | 'status' | 'date_of_birth' | 'password' | 'picture'
>;
