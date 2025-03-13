import { NestModuleAbstract } from '../../nestModuleAbstract';
import type { INestModuleConfig } from '../../interface';

import type { IBank, ICreateBankParams, IUpdateBankParams } from './interface';

export class Bank extends NestModuleAbstract<
  IBank,
  ICreateBankParams,
  IUpdateBankParams
> {
  constructor(nestModuleConfig: INestModuleConfig) {
    super({
      pathUrl: 'finance/bank',
      nestModuleConfig,
    });
  }
}