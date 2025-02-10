import { type IExpense } from '../../api/nest/finance';

interface ExpenseConstructorParams extends Omit<IExpense, 'id' | 'created_at' | 'updated_at' | 'deleted_at'> {
    id?: IExpense['id'];
    created_at?: IExpense['created_at'];
    updated_at?: IExpense['updated_at'];
    deleted_at?: IExpense['deleted_at'];
}

export default class Expense implements IExpense {
  id: IExpense['id'];
  year?: IExpense['year'] = new Date().getFullYear();
  type: IExpense['type'];
  paid: IExpense['paid'];
  value: IExpense['value'];
  total?: IExpense['total'];
  month?: IExpense['month'];
  group: IExpense['group'];
  active?: IExpense['active'];
  supplier: IExpense['supplier'];
  category: IExpense['category'];
  total_paid?: IExpense['total_paid'];
  january?: IExpense['january'];
  february?: IExpense['february'];
  march?: IExpense['march'];
  april?: IExpense['april'];
  may?: IExpense['may'];
  june?: IExpense['june'];
  july?: IExpense['july'];
  august?: IExpense['august'];
  september?: IExpense['september'];
  october?: IExpense['october'];
  november?: IExpense['november'];
  december?: IExpense['december'];
  january_paid?: IExpense['january_paid'];
  february_paid?: IExpense['february_paid'];
  march_paid?: IExpense['march_paid'];
  april_paid?: IExpense['april_paid'];
  may_paid?: IExpense['may_paid'];
  june_paid?: IExpense['june_paid'];
  july_paid?: IExpense['july_paid'];
  august_paid?: IExpense['august_paid'];
  september_paid?: IExpense['september_paid'];
  october_paid?: IExpense['october_paid'];
  november_paid?: IExpense['november_paid'];
  december_paid?: IExpense['december_paid'];
  created_at: IExpense['created_at'];
  updated_at: IExpense['updated_at'];
  deleted_at: IExpense['deleted_at'];
  description?: IExpense['description'];
  instalment_number?: IExpense['instalment_number'];
  constructor(params?: ExpenseConstructorParams) {
      if(params) {
        this.id = params?.id ?? this.id;
        this.year = params?.year ?? this.year;
        this.type = params?.type ?? this.type;
        this.paid = params?.paid ?? this.paid;
        this.value = params?.value ?? this.value;
        this.total = params?.total ?? this.total;
        this.month = params?.month ?? this.month;
        this.group = params?.group ?? this.group;
        this.active = params?.active ?? this.active;
        this.supplier = params?.supplier ?? this.supplier;
        this.category = params?.category ?? this.category;
        this.total_paid = params?.total_paid ?? this.total_paid;
        this.january = params?.january ?? this.january;
        this.february = params?.february ?? this.february;
        this.march = params?.march ?? this.march;
        this.april = params?.april ?? this.april;
        this.may = params?.may ?? this.may;
        this.june = params?.june ?? this.june;
        this.july = params?.july ?? this.july;
        this.august = params?.august ?? this.august;
        this.september = params?.september ?? this.september;
        this.october = params?.october ?? this.october;
        this.november = params?.november ?? this.november;
        this.december = params?.december ?? this.december;
        this.january_paid = params?.january_paid ?? this.january_paid;
        this.february_paid = params?.february_paid ?? this.february_paid;
        this.march_paid = params?.march_paid ?? this.march_paid;
        this.april_paid = params?.april_paid ?? this.april_paid;
        this.may_paid = params?.may_paid ?? this.may_paid;
        this.june_paid = params?.june_paid ?? this.june_paid;
        this.july_paid = params?.july_paid ?? this.july_paid;
        this.august_paid = params?.august_paid ?? this.august_paid;
        this.september_paid = params?.september_paid ?? this.september_paid;
        this.october_paid = params?.october_paid ?? this.october_paid;
        this.november_paid = params?.november_paid ?? this.november_paid;
        this.december_paid = params?.december_paid ?? this.december_paid;
        this.created_at = params?.created_at ?? this.created_at;
        this.updated_at = params?.updated_at ?? this.updated_at;
        this.deleted_at = params?.deleted_at ?? this.deleted_at;
        this.description = params?.description ?? this.description;
        this.instalment_number = params?.instalment_number ?? this.instalment_number;
      }
  }
}