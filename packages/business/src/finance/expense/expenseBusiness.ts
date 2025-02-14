import { EExpenseType } from '../enum';

import { ExpenseConstructorParams, ExpenseMergeParams } from './interface';

import Expense from './expense';

import {
  getMonthByIndex,
  getMonthIndex,
  MONTH_KEYS,
  validateMonth,
} from './config';

export default class ExpenseBusiness {
  initializeExpense(params: ExpenseConstructorParams): Expense {
    const builtExpense = new Expense(params);
    const processedExpenseValues = this.processValues(builtExpense);
    return this.processAllCalculate(processedExpenseValues);
  }

  merge({
    entity,
    expenseToMerge,
    withAllCalculations = false,
  }: ExpenseMergeParams): Expense {
    const mergedExpense = {
      id: expenseToMerge?.id ?? entity.id,
      user: expenseToMerge?.user ?? entity.user,
      year: expenseToMerge?.year ?? entity.year,
      type: expenseToMerge?.type ?? entity.type,
      paid: expenseToMerge?.paid ?? entity.paid,
      value: expenseToMerge?.value ?? entity.value,
      total: expenseToMerge?.total ?? entity.total,
      month: expenseToMerge?.month ?? entity.month,
      group: expenseToMerge?.group ?? entity.group,
      active: expenseToMerge?.active ?? entity.active,
      supplier: expenseToMerge?.supplier ?? entity.supplier,
      category: expenseToMerge?.category ?? entity.category,
      total_paid: expenseToMerge?.total_paid ?? entity.total_paid,
      january: expenseToMerge?.january ?? entity.january,
      february: expenseToMerge?.february ?? entity.february,
      march: expenseToMerge?.march ?? entity.march,
      april: expenseToMerge?.april ?? entity.april,
      may: expenseToMerge?.may ?? entity.may,
      june: expenseToMerge?.june ?? entity.june,
      july: expenseToMerge?.july ?? entity.july,
      august: expenseToMerge?.august ?? entity.august,
      september: expenseToMerge?.september ?? entity.september,
      october: expenseToMerge?.october ?? entity.october,
      november: expenseToMerge?.november ?? entity.november,
      december: expenseToMerge?.december ?? entity.december,
      january_paid: expenseToMerge?.january_paid ?? entity.january_paid,
      february_paid: expenseToMerge?.february_paid ?? entity.february_paid,
      march_paid: expenseToMerge?.march_paid ?? entity.march_paid,
      april_paid: expenseToMerge?.april_paid ?? entity.april_paid,
      may_paid: expenseToMerge?.may_paid ?? entity.may_paid,
      june_paid: expenseToMerge?.june_paid ?? entity.june_paid,
      july_paid: expenseToMerge?.july_paid ?? entity.july_paid,
      august_paid: expenseToMerge?.august_paid ?? entity.august_paid,
      september_paid: expenseToMerge?.september_paid ?? entity.september_paid,
      october_paid: expenseToMerge?.october_paid ?? entity.october_paid,
      november_paid: expenseToMerge?.november_paid ?? entity.november_paid,
      december_paid: expenseToMerge?.december_paid ?? entity.december_paid,
      description: expenseToMerge?.description ?? entity.description,
      instalment_number:
        expenseToMerge?.instalment_number ?? entity.instalment_number,
      created_at: expenseToMerge?.created_at ?? entity.created_at,
      updated_at: expenseToMerge?.updated_at ?? entity.updated_at,
      deleted_at: expenseToMerge?.deleted_at ?? entity.deleted_at,
    };
    const expense = new Expense(mergedExpense);
    if (!withAllCalculations) {
      return expense;
    }
    return this.processAllCalculate(expense);
  }

  processValues(expense: Expense): Expense {
    if (expense.instalment_number > 1) {
      return this.processValuesMonthsInstallment(expense);
    }

    if (expense.type === EExpenseType.FIXED) {
      return this.processValuesFixed(expense);
    }

    return this.processValuesVariables(expense);
  }

  processAllCalculate(expense: Expense): Expense {
    const { total, total_paid } = this.calculateTotal(expense);
    expense.total = total;
    expense.total_paid = total_paid;
    expense.paid = this.validateAllPaid(expense);
    return expense;
  }

  calculateTotal(expense: Expense) {
    expense.total = 0;
    expense.total_paid = 0;
    MONTH_KEYS.forEach((key) => {
      expense.total += expense[key];
      expense.total_paid += expense[`${key}_paid`] ? expense[key] : 0;
    });
    return {
      total: expense.total,
      total_paid: expense.total_paid,
    };
  }

  validateAllPaid(expense: Expense) {
    return MONTH_KEYS.every((month) => expense[`${month}_paid`] === true);
  }

  private processValuesMonthsInstallment(expense: Expense): Expense {
    const { month, paid, value, instalment_number } = expense;
    validateMonth(month);
    const currentMonthIndex = getMonthIndex(month);
    const currentValue = value / instalment_number;
    for (let i = 0; i < instalment_number; i++) {
      const installmentMonthIndex = (currentMonthIndex + i) % 12;
      const installmentMonth = getMonthByIndex(installmentMonthIndex);
      expense[installmentMonth] =
        (expense[installmentMonth] || 0) + currentValue;
      expense[`${installmentMonth}_paid`] = paid;
    }
    return expense;
  }

  private processValuesFixed(expense: Expense): Expense {
    const { value, paid } = expense;
    MONTH_KEYS.forEach((key) => {
      expense[key] = value;
      expense[`${key}_paid`] = paid;
    });
    return expense;
  }

  private processValuesVariables(expense: Expense): Expense {
    const { value, paid, month } = expense;
    validateMonth(month);
    const currentMonth = expense.month.toLowerCase();
    expense[currentMonth] = !expense[currentMonth]
      ? value
      : expense[currentMonth] + value;
    expense[`${currentMonth}_paid`] = paid;
    return expense;
  }
}