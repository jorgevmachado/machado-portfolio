import { NestModuleAbstract } from '../nestModuleAbstract';

import type { INestModuleConfig } from '../interface';

import { Supplier } from './supplier';
import { Expense } from './expense';
import { Bill } from './bill';
import { Bank } from './bank';
import type {
  ICreateFinanceParams,
  IFinance,
  IUpdateFinanceParams,
} from './interface';
import { FinanceEntity } from '../../../finance';

export class Finance extends NestModuleAbstract<
  IFinance,
  ICreateFinanceParams,
  IUpdateFinanceParams
> {
  private readonly supplierModule: Supplier;
  private readonly bankModule: Bank;
  private readonly expenseModule: Expense;
  private readonly billModule: Bill;
  constructor(nestModuleConfig: INestModuleConfig) {
    super({ pathUrl: 'finance', nestModuleConfig });

    this.bankModule = new Bank(nestModuleConfig);
    this.supplierModule = new Supplier(nestModuleConfig);
    this.expenseModule = new Expense(nestModuleConfig);
    this.billModule = new Bill(nestModuleConfig);
  }

  get bank() {
    return this.bankModule;
  }

  get supplier() {
    return this.supplierModule;
  }

  get expense() {
    return this.expenseModule;
  }

  get bill() {
    return this.billModule;
  }

  async initialize(): Promise<FinanceEntity> {
    return this.post('finance/initialize');
  }
}