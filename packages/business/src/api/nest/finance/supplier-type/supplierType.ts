import type { INestModuleConfig } from '../../interface';

import { NestModuleAbstract } from '../../nestModuleAbstract';

import type { ISupplierType, ISupplierTypeParams } from './interface';

export class SupplierType extends NestModuleAbstract<
  ISupplierType,
  ISupplierTypeParams,
  ISupplierTypeParams
> {
  constructor(nestModuleConfig: INestModuleConfig) {
    super({
      pathUrl: 'finance/supplier',
      subPathUrl: 'type',
      nestModuleConfig,
    });
  }
}