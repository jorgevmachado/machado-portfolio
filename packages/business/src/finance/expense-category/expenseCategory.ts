import { Error, ERROR_STATUS_CODE } from '@repo/services/error/error';
import type { ExpenseCategoryEntity } from './interface';

interface ExpenseCategoryConstructorParams
  extends Pick<ExpenseCategoryEntity, 'name' | 'type'> {
  id?: ExpenseCategoryEntity['id'];
  created_at?: ExpenseCategoryEntity['created_at'];
  updated_at?: ExpenseCategoryEntity['updated_at'];
  deleted_at?: ExpenseCategoryEntity['deleted_at'];
}

export default class ExpenseCategory implements ExpenseCategoryEntity {
  id: ExpenseCategoryEntity['id'];
  name!: ExpenseCategoryEntity['name'];
  type!: ExpenseCategoryEntity['type'];
  created_at: ExpenseCategoryEntity['created_at'];
  updated_at: ExpenseCategoryEntity['updated_at'];
  deleted_at: ExpenseCategoryEntity['deleted_at'];

  constructor(params?: ExpenseCategoryConstructorParams) {
    if (params) {
      this.id = params?.id ?? this.id;
      if (!params.name) {
        throw new Error(
          ERROR_STATUS_CODE.CONFLICT_EXCEPTION,
          'name is required',
        );
      }
      this.name = params?.name;
      if (!params.type) {
        throw new Error(
          ERROR_STATUS_CODE.CONFLICT_EXCEPTION,
          'type is required',
        );
      }
      this.type = params?.type;
      this.created_at = params?.created_at ?? this.created_at;
      this.updated_at = params?.updated_at ?? this.updated_at;
      this.deleted_at = params?.deleted_at ?? this.deleted_at;
    }
  }
}