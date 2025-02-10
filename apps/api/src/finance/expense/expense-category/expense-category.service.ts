import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LIST_EXPENSE_CATEGORY_FIXTURE } from '@repo/mock/finance/fixtures/expense/category/category';

import { Service } from '../../../shared';

import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { UpdateExpenseCategoryDto } from './dto/update-expense-category.dto';
import { ExpenseCategory } from './expense-category.entity';
import { ExpenseCategoryTypeService } from './expense-category-type/expense-category-type.service';
import { ExpenseCategoryType } from './expense-category-type/expense-category-type.entity';

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
    const expenseCategory = new ExpenseCategory();
    expenseCategory.name = name;
    expenseCategory.type = await this.getExpenseCategoryType(type);
    return await this.save(expenseCategory);
  }

  private async getExpenseCategoryType(type: string | ExpenseCategoryType) {
    this.validateExpenseCategoryType(type);
    if (this.isExpenseCategoryType(type)) {
      return type;
    }
    const expenseCategoryType = await this.expenseCategoryTypeService.findOne({
      value: type,
    });
    this.validateExpenseCategoryType(expenseCategoryType);
    return expenseCategoryType;
  }

  private validateExpenseCategoryType(type: string | ExpenseCategoryType) {
    if (!type) {
      throw new Error(
        'The selected Expense Category Type does not exist, try another one or create one.',
      );
    }
  }

  private isExpenseCategoryType(value: any): value is ExpenseCategoryType {
    return typeof value === 'object' && 'id' in value && 'name' in value;
  }

  findAll() {
    return `This action returns all expenseCategory`;
  }

  update(id: number, updateExpenseCategoryDto: UpdateExpenseCategoryDto) {
    return `This action updates a #${id} expenseCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} expenseCategory`;
  }

  async seed() {
    const expenseCategoryTypes = await this.expenseCategoryTypeService.seed();
    if(!expenseCategoryTypes) {
      throw Error('Error seeding expense category types');
    }
    const expenseCategories = (await Promise.all(
      LIST_EXPENSE_CATEGORY_FIXTURE.map(async (category) => {

        const result = await this.findOne({ value: category.name, withThrow: false, withDeleted: true });

        if(!result) {
          const type = expenseCategoryTypes.find(
              (type) => type.name === category.type.name,
          );
          if (!type) {
            throw new Error(
                'The selected Expense Category Type does not exist, try another one or create one.',
            );
          }
          return this.create({
            name: category.name,
            type: type,
          });
        }

        return result;
      }),
    )).filter((category): category is ExpenseCategory => category !== undefined);

    if(!expenseCategories) {
      throw Error('Error seeding expense categories');
    }

    return {
      expenseCategoryTypes,
      expenseCategories,
    };
  }
}
