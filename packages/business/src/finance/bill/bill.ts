import type { BillConstructorParams, BillEntity } from './interface';

export default class Bill implements BillEntity {
  id: BillEntity['id'];
  user: BillEntity['user'];
  type: BillEntity['type'];
  year?: BillEntity['year'];
  bank: BillEntity['bank'];
  name: BillEntity['name'];
  total: BillEntity['total'];
  expenses: BillEntity['expenses'];
  all_paid?: BillEntity['all_paid'];
  total_paid?: BillEntity['total_paid'];
  created_at: BillEntity['created_at'];
  updated_at: BillEntity['updated_at'];
  deleted_at: BillEntity['deleted_at'];

  constructor(params?: BillConstructorParams) {
    if (params) {
      this.id = params?.id ?? this.id;
      this.user = params?.user ?? this.user;
      this.type = params?.type ?? this.type;
      this.year = params?.year ?? this.year;
      this.bank = params?.bank ?? this.bank;
      this.name = params?.name ?? this.name;
      this.total = params?.total ?? this.total;
      this.total_paid = params?.total_paid ?? this.total_paid;
      this.expenses = params?.expenses ?? this.expenses;
      this.created_at = params?.created_at ?? this.created_at;
      this.updated_at = params?.updated_at ?? this.updated_at;
      this.deleted_at = params?.deleted_at ?? this.deleted_at;
    }
  }
}