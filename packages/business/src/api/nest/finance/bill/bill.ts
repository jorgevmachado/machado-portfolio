import { NestModuleAbstract } from '../../nestModuleAbstract';

import type { INestModuleConfig } from '../../interface';

import { BillCategory } from '../bill-category';

import type { IBill, ICreateBillParams, IUpdateBillParams } from './interface';

export class Bill extends NestModuleAbstract<
  IBill,
  ICreateBillParams,
  IUpdateBillParams
> {
  private readonly billCategoryModule: BillCategory;
  constructor(nestModuleConfig: INestModuleConfig) {
    super({
      pathUrl: 'finance/bill',
      nestModuleConfig,
    });
    this.billCategoryModule = new BillCategory(nestModuleConfig);
  }

  get category(): BillCategory {
    return this.billCategoryModule;
  }
}