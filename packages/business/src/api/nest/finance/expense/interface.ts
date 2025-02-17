import type { IUser } from '../../auth';

import type { IFinanceBase, IFinanceResponse } from '../interface';
import { EExpenseType, EMonth } from '../enum';

import type { ISupplier } from '../supplier';
import type { IExpenseCategory } from '../expense-category';
import type { IExpenseGroup } from '../expense-group';

export interface IExpense extends Omit<IFinanceBase, 'name'> {
  user: IUser;
  year?: number;
  type: EExpenseType;
  paid?: boolean;
  value?: number;
  total?: number;
  month?: EMonth;
  group: IExpenseGroup;
  active?: boolean;
  supplier: ISupplier;
  category: IExpenseCategory;
  total_paid?: number;
  january?: number;
  january_paid?: boolean;
  february?: number;
  february_paid?: boolean;
  march?: number;
  march_paid?: boolean;
  april?: number;
  april_paid?: boolean;
  may?: number;
  may_paid?: boolean;
  june?: number;
  june_paid?: boolean;
  july?: number;
  july_paid?: boolean;
  august?: number;
  august_paid?: boolean;
  september?: number;
  september_paid?: boolean;
  october?: number;
  october_paid?: boolean;
  november?: number;
  november_paid?: boolean;
  december?: number;
  december_paid?: boolean;
  description?: string;
  instalment_number?: number;
}

export interface IExpenseCreateParams
  extends Pick<
    IExpense,
    | 'year'
    | 'type'
    | 'paid'
    | 'value'
    | 'month'
    | 'description'
    | 'instalment_number'
  > {
  group: string | IExpense['group'];
  supplier: string | IExpense['supplier'];
  category: string | IExpense['category'];
}

export interface IExpenseUpdateParams
  extends Omit<
    IExpense,
    | 'id'
    | 'created_at'
    | 'updated_at'
    | 'deleted_at'
    | 'group'
    | 'supplier'
    | 'category'
  > {
  group: string | IExpense['group'];
  supplier: string | IExpense['supplier'];
  category: string | IExpense['category'];
}

export type IExpenseResponse = IFinanceResponse;