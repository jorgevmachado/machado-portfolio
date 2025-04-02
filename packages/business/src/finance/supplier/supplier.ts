import { toSnakeCase, normalize } from '@repo/services/string/string';

import { Error, ERROR_STATUS_CODE } from '@repo/services/error/error';

import type { SupplierEntity } from './interface';

interface SupplierConstructorParams
  extends Omit<
    SupplierEntity,
    'id' | 'name_code' | 'created_at' | 'updated_at' | 'deleted_at'
  > {
  id?: SupplierEntity['id'];
  created_at?: SupplierEntity['created_at'];
  updated_at?: SupplierEntity['updated_at'];
  deleted_at?: SupplierEntity['deleted_at'];
}

export default class Supplier implements SupplierEntity {
  id: SupplierEntity['id'];
  name!: SupplierEntity['name'];
  type!: SupplierEntity['type'];
  name_code!: SupplierEntity['name_code'];
  created_at: SupplierEntity['created_at'];
  updated_at: SupplierEntity['updated_at'];
  deleted_at: SupplierEntity['deleted_at'];
  description?: SupplierEntity['description'];

  constructor(params?: SupplierConstructorParams) {
    if (params) {
      this.id = params?.id ?? this.id;
      if (!params.name) {
        throw new Error({
          message: 'name is required',
          statusCode: ERROR_STATUS_CODE.CONFLICT_EXCEPTION,
        });
      }
      this.name = params.name;
      if (!params.type) {
        throw new Error({
          message: 'type is required',
          statusCode: ERROR_STATUS_CODE.CONFLICT_EXCEPTION,
        });
      }
      this.type = params.type;
      this.name_code = toSnakeCase(normalize(this.name));
      this.created_at = params?.created_at ?? this.created_at;
      this.updated_at = params?.updated_at ?? this.updated_at;
      this.deleted_at = params?.deleted_at ?? this.deleted_at;
      this.description = params?.description ?? this.description;
    }
  }
}