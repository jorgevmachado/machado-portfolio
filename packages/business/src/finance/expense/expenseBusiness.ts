import {
  getMonthIndex,
  MONTHS,
  validateMonth,
  getCurrentMonth
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
  initialize(params: ExpenseConstructorParams, month?: EMonth, value: number = 0): InitializedExpense {
    const currentMonth = month ?? getCurrentMonth();
    const builtExpense = new Expense(params);
    validateMonth(currentMonth);
    return this.initializeValues(builtExpense, value, currentMonth);
  }

  private initializeValues(expense: Expense, value: number, month: EMonth): InitializedExpense {
    return expense.type === EExpenseType.FIXED
        ? this.handleFixedExpense(expense, value)
        : this.handleVariableExpense(expense, value, month);
  }

  private handleFixedExpense(expense: Expense, value: number): InitializedExpense {
    const expenseForCurrentYear = this.updateMonthsOfExpense(expense, MONTHS, value, expense.paid);
    return {
      nextYear: expense.year + 1,
      requiresNewBill: false,
      expenseForNextYear: undefined,
      expenseForCurrentYear,
    };
  }

  private handleVariableExpense(expense: Expense, value: number, startMonth: EMonth): InitializedExpense {
    const startMonthIndex = getMonthIndex(startMonth.toUpperCase() as EMonth);
    const { monthsForCurrentYear, monthsForNextYear } = this.splitMonthsByYear(expense.year, expense.instalment_number, startMonthIndex);
    const expenseForCurrentYear = this.updateMonthsOfExpense(expense, monthsForCurrentYear, value, expense.paid);
    const result: InitializedExpense = {
      nextYear: expense.year + 1,
      requiresNewBill: monthsForNextYear.length > 0,
      expenseForCurrentYear,
      expenseForNextYear: undefined,
    };

    if (result.requiresNewBill) {
      result.expenseForNextYear = this.updateMonthsOfExpense(
          {...expense, year: result.nextYear},
          monthsForNextYear,
          value,
          expense.paid,
      );
    }
    return result;
  }

  private splitMonthsByYear(
      currentYear: number,
      instalments: number,
      startMonthIndex: number,
  ) {
    const monthsForCurrentYear: Array<string> = [];
    const monthsForNextYear: Array<string> = [];
    for (let i = 0; i < instalments; i++) {
      const monthIndex = (startMonthIndex + i) % 12;
      const year = currentYear + Math.floor((startMonthIndex + i) / 12);

      if (year === currentYear) {
        monthsForCurrentYear.push(MONTHS[monthIndex]);
      } else {
        monthsForNextYear.push(MONTHS[monthIndex]);
      }
    }

    return { monthsForCurrentYear, monthsForNextYear };
  }

  private updateMonthsOfExpense(
      expense: Expense,
      months: Array<string>,
      value: number,
      paid: boolean,
  ): Expense {
    const updatedExpense = { ...expense };
    MONTHS.forEach((month) => {
      updatedExpense[month] = 0;
      updatedExpense[`${month}_paid`] = false;
    });
    months.forEach((month) => {
      updatedExpense[month] = value;
      updatedExpense[`${month}_paid`] = paid;
    });
    MONTHS.forEach((month) => {
      if(updatedExpense[month] === 0) {
        updatedExpense[`${month}_paid`] = true;
      }
    });
    updatedExpense.instalment_number = expense.type === EExpenseType.FIXED ? 12 : months.length;
    return updatedExpense;
  }


  calculateExpense(params: ExpenseConstructorParams) {
    const builtExpense = new Expense(params);
    if(params.paid) {
      MONTHS.forEach((month) => {
        builtExpense[`${month}_paid`] = true;
      })
    }
    return this.calculateTotals(builtExpense);
  }

  private calculateTotals(expense: Expense) {
    const calculationOfTotals = this.calculateTotalAndPaid(expense);
    expense.total = Number(calculationOfTotals.total.toFixed(2));
    expense.total_paid = Number(calculationOfTotals.total_paid.toFixed(2));
    expense.paid = this.hasBeenFullyPaid(expense);
    return expense;
  }


  private calculateTotalAndPaid(expense: Expense) {
    const result = {
      total: 0,
      total_paid: 0,
    }
    MONTHS.forEach(month => {
      result.total += expense[month];
      result.total_paid += expense[`${month}_paid`] ? expense[month] : 0;
    });

    return result;
  }

  private hasBeenFullyPaid(expense: Expense) {
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