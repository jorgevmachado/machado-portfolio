import type { IFinanceBase, IFinanceResponse } from '../interface';
import { EExpenseType, EMonth } from '../enum';
import type { ISupplier } from '../supplier';

export interface IExpense extends Omit<IFinanceBase, 'name'> {
  year?: number;
  type: EExpenseType;
  paid?: boolean;
  value?: number;
  total?: number;
  month?: EMonth;
  active?: boolean;
  supplier: ISupplier;
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
  supplier: string | IExpense['supplier'];
}

export interface IExpenseUpdateParams
  extends Omit<
    IExpense,
    'id' | 'created_at' | 'updated_at' | 'deleted_at' | 'supplier'
  > {
  supplier: string | IExpense['supplier'];
}

export type IExpenseResponse = IFinanceResponse;