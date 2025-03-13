import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {FINANCE_FIXTURE} from "@repo/mock/finance/fixtures/finance";

import { Service } from '../shared';
import { User } from '../auth/users/user.entity';

import { ExpenseService } from './expense/expense.service';
import { SupplierService } from './supplier/supplier.service';
import { BankService } from './bank/bank.service';
import { BillService } from './bill/bill.service';

import { Finance } from './finance.entity';


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

  async seeds(user: User) {
    const { suppliers } = (await this.supplierService.seed()) ?? {};
    console.info('# => suppliers exist => ', Boolean(suppliers));
    const bankList = await this.bankService.seed();
    console.info('# => banks exist => ', Boolean(bankList));
    const expenseList = await this.expenseService.seed(suppliers);
    console.info('# => expenses exist => ', Boolean(expenseList));
    const bills = await this.billService.seed({ user, bankList, expenseList });
    console.info('# => bills exist => ', Boolean(bills));
    return {
      message: 'Seeds executed successfully',
    };
  }

  async seed(user: User) {
    console.info('# => start finance seeding');
    const financeSeed = FINANCE_FIXTURE;
    const currentFinance = await this.findOne({ value: financeSeed.id, withThrow: false });

    if (currentFinance) {
      console.info('# => No new finance to seed');
      return currentFinance;
    }

    return await this.save({
      id: financeSeed.id,
      user: user,
      created_at: financeSeed.created_at,
      updated_at: financeSeed.updated_at,
      deleted_at: financeSeed.deleted_at,
    });

  }
}
