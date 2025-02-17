import type { INestBaseEntity, INestBaseResponse } from '../interface';

export interface IFinanceBase extends INestBaseEntity {
  name: string;
}

export type IFinanceResponse = INestBaseResponse;

export * from './supplier-type/interface';
export * from './supplier/interface';
export * from './expense-category-type/interface';
export * from './expense-category/interface';
export * from './expense-group/interface';
export * from './expense/interface';