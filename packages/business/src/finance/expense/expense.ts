import { type IExpense } from '../../api/nest/finance';

interface ExpenseConstructorParams extends Omit<IExpense, 'id' | 'created_at' | 'updated_at' | 'deleted_at'> {
    id?: IExpense['id'];
    created_at?: IExpense['created_at'];
    updated_at?: IExpense['updated_at'];
    deleted_at?: IExpense['deleted_at'];
}

export default class Expense implements IExpense {
  id: IExpense['id'];
  name: IExpense['name'];
  type: IExpense['type'];
  year: IExpense['year'];
  total: IExpense['total'];
  month: IExpense['month'];
  active?: IExpense['active'];
  status: IExpense['status'];
  frequency?: IExpense['frequency'];
  supplier: IExpense['supplier'];
  created_at: IExpense['created_at'];
  updated_at: IExpense['updated_at'];
  deleted_at: IExpense['deleted_at'];
  description?: IExpense['description'];
  payment_method: IExpense['payment_method'];

  constructor(params?: ExpenseConstructorParams) {
      if(params) {
        this.id = params?.id ?? this.id;
        this.name = params?.name ?? this.name;
        this.type = params?.type ?? this.type;
        this.year = params?.year ?? this.year;
        this.total = params?.total ?? this.total;
        this.month = params?.month ?? this.month;
        this.active = params?.active ?? this.active;
        this.status = params?.status ?? this.status;
        this.frequency = params?.frequency ?? this.frequency;
        this.supplier = params?.supplier ?? this.supplier;
        this.created_at = params?.created_at ?? this.created_at;
        this.updated_at = params?.updated_at ?? this.updated_at;
        this.deleted_at = params?.deleted_at ?? this.deleted_at;
        this.description = params?.description ?? this.description;
        this.payment_method = params?.payment_method ?? this.payment_method;
      }
  }
}