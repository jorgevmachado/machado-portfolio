import type { INestModuleConfig } from '../../interface';

import { NestModuleAbstract } from '../../nestModuleAbstract';

import { ExpenseCategoryType } from '../expense-category-type';

import type { IExpenseCategory, IExpenseCategoryParams } from './interface';


export class ExpenseCategory extends NestModuleAbstract<
  IExpenseCategory,
  IExpenseCategoryParams,
  IExpenseCategoryParams
> {
  private readonly expenseCategoryTypeModule: ExpenseCategoryType;
  constructor(nestModuleConfig: INestModuleConfig) {
    super('finance/expense/category', nestModuleConfig);
    this.expenseCategoryTypeModule = new ExpenseCategoryType(nestModuleConfig);
  }

  get type(): ExpenseCategoryType {
    return this.expenseCategoryTypeModule;
  }
}