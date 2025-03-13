import type { IFinance, IFinanceBase } from '../interface';

import type { IBank } from '../bank';
import type { IExpense } from '../expense';
import { EBillType } from '../enum';

export interface IBill extends IFinanceBase {
  year?: number;
  type: EBillType;
  bank: IBank;
  total?: number;
  finance: IFinance;
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
    | 'expenses'
    | 'created_at'
    | 'updated_at'
    | 'deleted_at'
  > {
  bank: string | IBank;
  finance: string | IFinance;
  expenses?: Array<string | IExpense>;
}

export type IUpdateBillParams = ICreateBillParams;