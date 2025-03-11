import type { INestModuleConfig } from '../../interface';

import { NestModuleAbstract } from '../../nestModuleAbstract';

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
  constructor(nestModuleConfig: INestModuleConfig) {
    super({
      pathUrl: 'finance/expense',
      nestModuleConfig,
    });
  }
}