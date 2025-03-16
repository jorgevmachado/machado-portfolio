import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { FINANCE_FIXTURE } from '@repo/business/finance/fixtures/finance';

import FinanceBusiness from '@repo/business/finance/finance';

import { Service } from '../shared';
import { User } from '../auth/users/user.entity';

import { Finance } from './finance.entity';
import { Bank } from './bank/bank.entity';
import { Supplier } from './supplier/supplier.entity';
import { Bill } from './bill/bill.entity';
import { Expense } from './expense/expense.entity';

import { ExpenseService } from './expense/expense.service';
import { SupplierService } from './supplier/supplier.service';
import { BankService } from './bank/bank.service';
import { BillService } from './bill/bill.service';

@Injectable()
export class FinanceService extends Service<Finance> {
  constructor(
    @InjectRepository(Finance)
    protected repository: Repository<Finance>,
    protected readonly supplierService: SupplierService,
    protected readonly bankService: BankService,
    protected readonly expenseService: ExpenseService,
    protected readonly billService: BillService,
  ) {
    super('finances', [], repository);
  }

  async initializeFinance(user: User) {
    const currentFinance = await this.repository
      .createQueryBuilder(this.alias)
      .leftJoinAndSelect(`${this.alias}.user`, 'user')
      .getOne();
    if (currentFinance) {
      return currentFinance;
    }
    const finance = new FinanceBusiness({ user });
    return await this.save(finance);
  }

  async seeds(user: User) {
    try {
      const finance = await this.seedFinance(user);
      const suppliers = await this.executeSeed<Supplier>({
        label: 'Suppliers',
        seedMethod: async () => this.supplierService.seed(),
      });
      const bankList = await this.executeSeed<Bank>({
        label: 'Banks',
        seedMethod: () => this.bankService.seed(),
      });
      const expenseList = await this.executeSeed<Expense>({
        label: 'Expenses',
        seedMethod: () => this.expenseService.seed(suppliers),
      });
      await this.executeSeed<Bill>({
        label: 'Bills',
        seedMethod: () => this.billService.seed({ finance, bankList, expenseList }),
      });

      return {
        message: 'Seeds executed successfully',
      };
    } catch (error) {
      console.error('# => Error during seeds execution:', error);
      throw this.error(new ConflictException('Seed Execution Failed'));
    }
  }

  private async seedFinance(user: User): Promise<Finance> {
    console.info('# => Start seeding Finance');
    return this.seedEntity({
      by: 'id',
      label: 'Finance',
      seed: FINANCE_FIXTURE,
      createdEntityFn: (item) =>
        this.save({
          id: item.id,
          user: user,
          created_at: item.created_at,
          updated_at: item.updated_at,
          deleted_at: item.deleted_at,
        }) as Promise<Finance>,
    });
  }
  private async executeSeed<T>({
    label,
    seedMethod,
  }: {
    label: string;
    seedMethod: () => Promise<Array<T | void>>;
  }): Promise<Array<T>> {
    console.info(`# => Seeding ${label}`);
    const items = await seedMethod();
    const validItems = this.filterValidItems<T>(items);
    console.info(`# => ${validItems.length} ${label} seeded successfully`);
    return validItems;
  }
  private filterValidItems<T>(items: Array<T | void>): Array<T> {
    return items.filter((item): item is T => item !== undefined);
  }
}
