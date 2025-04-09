import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { snakeCaseToNormal } from '@repo/services/string/string';

import BillBusiness from '@repo/business/finance/bill/business';
import { BILL_LIST_FIXTURE } from '@repo/business/finance/bill/fixtures/bill';

import { type FilterParams, Service } from '../../shared';

import type { ListParams } from '../../shared/queries';

import { Finance } from '../finance.entity';
import { Bank } from '../bank/bank.entity';
import { BankService } from '../bank/bank.service';

import { Supplier } from '../supplier/supplier.entity';

import { Expense } from './expense/expense.entity';
import { ExpenseService } from './expense/expense.service';
import { BillCategory } from './bill-category/bill-category.entity';
import { BillCategoryService } from './bill-category/bill-category.service';
import { Bill } from './bill.entity';

import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update.bill.dto';
import { CreateExpenseDto } from './expense/dto/create-expense.dto';
import { UpdateExpenseDto } from './expense/dto/update-expense.dto';
import { ExistExpenseInBill } from './bill.interface';

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

    return await this.saveBill(bill);
  }

  private async saveBill(bill: Bill, withThrow = true) {
    const existBill = await this.findOne({
      value: bill.name,
      filters: [
        {
          value: bill.year,
          param: 'year',
          condition: '=',
        },
      ],
      withThrow: false,
    });

    if (existBill) {
      if (withThrow) {
        throw new ConflictException(
          `Key (name)=(${bill.name}) already exists with this (year)=(${bill.year}).`,
        );
      }
      return existBill;
    }
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
    return await this.saveBill(bill);
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

  async addExpense(param: string, createExpenseDto: CreateExpenseDto) {
    const bill = await this.findOne({ value: param });

    const createdExpense = await this.expenseService.buildCreation(
      bill,
      createExpenseDto,
    );

    const existExpense = await this.existExpenseInBill({
      year: createdExpense.year,
      nameCode: createdExpense.name_code,
      withThrow: false,
    });

    const { type, value, month, instalment_number } = createExpenseDto;

    const {
      nextYear,
      requiresNewBill,
      monthsForNextYear,
      expenseForNextYear,
      expenseForCurrentYear,
    } = await this.expenseService.initialize({
      type,
      value,
      month,
      expense: !existExpense ? createdExpense : existExpense,
      instalment_number,
    });

    if (requiresNewBill) {
      const newBill = (await this.createNewBillForNextYear(
          nextYear,
          bill,
      )) as Bill;

      const existingExpense = await this.existExpenseInBill({
        year: nextYear,
        nameCode: expenseForNextYear.name_code,
        withThrow: false,
      });
      await this.expenseService.addExpenseForNextYear(newBill, monthsForNextYear, expenseForNextYear, existingExpense);
    }
    return expenseForCurrentYear;
  }

  private async existExpenseInBill({
    year,
    nameCode,
    withThrow = true,
    fallBackMessage = 'You cannot add this expense because it is already in use.',
  }: ExistExpenseInBill) {
    const filters: Array<FilterParams> = [
      {
        value: nameCode,
        param: 'expenses.name_code',
        relation: true,
        condition: 'LIKE',
      },
    ];
    if (year) {
      filters.push({
        value: year,
        param: 'expenses.year',
        relation: true,
        condition: '=',
      });
    }

    const result = (await this.findAll({ filters })) as Array<Bill>;

    if (withThrow && result.length) {
      throw this.error(new ConflictException(fallBackMessage));
    }

    return result[0]?.expenses[0];
  }

  private async createNewBillForNextYear(year: number, bill: Bill) {
    const newBill = this.billBusiness.initialize({
      ...bill,
      id: undefined,
      year,
      expenses: [],
    });

    return await this.saveBill(newBill, false);
  }

  async findOneExpense(param: string, expenseId: string) {
    const bill = await this.findOne({ value: param });
    return await this.expenseService.findOne({
      value: expenseId,
      filters: [
        {
          value: bill.id,
          param: 'bill',
          condition: '=',
        },
      ],
    });
  }

  async updateExpense(
    param: string,
    expenseId: string,
    updateExpenseDto: UpdateExpenseDto,
  ) {
    const expense = await this.findOneExpense(param, expenseId);
    const updatedExpense = await this.expenseService.buildUpdate(
      expense,
      updateExpenseDto,
    );

    if (expense.name_code !== updatedExpense.name_code) {
      await this.existExpenseInBill({
        year: updatedExpense.year,
        nameCode: updatedExpense.name_code,
        fallBackMessage: `You cannot update this expense with this (supplier) ${updatedExpense.supplier.name} because there is already an expense linked to this supplier.`,
      });
    }
    return await this.expenseService.saveExpense(updatedExpense);
  }

  async findAllExpense(param: string, params: ListParams) {
    const bill = await this.findOne({ value: param });
    return await this.expenseService.findAll({
      ...params,
      filters: [
        {
          value: bill.id,
          param: 'bill',
          condition: '=',
        },
      ],
    });
  }

  async removeExpense(param: string, expenseId: string) {
    const expense = await this.findOneExpense(param, expenseId);
    await this.expenseService.softRemove(expense);
    return { message: 'Successfully removed' };
  }
}
