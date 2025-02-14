import { Http } from '@repo/services/http/http';

import type { INestModuleConfig } from '../interface';

import { SupplierType } from './supplier-type';
import { Supplier } from './supplier';
import { ExpenseCategoryType } from './expense-category-type';
import { ExpenseCategory } from './expense-category';
import { ExpenseGroup } from './expense-group/expenseGroup';

import { Expense } from './expense';

export class Finance extends Http {
  private readonly supplierTypeModule: SupplierType;
  private readonly supplierModule: Supplier;
  private readonly expenseCategoryTypeModule: ExpenseCategoryType;
  private readonly expenseCategoryModule: ExpenseCategory;
  private readonly expenseGroupModule: ExpenseGroup;
  private readonly expenseModule: Expense;
  constructor({ baseUrl, headers }: INestModuleConfig) {
    super(baseUrl, { headers });
    this.supplierTypeModule = new SupplierType({ baseUrl, headers });
    this.supplierModule = new Supplier({ baseUrl, headers });
    this.expenseCategoryTypeModule = new ExpenseCategoryType({
      baseUrl,
      headers,
    });
    this.expenseCategoryModule = new ExpenseCategory({ baseUrl, headers });
    this.expenseGroupModule = new ExpenseGroup({ baseUrl, headers });
    this.expenseModule = new Expense({ baseUrl, headers });
  }

  get supplierType() {
    return this.supplierTypeModule;
  }

  get supplier() {
    return this.supplierModule;
  }

  get expenseCategoryType() {
    return this.expenseCategoryTypeModule;
  }

  get expenseCategory() {
    return this.expenseCategoryModule;
  }

  get expenseGroup() {
    return this.expenseGroupModule;
  }

  get expense() {
    return this.expenseModule;
  }
}