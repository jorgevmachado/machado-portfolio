import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import ExpenseBusiness from '@repo/business/finance/expense/expenseBusiness';

import { Service } from '../../shared';

import { CreateExpenseDto } from './dto/create-expense.dto';

import { Expense } from './expense.entity';
import { ExpenseGroupService } from './expense-group/expense-group.service';
import { ExpenseCategoryService } from './expense-category/expense-category.service';
import { SupplierService } from '../supplier/supplier.service';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { isUUID } from '@repo/services/string/string';

@Injectable()
export class ExpenseService extends Service<Expense> {
  constructor(
    @InjectRepository(Expense)
    protected repository: Repository<Expense>,
    protected expenseGroupService: ExpenseGroupService,
    protected expenseCategoryService: ExpenseCategoryService,
    protected supplierService: SupplierService,
    protected expenseBusiness: ExpenseBusiness,
  ) {
    super('expenses', ['group', 'supplier', 'category'], repository);
  }

  async create({
    user,
    year,
    type,
    paid,
    value,
    month,
    group,
    supplier,
    category,
    description,
    instalment_number,
  }: CreateExpenseDto) {
    const expenseGroupEntity =
      await this.expenseGroupService.treatExpenseGroupParam(group);

    const supplierEntity =
      await this.supplierService.treatSupplierParam(supplier);

    const entity = await this.findByGroupAndSupplier(
      expenseGroupEntity.id,
      supplierEntity.id,
    );

    const expenseCategoryEntity = !entity
      ? await this.expenseCategoryService.treatExpenseCategoryParam(category)
      : entity.category;

    const newExpense = this.expenseBusiness.initializeExpense({
      user,
      group: expenseGroupEntity,
      supplier: supplierEntity,
      category: expenseCategoryEntity,
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

    const { group, supplier, category, user } = updateExpenseDto;

    const expenseGroupEntity = !group ? result.group : await this.expenseGroupService.treatExpenseGroupParam(group);
    const expenseCategoryEntity = !category ? result.category : await this.expenseCategoryService.treatExpenseCategoryParam(category);
    const supplierEntity = !supplier ? result.supplier : await this.supplierService.treatSupplierParam(supplier);
    const userEntity = !user ? result.user : user;

    const newExpense = this.expenseBusiness.merge({
      entity: result,
      expenseToMerge: {
        type: result.type,
        ...updateExpenseDto,
        user: userEntity,
        group: expenseGroupEntity,
        supplier: supplierEntity,
        category: expenseCategoryEntity,
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

  private async findByGroupAndSupplier(groupId: string, supplierId: string) {
    return await this.repository.findOne({
      where: {
        group: { id: groupId },
        supplier: { id: supplierId },
      },
      relations: ['group', 'supplier'],
    });
  }

  async seed() {
    const result = await this.expenseCategoryService.seed();
    if (!result) {
      throw this.error(
        new ConflictException('Error seeding expense categories'),
      );
    }

    const expenseGroups = await this.expenseGroupService.seed();
    if (!expenseGroups) {
      throw this.error(new ConflictException('Error seeding expense groups'));
    }

    return {
      expenseCategoryTypes: result.expenseCategoryTypes,
      expenseCategories: result.expenseCategories,
      expenseGroups,
    };
  }
}