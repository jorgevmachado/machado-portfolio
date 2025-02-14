import type { ExpenseGroupEntity } from './interface';

interface ExpenseGroupConstructorParams
  extends Pick<ExpenseGroupEntity, 'name'> {
  id?: ExpenseGroupEntity['id'];
  created_at?: ExpenseGroupEntity['created_at'];
  updated_at?: ExpenseGroupEntity['updated_at'];
  deleted_at?: ExpenseGroupEntity['deleted_at'];
}

export default class ExpenseGroup implements ExpenseGroupEntity {
  id: ExpenseGroupEntity['id'];
  name!: ExpenseGroupEntity['name'];
  created_at: ExpenseGroupEntity['created_at'];
  updated_at: ExpenseGroupEntity['updated_at'];
  deleted_at: ExpenseGroupEntity['deleted_at'];

  constructor(params?: ExpenseGroupConstructorParams) {
    if (params) {
      this.id = params?.id ?? this.id;
      if (!params.name) {
        throw new Error('name is required');
      }
      this.name = params.name;
      this.created_at = params?.created_at ?? this.created_at;
      this.updated_at = params?.updated_at ?? this.updated_at;
      this.deleted_at = params?.deleted_at ?? this.deleted_at;
    }
  }
}