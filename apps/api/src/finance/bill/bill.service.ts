import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import BillBusiness from '@repo/business/finance/bill/billBusiness';

import { BILL_LIST_FIXTURE } from '@repo/business/finance/bill/fixtures/bill';

import { Service } from '../../shared';
import { Bill } from './bill.entity';
import { Bank } from '../bank/bank.entity';
import { Finance } from '../finance.entity';

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
    finance?: Finance;
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
          expenses: undefined,
        });
      },
    });
  }
}
