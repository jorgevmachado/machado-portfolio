import { type IExpenseCategory } from '../../../api/nest/finance';

interface ExpenseCategoryConstructorParams
  extends Pick<IExpenseCategory, 'name' | 'type'> {
  id?: IExpenseCategory['id'];
  created_at?: IExpenseCategory['created_at'];
  updated_at?: IExpenseCategory['updated_at'];
  deleted_at?: IExpenseCategory['deleted_at'];
}

export default class ExpenseCategory implements IExpenseCategory {
  id: IExpenseCategory['id'];
  name: IExpenseCategory['name'];
  type: IExpenseCategory['type'];
  created_at: IExpenseCategory['created_at'];
  updated_at: IExpenseCategory['updated_at'];
  deleted_at: IExpenseCategory['deleted_at'];

  constructor(params?: ExpenseCategoryConstructorParams) {
    if (params) {
      this.id = params?.id ?? this.id;
      this.name = params?.name ?? this.name;
      this.type = params?.type ?? this.type;
      this.created_at = params?.created_at ?? this.created_at;
      this.updated_at = params?.updated_at ?? this.updated_at;
      this.deleted_at = params?.deleted_at ?? this.deleted_at;
    }
  }
}