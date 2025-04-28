import { EGender, ERole, EStatus } from '../../../shared';
import type { INestBaseEntity } from '../interface';
import type { IFinance } from '../finance';

export interface IUser extends INestBaseEntity {
  cpf: string;
  role: ERole;
  salt?: string;
  name: string;
  email: string;
  gender: EGender;
  status: EStatus;
  picture?: string;
  finance?: IFinance;
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

export type IUpdateUserParams = Partial<Pick<
  IUser,
  | 'id'
  | 'role'
  | 'name'
  | 'gender'
  | 'status'
  | 'date_of_birth'
>>;
