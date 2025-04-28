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

export interface InitializeExpenseParams {
  value: number;
  type?: ExpenseEntity['type'];
  month?: ExpenseEntity['month'];
  expense: ExpenseConstructorParams;
  instalment_number?: number;
}

export interface InitializedExpense {
  nextYear: number;
  requiresNewBill: boolean;
  monthsForNextYear?: Array<string>;
  expenseForNextYear?: ExpenseEntity;
  monthsForCurrentYear?: Array<string>;
  expenseForCurrentYear: ExpenseEntity;
}

export interface ReinitializeExpenseParams {
  months: Array<string>;
  expense: ExpenseEntity;
  existingExpense?: ExpenseEntity;
}

export interface HandleExpenseForNextYearParams {
  paid: ExpenseEntity['paid'];
  year: ExpenseEntity['year'];
  type: ExpenseEntity['type'];
  value: number;
  name: ExpenseEntity['name'];
  months: Array<string>;
  supplier: ExpenseEntity['supplier'];
  description?: ExpenseEntity['description'];
}

export interface MergeExpenseParams {
  entity: ExpenseEntity;
  expenseToMerge: ExpenseConstructorParams;
}