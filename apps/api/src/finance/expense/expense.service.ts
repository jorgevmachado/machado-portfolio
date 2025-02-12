import {ConflictException, Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Service } from '../../shared';

import { CreateExpenseDto } from './dto/create-expense.dto';

import { Expense } from './expense.entity';
import { ExpenseGroupService } from './expense-group/expense-group.service';
import { ExpenseCategoryService } from './expense-category/expense-category.service';

@Injectable()
export class ExpenseService extends Service<Expense> {
  constructor(
    @InjectRepository(Expense)
    protected repository: Repository<Expense>,
    protected expenseGroupService: ExpenseGroupService,
    protected expenseCategoryService: ExpenseCategoryService,
  ) {
    super('expenses', ['group', 'supplier', 'category'], repository);
  }

  async create({}: CreateExpenseDto) {
    const expense = new Expense();
    return expense;
  }

  async seed() {
    const result = await this.expenseCategoryService.seed();
    if(!result) {
      throw this.error(new ConflictException('Error seeding expense categories'));
    }

    const expenseGroups = await this.expenseGroupService.seed();
    if(!expenseGroups) {
      throw this.error(new ConflictException('Error seeding expense groups'));
    }

    return {
      expenseCategoryTypes: result.expenseCategoryTypes,
      expenseCategories: result.expenseCategories,
      expenseGroups,
    };
  }
}
