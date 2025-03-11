import { NestModuleAbstract } from '../../nestModuleAbstract';
import type { INestModuleConfig } from '../../interface';

import type { IBank, IBankParams } from './interface';

export class Bank extends NestModuleAbstract<IBank, IBankParams, IBankParams> {
  constructor(nestModuleConfig: INestModuleConfig) {
    super({
      pathUrl: 'finance/bank',
      nestModuleConfig,
    });
  }
}