import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import ExpenseBusiness from '@repo/business/finance/expense/expenseBusiness';

import { Service } from '../../../shared';

import { SupplierService } from '../../supplier/supplier.service';

import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';

import { Expense } from './expense.entity';
import { Bill } from '../bill.entity';
import { Supplier } from '../../supplier/supplier.entity';
import { isUUID } from '@repo/services/string/string';
import { EXPENSE_LIST_FIXTURE } from '@repo/business/finance/expense/fixtures/expense';

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

  async create(bill: Bill, createExpenseDto: CreateExpenseDto) {
    const supplier = await this.supplierService.treatEntityParam<Supplier>(
      createExpenseDto.supplier,
      'Supplier',
    );
    const newExpense = this.expenseBusiness.initializeExpense({
      supplier,
      bill,
      year: bill.year,
      type: createExpenseDto.type,
      paid: createExpenseDto.paid,
      value: createExpenseDto.value,
      month: createExpenseDto.month,
      description: createExpenseDto.description,
      instalment_number: createExpenseDto.instalment_number,
    });
    return await this.save(newExpense);
  }

  async update(bill: Bill, id: string, updateExpenseDto: UpdateExpenseDto) {
    if (!isUUID(id)) {
      throw this.error(new ConflictException('Invalid ID'));
    }
    const entity = await this.findOne({ value: id });

    const supplier = !updateExpenseDto.supplier
      ? entity.supplier
      : await this.supplierService.treatEntityParam<Supplier>(
          updateExpenseDto.supplier,
          'Supplier',
        );

    const newExpense = this.expenseBusiness.merge({
      entity,
      expenseToMerge: {
        type: entity.type,
        ...updateExpenseDto,
        supplier,
        bill,
      },
      withAllCalculations: true,
    });

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
