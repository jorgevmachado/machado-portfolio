import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { isUUID } from '@repo/services/string/string';

import ExpenseBusiness from '@repo/business/finance/expense/expenseBusiness';

import { EXPENSE_LIST_FIXTURE } from '@repo/mock/finance/expense/fixtures/expense';

import { Service } from '../../shared';

import { Expense } from './expense.entity';
import { SupplierService } from '../supplier/supplier.service';
import { Supplier } from '../supplier/supplier.entity';
import { ExpenseListParams } from './expense.interface';
import { TQueryCondition } from '../../shared/interface';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { CreateExpenseDto } from './dto/create-expense.dto';

@Injectable()
export class ExpenseService extends Service<Expense> {
  constructor(
    @InjectRepository(Expense)
    protected repository: Repository<Expense>,
    protected supplierService: SupplierService,
    protected expenseBusiness: ExpenseBusiness,
  ) {
    super('expenses', ['group', 'supplier', 'category'], repository);
  }

  async findAll(params: ExpenseListParams) {
    const treatedParams = await this.treatsParams(params);
    return this.list(treatedParams);
  }

  private async treatsParams(params: ExpenseListParams) {
    params.filters = params.filters ?? [];

    const parameterMappings: Array<
      [string, () => Promise<string | undefined>]
    > = [
      [
        'supplier',
        () =>
          this.resolveEntityId(
            this.supplierService,
            params?.parameters?.supplier,
          ),
      ],
    ];

    for (const [filterKey, resolver] of parameterMappings) {
      const value = await resolver();
      if (value) {
        params.filters.push({ value, param: filterKey, condition: '=' });
      }
    }

    this.applySimpleFilters(params, ['paid', 'active'], '=');
    this.applyTypeFilter(params);

    return params;
  }

  private async resolveEntityId(
    service: { findOne: Function },
    value?: string,
  ) {
    if (!value) {
      return value;
    }

    if (isUUID(value)) {
      return value;
    }

    const entity = await service.findOne({ value: value, withThrow: false });
    return entity?.id;
  }

  private applySimpleFilters(
    params: ExpenseListParams,
    keys: Array<string>,
    condition: TQueryCondition,
  ) {
    const parameters = params.parameters || {};
    keys.forEach((key) => {
      if (parameters[key]) {
        params.filters.push({
          value: `${parameters[key]}`,
          param: key,
          condition,
        });
      }
    });
  }

  private applyTypeFilter(params: ExpenseListParams) {
    const type = params.parameters?.type;
    if (type === 'FIXED' || type === 'VARIABLE') {
      params.filters.push({ value: type, param: 'type', condition: '=' });
    }
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

    const entity = await this.findBySupplier(supplierEntity.id);

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

  private async findBySupplier(supplierId: string) {
    return await this.repository.findOne({
      where: {
        supplier: { id: supplierId },
      },
      relations: ['supplier'],
    });
  }

  async seed(suppliers: Array<Supplier>) {
    console.info('# => start expense seeding');
    const existingExpenses = await this.repository.find({ withDeleted: true });
    const existingIds = new Set(existingExpenses?.map((expense) => expense.id));

    const expensesToCreate = EXPENSE_LIST_FIXTURE.filter(
      (expense) => !existingIds.has(expense.id),
    );

    if (expensesToCreate.length === 0) {
      console.info('# => No new Expenses to seed');
      return existingExpenses;
    }

    const createdExpenses = await Promise.all(
      expensesToCreate.map(async (expense) => {
        const supplier = this.getRelation<Supplier>(
          suppliers,
          'Supplier',
          expense?.supplier?.name,
        );
        return await this.repository.save({ ...expense, supplier });
      }),
    );

    console.info(`# => Seeded ${createdExpenses.length} new expenses`);
    return [...existingExpenses, ...createdExpenses].filter(
      (expense): expense is Expense => expense !== undefined,
    );
  }

  private getRelation<T extends { name: string }>(
    list: Array<T>,
    relation: string,
    name: string,
  ) {
    const item = list?.find((item) => item.name === name);
    if (!item) {
      throw this.error(
        new ConflictException(
          `The selected ${relation} does not exist, try another one or create one.`,
        ),
      );
    }
    return item;
  }
}