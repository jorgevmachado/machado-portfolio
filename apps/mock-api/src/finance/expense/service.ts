import { Request, Response } from 'express';

import { buildResponse } from '../../shared';
import { findEntityRelations } from '../shared';
import { EXPENSE_FINANCE_ENTITY } from './config';
import Expense from '@repo/business/finance/expense/expense';
import { EExpenseType, EMonth } from '@repo/business/finance/enum';
import ExpenseBusiness from "@repo/business/finance/expense/expenseBusiness";

export function create(req: Request, res: Response) {
  const {
    type,
    bill,
    paid,
    value,
    month,
    supplier,
    description,
    instalment_number,
  } = req.body;

  const entityRelations = findEntityRelations([
    {
      key: 'name',
      param: supplier,
      financeEntity: EXPENSE_FINANCE_ENTITY.supplier,
    },
    {
      key: 'id',
      param: bill,
      financeEntity: EXPENSE_FINANCE_ENTITY.bill,
    },
  ]);

  if (entityRelations.statusCode !== 200) {
    return buildResponse(res, entityRelations);
  }

  const expense = new Expense({
    type,
    bill: entityRelations.response['bill'],
    paid,
    value,
    month,
    supplier: entityRelations.response['supplier'],
    description,
    instalment_number,
  });

  return buildResponse(res, {
    statusCode: 200,
    response: calculate(expense),
  });
}

function calculate(expense: Expense) {
  console.log('# => expense => create => expense => ', expense);
  console.log('# => expense => create => type => ', expense.type);
  console.log('# => expense => create => bill => ', expense.bill);
  console.log('# => expense => create => paid => ', expense.paid);
  console.log('# => expense => create => value => ', expense.value);
  console.log('# => expense => create => month => ', expense.month);
  console.log('# => expense => create => supplier => ', expense.supplier);
  console.log('# => expense => create => description => ', expense.description);
  console.log(
    '# => expense => create => instalment_number => ',
    expense.instalment_number,
  );
  if (expense.type === EExpenseType.FIXED) {
    return calculateTypeFixed(expense);
  }
  if (expense?.instalment_number > 1) {
    return calculateTypeVariableWithInstalmentNumber(expense);
  }
  return expense;
}

function calculateTypeFixed(expense: Expense) {
    const { value, paid } = expense;

    const expenseBusiness = new ExpenseBusiness();

    expenseBusiness.months.forEach((key) => {
        expense[key] = value;
        expense[`${key}_paid`] = paid;
    })
    return expense;
}

function calculateTypeVariableWithInstalmentNumber(expense: Expense) {
    const expenseBusiness = new ExpenseBusiness();
    // TODO MUST BE REMOVED BEFORE COMMIT
    console.log('# => expense => create => calculateTypeVariableWithInstalmentNumber =>')
    const startMonthIndex = getMonthIndex(expense.month);
    console.log('# => expense => create => calculateTypeVariableWithInstalmentNumber => expense.month => ', expense.month)
    console.log('# => expense => create => calculateTypeVariableWithInstalmentNumber => startMonthIndex => ', startMonthIndex)
    if (startMonthIndex === -1) {
        throw new Error('Invalid month provided');
    }

    const expenses: Expense[] = [];

    for (let currentIndex = 0; currentIndex < expense.instalment_number; currentIndex++) {
        // TODO MUST BE REMOVED BEFORE COMMIT
        console.log('# => expense => create => calculateTypeVariableWithInstalmentNumber => currentIndex => ', currentIndex)
        console.log('# => expense => create => calculateTypeVariableWithInstalmentNumber => startMonthIndex => ', startMonthIndex)


        const monthIndex = (startMonthIndex + currentIndex) % expenseBusiness.months.length;
        const yearOffset = Math.floor((startMonthIndex + currentIndex) / expenseBusiness.months.length);
        const month = expenseBusiness.months[monthIndex];

        const newExpense: Expense = {
            ...expense,
            month: EMonth[month as keyof typeof EMonth],
        };

        if (yearOffset > 0) {
            const newExpenseEntity = {
                ...newExpense,
                year: new Date().getFullYear() + yearOffset,
            };
            expenses.push(newExpenseEntity);
        } else {
            expenses.push(newExpense);
        }
    }
    return expenses;
}

function getMonthIndex(month: EMonth) {
    const expenseBusiness = new ExpenseBusiness();
    return expenseBusiness.months.indexOf(month.toLowerCase());
}

function getMonthByIndex(index: number) {
    const expenseBusiness = new ExpenseBusiness();
    return expenseBusiness.months[index];
}