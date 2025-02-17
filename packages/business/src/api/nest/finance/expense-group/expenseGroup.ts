import type { INestModuleConfig } from '../../interface';

import { NestModuleAbstract } from '../../nestModuleAbstract';

import { IExpenseGroup, IExpenseGroupParams } from './interface';

export class ExpenseGroup extends NestModuleAbstract<
  IExpenseGroup,
  IExpenseGroupParams,
  IExpenseGroupParams
> {
  constructor(nestModuleConfig: INestModuleConfig) {
    super('finance/expense/group', nestModuleConfig);
  }
}