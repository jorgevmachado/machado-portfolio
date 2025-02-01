import { EGender, ERole, EStatus } from '../../shared';

export interface INestConfig {
  baseUrl: string;
  token?: string;
}

export interface IUser {
  id: string;
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
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
  date_of_birth: Date;
  recover_token?: string;
  confirmation_token?: string;
}

export interface ISignUpParams extends Omit<IUser, 'id' | 'role' | 'status'> {
  password: string;
  password_confirmation: string;
}

export interface ISignInParams extends Pick<IUser, 'email'> {
  password: string;
}

export type IUpdateUserParams = Omit<
  IUser,
  'id' | 'status' | 'createdAt' | 'updatedAt' | 'deletedAt'
>;
