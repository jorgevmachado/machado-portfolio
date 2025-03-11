import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import BillBusiness from '@repo/business/finance/bill/billBusiness';

import { BILL_LIST_FIXTURE } from '@repo/mock/finance/bill/fixtures/bill';

import { Service } from '../../shared';
import { Bill } from './bill.entity';
import { Bank } from '../bank/bank.entity';
import { User } from '../../auth/users/user.entity';
import { Expense } from '../expense/expense.entity';

@Injectable()
export class BillService extends Service<Bill> {
  constructor(
    @InjectRepository(Bill)
    protected repository: Repository<Bill>,
    protected billBusiness: BillBusiness,
  ) {
    super('bills', ['bank', 'expenses'], repository);
  }

  async seed({
    user,
    bankList,
    expenseList,
  }: {
    user: User;
    bankList: Array<Bank>;
    expenseList: Array<Expense>;
  }) {
    console.info('# => start bank seeding');
    const existingBills = await this.repository.find({ withDeleted: true });
    const existingIds = new Set(existingBills?.map((bill) => bill.id));

    const billsToCreate = BILL_LIST_FIXTURE.filter(
      (bill) => !existingIds.has(bill.id),
    );

    if (billsToCreate.length === 0) {
      console.info('# => No new bills to seed');
      return existingBills;
    }

    const createdBills = await Promise.all(
      billsToCreate.map(async (bill) => {
        const bank = this.getRelation<Bank>(bankList, 'Bank', bill?.bank?.name);
        const expenses = this.getRelations<Expense>(
          expenseList,
          'Expense',
          bill?.expenses,
        );
        const currentBill = this.billBusiness.initialize({
          ...bill,
          user,
          bank,
          expenses,
        });
        return await this.repository.save(currentBill);
      }),
    );

    console.info(`# => Seeded ${createdBills.length} new bills`);
    return [...existingBills, ...createdBills].filter(
      (bill): bill is Bill => bill !== undefined,
    );
  }

  private getRelation<T extends { name: string }>(
    list: Array<T>,
    relation: string,
    name: string,
  ) {
    const item = list?.find((item) => item.name === name);
    if (!item) {
      throw this.error(
        new ConflictException(
          `The selected ${relation} does not exist, try another one or create one.`,
        ),
      );
    }
    return item;
  }

  private getRelations<T extends { id: string }>(
    list: Array<T>,
    relation: string,
    entityList?: Array<T>,
  ) {
    if (!entityList || entityList.length === 0) {
      return [];
    }

    const matchingRelations = list.filter((item) =>
      entityList.some((entity) => entity.id === item.id),
    );

    if (matchingRelations.length === 0) {
      throw this.error(
        new ConflictException(
          `No matching ${relation} found between the provided lists.`,
        ),
      );
    }

    return matchingRelations;
  }
}
