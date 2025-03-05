import type { IFinanceBase, IFinanceResponse } from '../interface';
import type { IExpenseCategoryType } from '../expense-category-type';

export interface IExpenseCategory extends IFinanceBase {
  type: IExpenseCategoryType;
}

export interface IExpenseCategoryParams extends Omit<
    IExpenseCategory,
  'id' | 'type' | 'created_at' | 'updated_at' | 'deleted_at'
> {
  type: string;
}

export type IExpenseCategoryResponse = IFinanceResponse;