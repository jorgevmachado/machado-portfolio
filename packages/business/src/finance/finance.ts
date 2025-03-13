import type { FinanceConstructorParams, FinanceEntity } from './interface';

export default class Finance implements FinanceEntity {
  id: FinanceEntity['id'];
  user: FinanceEntity['user'];
  bills: FinanceEntity['bills'];
  created_at: FinanceEntity['created_at'];
  updated_at: FinanceEntity['updated_at'];
  deleted_at: FinanceEntity['deleted_at'];

  constructor(params?: FinanceConstructorParams) {
      if(params) {
          this.id = params?.id ?? this.id;
          this.user = params?.user;
          this.bills = params?.bills ?? this.bills;
          this.created_at = params?.created_at ?? this.created_at;
          this.updated_at = params?.updated_at ?? this.updated_at;
          this.deleted_at = params?.deleted_at ?? this.deleted_at;
      }
  }
}