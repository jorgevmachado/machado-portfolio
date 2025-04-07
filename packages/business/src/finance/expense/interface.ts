import {
  IExpense,
  IExpenseCreateParams,
  IExpenseUpdateParams,
} from '../../api/nest/finance';

export type ExpenseEntity = IExpense;

export interface ExpenseConstructorParams
  extends Omit<
    ExpenseEntity,
    'id' | 'name_code' | 'created_at' | 'updated_at' | 'deleted_at'
  > {
  id?: ExpenseEntity['id'];
  value?: ExpenseEntity['value'];
  month?: ExpenseEntity['month'];
  created_at?: ExpenseEntity['created_at'];
  updated_at?: ExpenseEntity['updated_at'];
  deleted_at?: ExpenseEntity['deleted_at'];
}

export type ExpenseCreateParams = IExpenseCreateParams;

export type ExpenseUpdateParams = IExpenseUpdateParams;

export interface InitializedExpense {
  nextYear: number;
  requiresNewBill: boolean;
  expenseForNextYear?: ExpenseEntity;
  expenseForCurrentYear: ExpenseEntity;
}

export interface MergeExpenseParams {
  entity: ExpenseEntity;
  expenseToMerge: ExpenseConstructorParams;
}