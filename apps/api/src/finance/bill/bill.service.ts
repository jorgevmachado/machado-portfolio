import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { snakeCaseToNormal } from '@repo/services/string/string';

import BillBusiness from '@repo/business/finance/bill/billBusiness';
import { BILL_LIST_FIXTURE } from '@repo/business/finance/bill/fixtures/bill';

import { Service } from '../../shared';

import type { ListParams } from '../../shared/queries';

import { Finance } from '../finance.entity';
import { Bank } from '../bank/bank.entity';
import { BankService } from '../bank/bank.service';

import { Expense } from './expense/expense.entity';
import { ExpenseService } from './expense/expense.service';
import { BillCategory } from './bill-category/bill-category.entity';
import { BillCategoryService } from './bill-category/bill-category.service';
import { Bill } from './bill.entity';

import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update.bill.dto';
import { Supplier } from '../supplier/supplier.entity';

@Injectable()
export class BillService extends Service<Bill> {
  constructor(
    @InjectRepository(Bill)
    protected repository: Repository<Bill>,
    protected billBusiness: BillBusiness,
    protected readonly bankService: BankService,
    protected readonly billCategoryService: BillCategoryService,
    protected readonly expenseService: ExpenseService,
  ) {
    super(
      'bills',
      ['bank', 'category', 'finance', 'expenses', 'expenses.supplier'],
      repository,
    );
  }

  async create(finance: Finance, createBillDto: CreateBillDto) {
    const bank = await this.bankService.treatEntityParam<Bank>(
      createBillDto.bank,
      'Bank',
    );

    const category =
      await this.billCategoryService.treatEntityParam<BillCategory>(
        createBillDto.category,
        'Bill Category',
      );

    const name = `${category.name} ${snakeCaseToNormal(createBillDto.type)}`;

    const expenses = await Promise.all(
      await this.expenseService.treatEntitiesParams<Expense>(
        createBillDto.expenses,
        'Expense',
      ),
    );

    const bill = this.billBusiness.initialize({
      name,
      year: createBillDto.year,
      type: createBillDto.type,
      finance,
      bank,
      category,
      expenses,
    });

    return await this.save(bill);
  }

  async update(finance: Finance, param: string, updateBillDto: UpdateBillDto) {
    const result = await this.findOne({ value: param });

    const bank = !updateBillDto.bank
      ? result.bank
      : await this.bankService.treatEntityParam<Bank>(
          updateBillDto.bank,
          'Bank',
        );

    const category = !updateBillDto.category
      ? result.category
      : await this.billCategoryService.treatEntityParam<BillCategory>(
          updateBillDto.category,
          'Bill Category',
        );

    const expenses = !updateBillDto.expenses
      ? result.expenses
      : await Promise.all(
          await this.expenseService.treatEntitiesParams<Expense>(
            updateBillDto.expenses,
            'Expense',
          ),
        );
    const year = !updateBillDto.year ? result.year : updateBillDto.year;
    const type = !updateBillDto.type ? result.type : updateBillDto.type;
    const name =
      !updateBillDto.category && !updateBillDto.type
        ? result.name
        : `${category.name} ${snakeCaseToNormal(type)}`;

    const bill = this.billBusiness.initialize({
      ...result,
      name,
      year,
      type,
      bank,
      finance,
      category,
      expenses,
    });
    return await this.save(bill);
  }

  async findAllBills(finance: Finance, params: ListParams) {
    return await this.queries.list({
      ...params,
      filters: [
        {
          value: finance.id,
          param: 'finance',
          condition: '=',
        },
      ],
    });
  }

  async remove(param: string) {
    const result = await this.findOne({
      value: param,
      relations: this.relations,
    });
    if (result?.expenses?.length) {
      throw this.error(
        new ConflictException(
          'You cannot delete this bill because it is already in use.',
        ),
      );
    }
    await this.repository.softRemove(result);
    return { message: 'Successfully removed' };
  }

  async seed({
    finance,
    bankList,
    billCategoryList,
  }: {
    finance?: Finance;
    bankList: Array<Bank>;
    billCategoryList?: Array<BillCategory>;
  }) {
    const billCategories = await this.billCategorySeed(billCategoryList);
    return this.seeder.entities({
      by: 'id',
      key: 'id',
      label: 'Bill',
      seeds: BILL_LIST_FIXTURE,
      withReturnSeed: true,
      createdEntityFn: async (item) => {
        const bank = this.seeder.getRelation<Bank>({
          key: 'name',
          list: bankList,
          param: item?.bank?.name,
          relation: 'Bank',
        });
        const category = this.seeder.getRelation<BillCategory>({
          key: 'name',
          list: billCategories,
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

  async billCategorySeed(billCategoryList?: Array<BillCategory>) {
    if (!billCategoryList) {
      return (
        (await this.billCategoryService.seed()) as Array<BillCategory>
      ).filter((category): category is BillCategory => !!category);
    }
    return billCategoryList;
  }

  async expenseSeed(supplierList: Array<Supplier>, billList: Array<Bill>) {
    return (
      (await this.expenseService.seed(supplierList, billList)) as Array<Expense>
    ).filter((expense): expense is Expense => !!expense);
  }
}
