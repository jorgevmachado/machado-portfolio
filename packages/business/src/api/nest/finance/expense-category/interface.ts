import type { IFinanceBase, IFinanceResponse } from '../interface';
import type { IExpenseCategoryType } from '../expense-category-type';

export interface IExpenseCategory extends IFinanceBase {
  type: IExpenseCategoryType;
}

export type IExpenseCategoryParams = Omit<
  IExpenseCategoryType,
  'id' | 'created_at' | 'updated_at' | 'deleted_at'
>;

export type IExpenseCategoryResponse = IFinanceResponse;