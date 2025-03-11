import type { IFinanceBase } from '../interface';

import { IUser } from '../../auth';

import type { IBank } from '../bank';
import type { IExpense } from '../expense';
import { EBillType } from '../enum';

export interface IBill extends IFinanceBase {
  year?: number;
  type: EBillType;
  bank: IBank;
  user: IUser;
  total?: number;
  all_paid?: boolean;
  total_paid?: number;
  expenses: Array<IExpense>;
}

export interface IBillParams
  extends Omit<
    IBill,
    'id' | 'bank' | 'expenses' | 'created_at' | 'updated_at' | 'deleted_at'
  > {
  bank: string | IBank;
  expenses: Array<string | IExpense>;
}