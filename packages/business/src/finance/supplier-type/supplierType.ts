import { Error, ERROR_STATUS_CODE } from '@repo/services/error/error';
import type { SupplierTypeEntity } from './interface';

interface SupplierTypeConstructorParams
  extends Pick<SupplierTypeEntity, 'name'> {
  id?: SupplierTypeEntity['id'];
  created_at?: SupplierTypeEntity['created_at'];
  updated_at?: SupplierTypeEntity['updated_at'];
  deleted_at?: SupplierTypeEntity['deleted_at'];
}

export default class SupplierType implements SupplierTypeEntity {
  id: SupplierTypeEntity['id'];
  name!: SupplierTypeEntity['name'];
  created_at: SupplierTypeEntity['created_at'];
  updated_at: SupplierTypeEntity['updated_at'];
  deleted_at: SupplierTypeEntity['deleted_at'];

  constructor(params?: SupplierTypeConstructorParams) {
    if (params) {
      this.id = params?.id ?? this.id;
      if (!params.name) {
        throw new Error(
          ERROR_STATUS_CODE.CONFLICT_EXCEPTION,
          'name is required',
        );
      }
      this.name = params?.name;
      this.created_at = params?.created_at ?? this.created_at;
      this.updated_at = params?.updated_at ?? this.updated_at;
      this.deleted_at = params?.deleted_at ?? this.deleted_at;
    }
  }
}