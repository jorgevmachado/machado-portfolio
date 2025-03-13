import type { INestModuleConfig } from '../../interface';

import { NestModuleAbstract } from '../../nestModuleAbstract';

import { SupplierType } from '../supplier-type';

import {
  ICreateSupplierParams,
  ISupplier,
  IUpdateSupplierParams,
} from './interface';

export class Supplier extends NestModuleAbstract<
  ISupplier,
  ICreateSupplierParams,
  IUpdateSupplierParams
> {
  private readonly supplierTypeModule: SupplierType;
  constructor(nestModuleConfig: INestModuleConfig) {
    super({
      pathUrl: 'finance/supplier',
      nestModuleConfig,
    });
    this.supplierTypeModule = new SupplierType(nestModuleConfig);
  }

  get type(): SupplierType {
    return this.supplierTypeModule;
  }
}