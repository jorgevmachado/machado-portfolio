import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import BillBusiness from '@repo/business/finance/bill/billBusiness';
import { BILL_LIST_FIXTURE } from '@repo/business/finance/bill/fixtures/bill';

import { Service } from '../../shared';
import { ListParams } from '../../shared/interface';

import { AuthService } from '../../auth/auth.service';
import { User } from '../../auth/users/user.entity';

import { Bill } from './bill.entity';
import { Bank } from '../bank/bank.entity';
import { Finance } from '../finance.entity';
import { BillCategory } from './bill-category/bill-category.entity';
import { BillCategoryService } from './bill-category/bill-category.service';

@Injectable()
export class BillService extends Service<Bill> {
  constructor(
    @InjectRepository(Bill)
    protected repository: Repository<Bill>,
    protected billBusiness: BillBusiness,
    protected readonly billCategoryService: BillCategoryService,
    private readonly authService: AuthService,
  ) {
    super('bills', ['bank', 'category', 'finance', 'expenses'], repository);
  }

  async findAll(user: User, params: ListParams) {
    const currentUser = await this.authService.findOne(user.id, user);
    if (!currentUser.finance) {
      throw this.error(
        new ConflictException(
          'Finance is not initialized, please start it to access this feature.',
        ),
      );
    }

    return await this.list({
      ...params,
      filters: [
        {
          value: currentUser.finance.id,
          param: 'finance',
          condition: '=',
        },
      ],
    });
  }

  async seed({
    finance,
    bankList,
  }: {
    finance?: Finance;
    bankList: Array<Bank>;
  }) {
    const billCategoryList = (await this.billCategoryService.seed()).filter(
      (category): category is BillCategory => !!category,
    );
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
        const category = this.getRelation<BillCategory>({
          key: 'name',
          list: billCategoryList,
          param: item?.category?.name,
          relation: 'BillCategory',
        });
        return this.billBusiness.initialize({
          ...item,
          bank,
          finance,
          category,
          expenses: undefined,
        });
      },
    });
  }
}
