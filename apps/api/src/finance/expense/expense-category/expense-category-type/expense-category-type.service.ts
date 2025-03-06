import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LIST_EXPENSE_CATEGORY_TYPE_FIXTURE } from '@repo/mock/finance/expense-category-type/fixtures/expenseCategoryType';
import ExpenseCategoryTypeBusiness from '@repo/business/finance/expense-category-type/expenseCategoryType';

import { Service } from '../../../../shared';

import { CreateExpenseCategoryTypeDto } from './dto/create-expense-category-type.dto';
import { UpdateExpenseCategoryTypeDto } from './dto/update-expense-category-type.dto';
import { ExpenseCategoryType } from './expense-category-type.entity';

@Injectable()
export class ExpenseCategoryTypeService extends Service<ExpenseCategoryType> {
  constructor(
    @InjectRepository(ExpenseCategoryType)
    protected repository: Repository<ExpenseCategoryType>,
  ) {
    super('expense_category_types', [], repository);
  }
  async create({ name }: CreateExpenseCategoryTypeDto) {
    const expenseCategoryType = new ExpenseCategoryTypeBusiness({ name });
    return await this.save(expenseCategoryType);
  }

  async update(param: string, { name }: UpdateExpenseCategoryTypeDto) {
    const result = await this.findOne({ value: param });
    const expenseCategoryType = new ExpenseCategoryTypeBusiness({
      ...result,
      name,
    });
    return this.save(expenseCategoryType);
  }

  async remove(param: string) {
    const result = await this.findOne({
      value: param,
      withDeleted: true,
      relations: ['categories'],
    });
    if (result?.categories?.length) {
      throw this.error(
        new ConflictException(
          'You cannot delete the expense category type because it is already in use.',
        ),
      );
    }
    await this.repository.softRemove(result);
    return { message: 'Successfully removed' };
  }

  async seed(): Promise<Array<ExpenseCategoryType>> {
    console.info('# => start expense category types seeding');
    const existingExpenseCategoryTypes = await this.repository.find({ withDeleted: true });

    const existingNames = new Set(existingExpenseCategoryTypes.map((category) => category.name));

    const expenseCategoryTypesToCreate = LIST_EXPENSE_CATEGORY_TYPE_FIXTURE.filter((type) => !existingNames.has(type.name));

    if (expenseCategoryTypesToCreate.length === 0) {
      console.info('# => No new expense category types to seed');
      return existingExpenseCategoryTypes;
    }

    const createdExpenseCategoryTypes = (await Promise.all(expenseCategoryTypesToCreate.map((type) => this.create(type)))).filter((type): type is ExpenseCategoryType => !!type);
    console.info(`# => Seeded ${createdExpenseCategoryTypes.length} new expense category types`);
    return [...existingExpenseCategoryTypes, ...createdExpenseCategoryTypes];
  }

  async treatExpenseCategoryTypeParam(type: string | ExpenseCategoryType) {
    return await this.treatEntityParam<ExpenseCategoryType>(
      type,
      'Expense Category Type',
    );
  }
}
