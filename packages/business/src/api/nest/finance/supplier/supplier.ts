import type { INestModuleConfig } from '../../interface';

import { NestModuleAbstract } from '../../nestModuleAbstract';

import { SupplierType } from '../supplier-type';

import type { ISupplier, ISupplierParams } from './interface';

export class Supplier extends NestModuleAbstract<
  ISupplier,
  ISupplierParams,
  ISupplierParams
> {
  private readonly supplierTypeModule: SupplierType;
  constructor(nestModuleConfig: INestModuleConfig) {
    super('finance/supplier', nestModuleConfig);
    this.supplierTypeModule = new SupplierType(nestModuleConfig);
  }

  get type(): SupplierType {
    return this.supplierTypeModule;
  }
}