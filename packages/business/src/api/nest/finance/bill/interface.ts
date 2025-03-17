import type { IFinance, IFinanceBase } from '../interface';

import type { IBank } from '../bank';
import type { IExpense } from '../expense';
import type { IBillCategory } from '../bill-category';
import { EBillType } from '../enum';

export interface IBill extends IFinanceBase {
  year?: number;
  type: EBillType;
  bank: IBank;
  total?: number;
  finance: IFinance;
  category: IBillCategory;
  expenses?: Array<IExpense>;
  all_paid?: boolean;
  total_paid?: number;
}

export interface ICreateBillParams
  extends Omit<
    IBill,
    | 'id'
    | 'bank'
    | 'finance'
    | 'category'
    | 'expenses'
    | 'created_at'
    | 'updated_at'
    | 'deleted_at'
  > {
  bank: string | IBank;
  finance: string | IFinance;
  category: string | IBillCategory;
  expenses?: Array<string | IExpense>;
}

export type IUpdateBillParams = ICreateBillParams;