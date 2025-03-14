import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import BillBusiness from '@repo/business/finance/bill/billBusiness';

import { BILL_LIST_FIXTURE } from '@repo/mock/finance/bill/fixtures/bill';
import { BILL_EXPENSES_FIXTURES } from '@repo/mock/finance/bill-expenses/fixtures/fixtures';

import { Service } from '../../shared';
import { Bill } from './bill.entity';
import { Bank } from '../bank/bank.entity';
import { Finance } from '../finance.entity';
import { Expense } from '../expense/expense.entity';

@Injectable()
export class BillService extends Service<Bill> {
  constructor(
    @InjectRepository(Bill)
    protected repository: Repository<Bill>,
    protected billBusiness: BillBusiness,
  ) {
    super('bills', ['bank', 'finance', 'expenses'], repository);
  }

  async seed({
    finance,
    bankList,
  }: {
    finance: Finance;
    bankList: Array<Bank>;
  }) {
    return this.seedEntities({
      by: 'id',
      key: 'id',
      label: 'Bill',
      seeds: BILL_LIST_FIXTURE,
      createdEntityFn: async (item) => {
        const bank = this.getRelation<Bank>({
          key: 'name',
          list: bankList,
          param: item?.bank?.name,
          relation: 'Bank',
        });
        return this.billBusiness.initialize({
          ...item,
          bank,
          finance,
        });
      },
    });
  }

  async seedUnify(billsList: Array<Bill>, expenseList: Array<Expense>) {
    const updateBills = [];
    for (const bill of billsList) {
      const updateBill = await this.addExpenseToBill(bill, expenseList);
      updateBills.push(updateBill);
    }
    return updateBills;
  }

  private async addExpenseToBill(bill: Bill, expenseList: Array<Expense>) {
    const currentBill = await this.findOne({ value: bill.id });
    if (currentBill && currentBill.expenses.length > 0) {
      return currentBill;
    }
    const billSeed = BILL_EXPENSES_FIXTURES.find((item) => bill.id === item.id);
    if (!billSeed) {
      return bill;
    }
    const associatedExpenses = expenseList.filter((expense) =>
      billSeed.expenses.some((seedExpense) => seedExpense.id === expense.id),
    );
    if (associatedExpenses?.length === 0) {
      return bill;
    }

    return await this.repository.save({
      ...bill,
      expenses: associatedExpenses,
    });
  }
}
