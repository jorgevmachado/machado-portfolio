import {
  IExpense,
  IExpenseCreateParams,
  IExpenseUpdateParams,
} from '../../api/nest/finance';

export type ExpenseEntity = IExpense;

export interface ExpenseConstructorParams
  extends Omit<
    ExpenseEntity,
    'id' | 'created_at' | 'updated_at' | 'deleted_at'
  > {
  id?: ExpenseEntity['id'];
  created_at?: ExpenseEntity['created_at'];
  updated_at?: ExpenseEntity['updated_at'];
  deleted_at?: ExpenseEntity['deleted_at'];
}

export interface ExpenseMergeParams {
  entity: ExpenseEntity;
  expenseToMerge: ExpenseConstructorParams;
  withAllCalculations?: boolean;
}
export type ExpenseCreateParams = IExpenseCreateParams;

export type ExpenseUpdateParams = IExpenseUpdateParams;