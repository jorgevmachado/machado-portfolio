import type { UserConstructorParams, UserEntity } from './interface';
import { ERole, EStatus } from '../shared';
import { cleanFormatter, validateMobile } from './config';

export default class User implements UserEntity {
  id: UserEntity['id'];
  cpf: UserEntity['cpf'];
  role: UserEntity['role'] = ERole.USER;
  salt?: UserEntity['salt'];
  name: UserEntity['name'];
  email: UserEntity['email'];
  gender: UserEntity['gender'];
  status: UserEntity['status'] = EStatus.ACTIVE;
  finance?: UserEntity['finance'];
  picture?: UserEntity['picture'];
  whatsapp: UserEntity['whatsapp'];
  password?: UserEntity['password'];
  created_at: UserEntity['created_at'];
  updated_at: UserEntity['updated_at'];
  deleted_at?: UserEntity['deleted_at'];
  date_of_birth: UserEntity['date_of_birth'];
  recover_token?: UserEntity['recover_token'];
  confirmation_token?: UserEntity['confirmation_token'];

  constructor(params?: UserConstructorParams) {
    if (params) {
      const { clean = false, cleanAllFormatter = true } = params;
      this.id = params.id ?? this.id;
      this.cpf = cleanFormatter(params.cpf, cleanAllFormatter);
      this.role = params.role;
      this.name = params.name;
      this.email = params.email;
      this.gender = params.gender;
      this.status = params.status;
      this.finance = params.finance ?? this.finance;
      this.picture = params.picture ?? this.picture;
      this.whatsapp = validateMobile(params.whatsapp, cleanAllFormatter);
      this.created_at = params.created_at ?? this.created_at;
      this.updated_at = params.updated_at ?? this.updated_at;
      this.deleted_at = params.deleted_at ?? this.deleted_at;
      this.date_of_birth = params.date_of_birth;
      if (!clean) {
        this.salt = params.salt ?? this.salt;
        this.password = params.password ?? this.password;
        this.recover_token = params.recover_token ?? this.recover_token;
        this.confirmation_token =
          params.confirmation_token ?? this.confirmation_token;
        return;
      }
    }
  }
}