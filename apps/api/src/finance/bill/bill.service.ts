import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import BillBusiness from '@repo/business/finance/bill/billBusiness';

import { BILL_LIST_FIXTURE } from '@repo/business/finance/bill/fixtures/bill';

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
    expenseList,
  }: {
    finance?: Finance;
    bankList: Array<Bank>;
    expenseList: Array<Expense>;
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
        const expenses = this.expenseRelations(item, expenseList);
        return this.billBusiness.initialize({
          ...item,
          bank,
          finance,
          expenses,
        });
      },
    });
  }

  private expenseRelations(
    bill: Bill,
    expenseList: Array<Expense>,
  ): Array<Expense> {
    const expenses: Array<Expense> = [];
    for (const expense of bill.expenses) {
      const currentExpense = expenseList.find((item) => item.id === expense.id);
      if (currentExpense) {
        expenses.push(currentExpense);
      }
    }
    return expenses;
  }
}
