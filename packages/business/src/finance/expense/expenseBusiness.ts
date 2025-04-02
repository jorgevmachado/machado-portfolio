import {
  getMonthIndex,
  MONTHS,
  validateMonth,
} from '@repo/services/month/month';
import { EMonth } from '@repo/services/month/enum';

import { EExpenseType } from '../enum';

import type {
  ExpenseConstructorParams,
  InitializedExpense,
  MergeExpenseParams,
} from './interface';
import Expense from './expense';

export default class ExpenseBusiness {
  initialize(params: ExpenseConstructorParams): InitializedExpense {
    const { value, month} = params;
    const builtExpense = new Expense(params);
    validateMonth(month);
    return this.initializeValues(builtExpense, value, month);
  }

  private initializeValues(expense: Expense, value: number, month: EMonth): InitializedExpense {
    if (expense.type === EExpenseType.FIXED) {
      return {
        nextYear: expense.year + 1,
        requiresNewBill: false,
        expenseForNextYear: undefined,
        expenseForCurrentYear: this.processValuesFixed(expense, value),
      };
    }
    return this.processValuesVariable(expense, value, month);
  }

  private processValuesFixed(expense: Expense, value: number): Expense {
    return this.processesMonthsOfExpense(expense, MONTHS, value, expense.paid);
  }

  private processValuesVariable(expense: Expense, value: number, month: EMonth): InitializedExpense {
    const result: InitializedExpense = {
      nextYear: expense.year + 1,
      requiresNewBill: false,
      expenseForNextYear: undefined,
      expenseForCurrentYear: expense,
    };
    const { year,instalment_number } = expense;
    const startMonthIndex = getMonthIndex(month.toUpperCase() as EMonth);
    const monthsForCurrentYear: Array<string> = [];
    const monthsForNextYear: Array<string> = [];

    for (let i = 0; i < instalment_number; i++) {
      const monthIndex = (startMonthIndex + i) % 12;
      const currentYear = year + Math.floor((startMonthIndex + i) / 12);
      if (currentYear === year) {
        monthsForCurrentYear.push(MONTHS[monthIndex]);
      } else {
        monthsForNextYear.push(MONTHS[monthIndex]);
      }
    }
    result.requiresNewBill = monthsForNextYear.length > 0;
    const currentExpense = JSON.parse(JSON.stringify(expense));
    result.expenseForCurrentYear = this.processesMonthsOfExpense(
      expense,
      monthsForCurrentYear,
      value,
      expense.paid,
    );
    if (result.requiresNewBill) {
      result.expenseForNextYear = this.processesMonthsOfExpense(
          {
            ...currentExpense,
            year: result.nextYear
          },
        monthsForNextYear,
        currentExpense.value,
        currentExpense.paid,
      );
    }
    return result;
  }

  private processesMonthsOfExpense(
    expense: Expense,
    months: Array<string>,
    value: number,
    paid: boolean,
  ): Expense {
    MONTHS.forEach((month) => {
      expense[month] = 0;
      expense[`${month}_paid`] = false;
    });
    months.forEach((month) => {
      expense[month] = value;
      expense[`${month}_paid`] = paid;
    });
    MONTHS.forEach((month) => {
      if(expense[month] === 0) {
        expense[`${month}_paid`] = true;
      }
    });
    return expense;
  }

  calculateExpense(params: ExpenseConstructorParams) {
    const builtExpense = new Expense(params);
    if(params.paid) {
      MONTHS.forEach((month) => {
        builtExpense[`${month}_paid`] = true;
      })
    }
    return this.calculate(builtExpense);
  }

  private calculate(expense: Expense) {
    const { total, total_paid } = this.calculateTotal(expense);
    expense.total = total;
    expense.total_paid = total_paid;
    expense.paid = this.validateHaveBeenPaid(expense);
    return expense;
  }

  private calculateTotal(expense: Expense) {
    expense.total = 0;
    expense.total_paid = 0;
    MONTHS.forEach((key) => {
      expense.total += expense[key];
      expense.total_paid += expense[`${key}_paid`] ? expense[key] : 0;
    });
    return {
      total: expense.total,
      total_paid: expense.total_paid,
    };
  }

  private validateHaveBeenPaid(expense: Expense) {
    return MONTHS.every((month) => expense[`${month}_paid`] === true);
  }

  merge({ entity, expenseToMerge }: MergeExpenseParams): Expense {
    const expenseMerged = {
      id: expenseToMerge?.id ?? entity.id,
      year: expenseToMerge?.year ?? entity.year,
      type: expenseToMerge?.type,
      paid: expenseToMerge?.paid ?? entity.paid,
      name: expenseToMerge?.name,
      bill: expenseToMerge?.bill ?? entity.bill,
      total: expenseToMerge?.total ?? entity.total,
      supplier: expenseToMerge?.supplier,
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

    return new Expense(expenseMerged);
  }

  calculateAllExpenses(expenses: Array<Expense>) {
    const total = expenses.reduce(
      (acc, expense) => acc + (expense.total || 0),
      0,
    );
    const allPaid = expenses.every((expense) => expense.paid);
    const totalPaid = expenses.reduce(
      (acc, expense) => acc + (expense.total_paid || 0),
      0,
    );
    const totalPending = total - totalPaid;
    return {
      total,
      allPaid,
      totalPaid,
      totalPending,
    };
  }
}