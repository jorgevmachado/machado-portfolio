import type { INestModuleConfig } from '../../interface';

import { NestModuleAbstract } from '../../nestModuleAbstract';

import {
  ICreateSupplierTypeParams,
  ISupplierType,
  IUpdateSupplierTypeParams,
} from './interface';

export class SupplierType extends NestModuleAbstract<
  ISupplierType,
  ICreateSupplierTypeParams,
  IUpdateSupplierTypeParams
> {
  constructor(nestModuleConfig: INestModuleConfig) {
    super({
      pathUrl: 'finance/supplier',
      subPathUrl: 'type',
      nestModuleConfig,
    });
  }
}