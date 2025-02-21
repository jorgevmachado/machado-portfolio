import type { INestModuleConfig } from '../../interface';

import { NestModuleAbstract } from '../../nestModuleAbstract';

import type { IExpenseGroup, IExpenseGroupParams } from './interface';

export class ExpenseGroup extends NestModuleAbstract<
  IExpenseGroup,
  IExpenseGroupParams,
  IExpenseGroupParams
> {
  constructor(nestModuleConfig: INestModuleConfig) {
    super({
      pathUrl: 'finance/expense',
      subPathUrl: 'group',
      nestModuleConfig,
    });
  }
}