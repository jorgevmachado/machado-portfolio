import { normalize, toSnakeCase } from '@repo/services/string/string';

import { ExpenseConstructorParams, ExpenseEntity } from './interface';
import {MONTHS} from "@repo/services/month/month";

export default class Expense implements ExpenseEntity {
  id: ExpenseEntity['id'];
  bill: ExpenseEntity['bill'];
  name: ExpenseEntity['name'];
  year?: ExpenseEntity['year'] = new Date().getFullYear();
  type: ExpenseEntity['type'];
  paid: ExpenseEntity['paid'] = false;
  total?: ExpenseEntity['total'] = 0;
  supplier: ExpenseEntity['supplier'];
  name_code: ExpenseEntity['name_code'];
  total_paid?: ExpenseEntity['total_paid'] = 0;
  january?: ExpenseEntity['january'] = 0;
  february?: ExpenseEntity['february'] = 0;
  march?: ExpenseEntity['march'] = 0;
  april?: ExpenseEntity['april'] = 0;
  may?: ExpenseEntity['may'] = 0;
  june?: ExpenseEntity['june'] = 0;
  july?: ExpenseEntity['july'] = 0;
  august?: ExpenseEntity['august'] = 0;
  september?: ExpenseEntity['september'] = 0;
  october?: ExpenseEntity['october'] = 0;
  november?: ExpenseEntity['november'] = 0;
  december?: ExpenseEntity['december'] = 0;
  january_paid?: ExpenseEntity['january_paid'] = false;
  february_paid?: ExpenseEntity['february_paid'] = false;
  march_paid?: ExpenseEntity['march_paid'] = false;
  april_paid?: ExpenseEntity['april_paid'] = false;
  may_paid?: ExpenseEntity['may_paid'] = false;
  june_paid?: ExpenseEntity['june_paid'] = false;
  july_paid?: ExpenseEntity['july_paid'] = false;
  august_paid?: ExpenseEntity['august_paid'] = false;
  september_paid?: ExpenseEntity['september_paid'] = false;
  october_paid?: ExpenseEntity['october_paid'] = false;
  november_paid?: ExpenseEntity['november_paid'] = false;
  december_paid?: ExpenseEntity['december_paid'] = false;
  created_at: ExpenseEntity['created_at'];
  updated_at: ExpenseEntity['updated_at'];
  deleted_at: ExpenseEntity['deleted_at'];
  description?: ExpenseEntity['description'];
  instalment_number?: ExpenseEntity['instalment_number'] = 1;
  constructor(params?: ExpenseConstructorParams) {
    this.id = params?.id ?? this.id;
    this.bill = params?.bill ?? this.bill;
    this.name = params?.name;
    this.year = params?.year ?? this.year;
    this.type = params?.type;
    this.paid = params?.paid ?? this.paid;
    this.total = params?.total ?? this.total;
    this.name_code = this.name ? toSnakeCase(normalize(this.name)) : this.name_code;
    this.supplier = params?.supplier;
    this.total_paid = params?.total_paid ?? this.total_paid;

    MONTHS.forEach(month => {
      this[month] = params?.[month] ?? this[month];
      this[`${month}_paid`] = params?.[`${month}_paid`] ?? this[`${month}_paid`];
      if(this[month] === 0) {
        this[`${month}_paid`] = true;
      }
    });

    this.description = params?.description ?? this.description;
    this.instalment_number =
      params?.instalment_number ?? this.instalment_number;
    this.created_at = params?.created_at ?? this.created_at;
    this.updated_at = params?.updated_at ?? this.updated_at;
    this.deleted_at = params?.deleted_at ?? this.deleted_at;
  }
}
