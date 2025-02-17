import type { INestModuleConfig } from '../../interface';

import { NestModuleAbstract } from '../../nestModuleAbstract';

import { ExpenseCategory } from '../expense-category';
import { ExpenseGroup } from '../expense-group';

import type {
  IExpense,
  IExpenseCreateParams,
  IExpenseUpdateParams,
} from './interface';

export class Expense extends NestModuleAbstract<
  IExpense,
  IExpenseCreateParams,
  IExpenseUpdateParams
> {
  private readonly expenseGroupModule: ExpenseGroup;
  private readonly expenseCategoryModule: ExpenseCategory;
  constructor(nestModuleConfig: INestModuleConfig) {
    super('finance/expense', nestModuleConfig);
    this.expenseGroupModule = new ExpenseGroup(nestModuleConfig);
    this.expenseCategoryModule = new ExpenseCategory(nestModuleConfig);
  }

  get group(): ExpenseGroup {
    return this.expenseGroupModule;
  }

  get category(): ExpenseCategory {
    return this.expenseCategoryModule;
  }
}