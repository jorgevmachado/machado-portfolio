import { NestModuleAbstract } from '../../nestModuleAbstract';

import type { INestModuleConfig } from '../../interface';

import type { IBill, IBillParams } from './interface';

export class Bill extends NestModuleAbstract<IBill, IBillParams, IBillParams> {
  constructor(nestModuleConfig: INestModuleConfig) {
    super({
      pathUrl: 'finance/bill',
      nestModuleConfig,
    });
  }
}