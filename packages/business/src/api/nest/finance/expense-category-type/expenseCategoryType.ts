import type { INestModuleConfig } from '../../interface';

import { NestModuleAbstract } from '../../nestModuleAbstract';

import type { IExpenseCategoryType, IExpenseCategoryTypeParams } from './interface';

export class ExpenseCategoryType extends NestModuleAbstract<
  IExpenseCategoryType,
  IExpenseCategoryTypeParams,
  IExpenseCategoryTypeParams
> {
  constructor(nestModuleConfig: INestModuleConfig) {
    super('finance/expense/category/type', nestModuleConfig);
  }
}