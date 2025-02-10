import { Injectable } from '@nestjs/common';
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
    const expenseGroups = await this.expenseGroupService.seed();
    if(!expenseGroups) {
      throw Error('Error seeding expense groups');
    }
    const expenseCategories = await this.expenseCategoryService.seed();
    if(!expenseCategories) {
      throw Error('Error seeding expense categories');
    }
    return {
      expenseGroups,
      expenseCategories,
    };
  }
}
