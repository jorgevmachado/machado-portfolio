import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import ExpenseBusiness from '@repo/business/finance/expense/business';
import ExpenseConstructor from '@repo/business/finance/expense/expense';
import { EXPENSE_LIST_FIXTURE } from '@repo/business/finance/expense/fixtures/expense';
import type { InitializeExpenseParams } from '@repo/business/finance/expense/interface';

import { Service } from '../../../shared';

import { Supplier } from '../../supplier/supplier.entity';
import { SupplierService } from '../../supplier/supplier.service';

import { Bill } from '../bill.entity';

import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

import { Expense } from './expense.entity';

@Injectable()
export class ExpenseService extends Service<Expense> {
  constructor(
    @InjectRepository(Expense)
    protected repository: Repository<Expense>,
    protected supplierService: SupplierService,
    protected expenseBusiness: ExpenseBusiness,
  ) {
    super('expenses', ['supplier', 'bill'], repository);
  }

  async buildCreation(bill: Bill, createExpenseDto: CreateExpenseDto) {
    const supplier = await this.supplierService.treatEntityParam<Supplier>(
      createExpenseDto.supplier,
      'Supplier',
    );
    const name = `${bill.name} ${supplier.name}`;
    return new ExpenseConstructor({
      supplier,
      bill,
      year: bill.year,
      name,
      type: createExpenseDto.type,
      paid: createExpenseDto.paid,
      value: createExpenseDto.value,
      month: createExpenseDto.month,
      description: createExpenseDto.description,
      instalment_number: createExpenseDto.instalment_number,
    });
  }

  async initialize(params: InitializeExpenseParams) {
    const result = this.expenseBusiness.initialize(params);
    const expense = await this.saveExpense(result.expenseForCurrentYear);
    if (expense) {
      result.expenseForCurrentYear = expense;
    }
    return result;
  }

  async addExpenseForNextYear(
    bill: Bill,
    months: Array<string>,
    expense: Expense,
    existingExpense?: Expense,
  ) {
    const currentExpenseForNextYear = this.expenseBusiness.reinitialize({
      months,
      expense,
      existingExpense,
    });

    await this.saveExpense({
      ...currentExpenseForNextYear,
      bill,
    });
  }

  async buildUpdate(entity: Expense, updateExpenseDto: UpdateExpenseDto) {
    const supplier = !updateExpenseDto.supplier
      ? entity.supplier
      : await this.supplierService.treatEntityParam<Supplier>(
          updateExpenseDto.supplier,
          'Supplier',
        );

    const name = !updateExpenseDto.supplier
      ? entity.name
      : `${entity.bill.name} ${supplier.name}`;

    return this.expenseBusiness.merge({
      entity,
      expenseToMerge: {
        type: entity.type,
        name,
        ...updateExpenseDto,
        supplier,
        bill: entity.bill,
      },
    });
  }

  async saveExpense(expense: Expense) {
    const newExpense = this.expenseBusiness.calculateExpense(expense);
    return await this.save(newExpense);
  }

  async seed(supplierList: Array<Supplier>, billList: Array<Bill>) {
    return this.seeder.entities({
      by: 'id',
      key: 'id',
      label: 'Expense',
      seeds: EXPENSE_LIST_FIXTURE,
      withReturnSeed: true,
      createdEntityFn: async (item) => {
        const supplier = this.seeder.getRelation<Supplier>({
          key: 'name',
          list: supplierList,
          relation: 'Supplier',
          param: item?.supplier?.name,
        });
        const bill = billList.find((bill) => bill.id === item.bill?.id);
        return { ...item, supplier, bill };
      },
    });
  }
}
