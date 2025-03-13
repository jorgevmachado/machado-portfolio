import { NestModuleAbstract } from '../../nestModuleAbstract';

import type { INestModuleConfig } from '../../interface';

import { IBill, ICreateBillParams, IUpdateBillParams } from './interface';

export class Bill extends NestModuleAbstract<
  IBill,
  ICreateBillParams,
  IUpdateBillParams
> {
  constructor(nestModuleConfig: INestModuleConfig) {
    super({
      pathUrl: 'finance/bill',
      nestModuleConfig,
    });
  }
}