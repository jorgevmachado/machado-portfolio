import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { isUUID } from '@repo/services/string/string';

import ExpenseBusiness from '@repo/business/finance/expense/expenseBusiness';

import { EXPENSE_LIST_FIXTURE } from '@repo/mock/finance/expense/fixtures/expense';

import { Service } from '../../shared';

import { UpdateExpenseDto } from './dto/update-expense.dto';
import { CreateExpenseDto } from './dto/create-expense.dto';

import { Expense } from './expense.entity';
import { Supplier } from '../supplier/supplier.entity';
import { SupplierService } from '../supplier/supplier.service';

@Injectable()
export class ExpenseService extends Service<Expense> {
  constructor(
    @InjectRepository(Expense)
    protected repository: Repository<Expense>,
    protected supplierService: SupplierService,
    protected expenseBusiness: ExpenseBusiness,
  ) {
    super('expenses', ['supplier'], repository);
  }

  async create({
    year,
    type,
    paid,
    value,
    month,
    supplier,
    description,
    instalment_number,
  }: CreateExpenseDto) {
    const supplierEntity =
      await this.supplierService.treatSupplierParam(supplier);

    const entity = await this.repository.findOne({
      where: {
        supplier: { id: supplierEntity.id },
      },
      relations: ['supplier'],
    });

    const newExpense = this.expenseBusiness.initializeExpense({
      supplier: supplierEntity,
      ...entity,
      year,
      type,
      paid,
      value,
      month,
      description,
      instalment_number,
    });
    return await this.save(newExpense);
  }

  async update(id: string, updateExpenseDto: UpdateExpenseDto) {
    if (!isUUID(id)) {
      throw this.error(new ConflictException('Invalid ID'));
    }
    const result = await this.findOne({ value: id });

    const { supplier } = updateExpenseDto;

    const supplierEntity = !supplier
      ? result.supplier
      : await this.supplierService.treatSupplierParam(supplier);

    const newExpense = this.expenseBusiness.merge({
      entity: result,
      expenseToMerge: {
        type: result.type,
        ...updateExpenseDto,
        supplier: supplierEntity,
      },
      withAllCalculations: true,
    });

    return await this.save(newExpense);
  }

  async remove(id: string) {
    if (!isUUID(id)) {
      throw this.error(new ConflictException('Invalid ID'));
    }
    const result = await this.findOne({ value: id, withDeleted: true });

    await this.repository.softRemove(result);
    return { message: 'Successfully removed' };
  }

  async seed(supplierList: Array<Supplier>) {
    return this.seedEntities({
      by: 'id',
      key: 'id',
      label: 'Expense',
      seeds: EXPENSE_LIST_FIXTURE,
      createdEntityFn: async (item) => {
        const supplier = this.getRelation<Supplier>({
          key: 'name',
          list: supplierList,
          relation: 'Supplier',
          param: item?.supplier?.name,
        });
        return { ...item, supplier };
      },
    });
  }
}