import { NestModuleAbstract } from '../nestModuleAbstract';

import type { INestModuleConfig } from '../interface';

import { Supplier } from './supplier';
import { Expense } from './expense';
import { Bill } from './bill';
import { Bank } from './bank';

export class Finance extends NestModuleAbstract<unknown, unknown, unknown> {
  private readonly supplierModule: Supplier;
  private readonly bankModule: Bank;
  private readonly expenseModule: Expense;
  private readonly billModule: Bill;
  constructor(nestModuleConfig: INestModuleConfig) {
    super({ pathUrl: 'finance', nestModuleConfig });

    this.supplierModule = new Supplier(nestModuleConfig);
    this.expenseModule = new Expense(nestModuleConfig);
    this.billModule = new Bill(nestModuleConfig);
    this.bankModule = new Bank(nestModuleConfig);
  }

  get supplier() {
    return this.supplierModule;
  }

  get bank() {
    return this.bankModule;
  }

  get expense() {
    return this.expenseModule;
  }

  get bill() {
    return this.billModule;
  }
}