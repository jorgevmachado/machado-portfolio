import { NestModuleAbstract } from '../nestModuleAbstract';

import type { INestModuleConfig } from '../interface';

import { Supplier } from './supplier';
import { Expense } from './expense';

export class Finance extends NestModuleAbstract<unknown, unknown, unknown> {
  private readonly supplierModule: Supplier;
  private readonly expenseModule: Expense;
  constructor(nestModuleConfig: INestModuleConfig) {
    super('finance', nestModuleConfig);
    this.supplierModule = new Supplier(nestModuleConfig);
    this.expenseModule = new Expense(nestModuleConfig);
  }

  get supplier() {
    return this.supplierModule;
  }

  get expense() {
    return this.expenseModule;
  }
}