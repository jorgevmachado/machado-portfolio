import { toSnakeCase, normalize } from '@repo/services/string/string';

import type { BankEntity } from './interface';

interface BankConstructorParams extends Pick<BankEntity, 'name'> {
  id?: BankEntity['id'];
  created_at?: BankEntity['created_at'];
  updated_at?: BankEntity['updated_at'];
  deleted_at?: BankEntity['deleted_at'];
}

export default class Bank implements BankEntity {
  id: BankEntity['id'];
  name!: BankEntity['name'];
  name_code!: BankEntity['name_code'];
  created_at: BankEntity['created_at'];
  updated_at: BankEntity['updated_at'];
  deleted_at?: BankEntity['deleted_at'];

  constructor(params?: BankConstructorParams) {
    if (params) {
      this.id = params?.id ?? this.id;
      this.name = params?.name;
      this.name_code = toSnakeCase(normalize(this.name));
      this.created_at = params?.created_at ?? this.created_at;
      this.updated_at = params?.updated_at ?? this.updated_at;
      this.deleted_at = params?.deleted_at ?? this.deleted_at;
    }
  }
}