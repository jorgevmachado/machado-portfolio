import { Error, ERROR_STATUS_CODE } from '@repo/services/error/error';
import type { ExpenseCategoryTypeEntity } from './interface';

interface ExpenseCategoryTypeConstructorParams
  extends Pick<ExpenseCategoryTypeEntity, 'name'> {
  id?: ExpenseCategoryTypeEntity['id'];
  created_at?: ExpenseCategoryTypeEntity['created_at'];
  updated_at?: ExpenseCategoryTypeEntity['updated_at'];
  deleted_at?: ExpenseCategoryTypeEntity['deleted_at'];
}

export default class ExpenseCategoryType implements ExpenseCategoryTypeEntity {
  id: ExpenseCategoryTypeEntity['id'];
  name!: ExpenseCategoryTypeEntity['name'];
  created_at: ExpenseCategoryTypeEntity['created_at'];
  updated_at: ExpenseCategoryTypeEntity['updated_at'];
  deleted_at: ExpenseCategoryTypeEntity['deleted_at'];

  constructor(params?: ExpenseCategoryTypeConstructorParams) {
    if (params) {
      this.id = params.id ?? this.id;
      if (!params?.name) {
        throw new Error(
          ERROR_STATUS_CODE.CONFLICT_EXCEPTION,
          'name is required',
        );
      }
      this.name = params.name;
      this.created_at = params?.created_at ?? this.created_at;
      this.updated_at = params?.updated_at ?? this.updated_at;
      this.deleted_at = params?.deleted_at ?? this.deleted_at;
    }
  }
}