import type { IFinanceBase } from '../interface';
import type { IExpenseCategoryType } from '../expense-category-type';

export interface IExpenseCategory extends IFinanceBase {
  type: IExpenseCategoryType;
}