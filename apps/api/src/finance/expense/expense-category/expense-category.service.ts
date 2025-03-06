import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import ExpenseCategoryBusiness from '@repo/business/finance/expense-category/expenseCategory';

import { LIST_EXPENSE_CATEGORY_FIXTURE } from '@repo/mock/finance/expense-category/fixtures/expenseCategory';

import { Service } from '../../../shared';

import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { UpdateExpenseCategoryDto } from './dto/update-expense-category.dto';
import { ExpenseCategory } from './expense-category.entity';
import { ExpenseCategoryTypeService } from './expense-category-type/expense-category-type.service';

@Injectable()
export class ExpenseCategoryService extends Service<ExpenseCategory> {
  constructor(
    @InjectRepository(ExpenseCategory)
    protected repository: Repository<ExpenseCategory>,
    protected expenseCategoryTypeService: ExpenseCategoryTypeService,
  ) {
    super('expense_categories', ['type'], repository);
  }
  async create({ name, type }: CreateExpenseCategoryDto) {
    const currentType =
      await this.expenseCategoryTypeService.treatExpenseCategoryTypeParam(type);
    const expenseCategory = new ExpenseCategoryBusiness({
      name,
      type: currentType,
    });
    expenseCategory.name = name;

    return await this.save(expenseCategory);
  }

  async update(param: string, { name, type }: UpdateExpenseCategoryDto) {
    const result = await this.findOne({ value: param });
    const expenseCategoryType = !type
      ? result.type
      : await this.expenseCategoryTypeService.treatExpenseCategoryTypeParam(
          type,
        );
    const expenseCategory = new ExpenseCategoryBusiness({
      name,
      type: expenseCategoryType,
    });
    return this.save(expenseCategory);
  }

  async remove(param: string) {
    const result = await this.findOne({
      value: param,
      withDeleted: true,
      relations: ['expenses'],
    });

    if (result?.expenses?.length) {
      throw this.error(
        new ConflictException(
          'You cannot delete the expense category because it is already in use.',
        ),
      );
    }
    await this.repository.softRemove(result);
    return { message: 'Successfully removed' };
  }

  async seed() {
    const expenseCategoryTypes = await this.expenseCategoryTypeService.seed();
    console.info('# => start expense categories seeding');
    const existingExpenseCategories = await this.repository.find({ withDeleted: true });

    const existingNames = new Set(existingExpenseCategories.map((category) => category.name));

    const expenseCategoriesToCreate = LIST_EXPENSE_CATEGORY_FIXTURE.filter((category) => !existingNames.has(category.name));

    if(expenseCategoriesToCreate.length === 0) {
      console.info('# => No new Expense Categories to seed');
      return {
        expenseCategoryTypes,
        expenseCategories: existingExpenseCategories
      }
    }

    const createdExpenseCategories = await Promise.all(expenseCategoriesToCreate.map(async (category) => {
      const type = expenseCategoryTypes?.find((type) => type.name === category?.type?.name);
      if (!type) {
        throw new ConflictException(
            'The selected Expense Category Type does not exist, try another one or create one.',
        );
      }

      return this.create({
        name: category.name,
        type
      })
    }));

    console.info(`# => Seeded ${createdExpenseCategories.length} new Expense Categories`);

    return {
      expenseCategoryTypes,
      expenseCategories: [...existingExpenseCategories, ...createdExpenseCategories].filter((category): category is ExpenseCategory => category !== undefined),
    }
  }

  async treatExpenseCategoryParam(category: string | ExpenseCategory) {
    return await this.treatEntityParam<ExpenseCategory>(
      category,
      'Expense Category',
    );
  }
}
