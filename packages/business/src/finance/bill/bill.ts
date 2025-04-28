import { toSnakeCase, normalize } from '@repo/services/string/string';

import type { BillConstructorParams, BillEntity } from './interface';

export default class Bill implements BillEntity {
  id: BillEntity['id'];
  type: BillEntity['type'];
  year?: BillEntity['year'];
  bank: BillEntity['bank'];
  name: BillEntity['name'];
  total?: BillEntity['total'] = 0;
  finance: BillEntity['finance'];
  category: BillEntity['category'];
  expenses?: BillEntity['expenses'];
  all_paid?: BillEntity['all_paid'] = false;
  name_code: BillEntity['name_code'];
  total_paid?: BillEntity['total_paid'] = 0;
  created_at: BillEntity['created_at'];
  updated_at: BillEntity['updated_at'];
  deleted_at?: BillEntity['deleted_at'];

  constructor(params?: BillConstructorParams) {
    if (params) {
      this.id = params?.id ?? this.id;
      this.type = params?.type;
      this.year = params?.year ?? this.year;
      this.bank = params.bank;
      this.name = params.name;
      this.total = params?.total ?? this.total;
      this.finance = params.finance;
      this.category = params.category;
      this.expenses = params?.expenses ?? this.expenses;
      this.name_code = toSnakeCase(normalize(this.name));
      this.total_paid = params?.total_paid ?? this.total_paid;
      this.created_at = params?.created_at ?? this.created_at;
      this.updated_at = params?.updated_at ?? this.updated_at;
      this.deleted_at = params?.deleted_at ?? this.deleted_at;
    }
  }
}