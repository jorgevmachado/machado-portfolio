import { type IExpenseGroup } from '../../../api/nest/finance';

interface ExpenseGroupConstructorParams extends Pick<IExpenseGroup, 'name'> {
  id?: IExpenseGroup['id'];
  created_at?: IExpenseGroup['created_at'];
  updated_at?: IExpenseGroup['updated_at'];
  deleted_at?: IExpenseGroup['deleted_at'];
}

export default class ExpenseGroup implements IExpenseGroup {
  id: IExpenseGroup['id'];
  name: IExpenseGroup['name'];
  created_at: IExpenseGroup['created_at'];
  updated_at: IExpenseGroup['updated_at'];
  deleted_at: IExpenseGroup['deleted_at'];

  constructor(params?: ExpenseGroupConstructorParams) {
    if (params) {
      this.id = params?.id ?? this.id;
      this.name = params?.name ?? this.name;
      this.created_at = params?.created_at ?? this.created_at;
      this.updated_at = params?.updated_at ?? this.updated_at;
      this.deleted_at = params?.deleted_at ?? this.deleted_at;
    }
  }
}