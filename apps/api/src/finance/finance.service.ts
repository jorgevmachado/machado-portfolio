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
import { BillCategory } from './bill/bill-category/bill-category.entity';

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

  async seed(user: User, withReturnSeed: boolean = true) {
    return await this.seeder.entity({
      by: 'id',
      label: 'Finance',
      seed: FINANCE_FIXTURE,
      withReturnSeed,
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

  async basicSeeds(withReturnSeed: boolean = true) {
    const supplierList = await this.seeder.executeSeed<Supplier>({
      label: 'Suppliers',
      seedMethod: async () => {
        const result = await this.supplierService.seed();
        return Array.isArray(result) ? result : [];
      },
    });
    const bankList = await this.seeder.executeSeed<Bank>({
      label: 'Banks',
      seedMethod: async () => {
        const result = await this.bankService.seed();
        return Array.isArray(result) ? result : [];
      },
    });
    const billCategoryList = await this.seeder.executeSeed<BillCategory>({
      label: 'Bill Categories',
      seedMethod: async () => {
        const result = await this.billService.billCategorySeed();
        return Array.isArray(result) ? result : [];
      },
    });
    if (withReturnSeed) {
      return { supplierList, bankList, billCategoryList };
    }
    return {
      message:
        'Seeding suppliers , banks and Bill Categories  Completed Successfully!',
    };
  }

  async seeds(user: User) {
    try {
      const finance = (await this.seed(user)) as Finance;
      const { supplierList, bankList, billCategoryList } =
        await this.basicSeeds();
      const billList = await this.seeder.executeSeed<Bill>({
        label: 'Bills',
        seedMethod: async () => {
          const result = await this.billService.seed({
            finance,
            bankList,
            billCategoryList,
          });
          return Array.isArray(result) ? result : [];
        },
      });

      await this.seeder.executeSeed<Expense>({
        label: 'Expenses',
        seedMethod: async () => {
          const result = await this.expenseService.seed(supplierList, billList);
          return Array.isArray(result) ? result : [];
        },
      });

      return {
        message: 'Seeds finances executed successfully',
      };
    } catch (error) {
      console.error('# => Error during seeds execution:', error);
      throw this.error(new ConflictException('Seed Execution Failed'));
    }
  }
}
