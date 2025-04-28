import type { IFinanceBase } from '../interface';

export type IBillCategory = IFinanceBase;

export type ICreateBillCategoryParams = Pick<IBillCategory, 'name'>;

export type IUpdateBillCategoryParams = ICreateBillCategoryParams;