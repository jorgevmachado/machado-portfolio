import { Error, ERROR_STATUS_CODE } from '@repo/services/error/error';
import type { SupplierEntity } from './interface';

interface SupplierConstructorParams
  extends Omit<
    SupplierEntity,
    'id' | 'created_at' | 'updated_at' | 'deleted_at'
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
  active?: SupplierEntity['active'];
  created_at: SupplierEntity['created_at'];
  updated_at: SupplierEntity['updated_at'];
  deleted_at: SupplierEntity['deleted_at'];
  description?: SupplierEntity['description'];

  constructor(params?: SupplierConstructorParams) {
    if (params) {
      this.id = params?.id ?? this.id;
      if (!params.name) {
        throw new Error(ERROR_STATUS_CODE.CONFLICT_EXCEPTION,'name is required');
      }
      this.name = params.name;
      if (!params.type) {
        throw new Error(ERROR_STATUS_CODE.CONFLICT_EXCEPTION,'type is required');
      }
      this.type = params.type;
      this.active = params?.active ?? this.active;
      this.created_at = params?.created_at ?? this.created_at;
      this.updated_at = params?.updated_at ?? this.updated_at;
      this.deleted_at = params?.deleted_at ?? this.deleted_at;
      this.description = params?.description ?? this.description;
    }
  }
}