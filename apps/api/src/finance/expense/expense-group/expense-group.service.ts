import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LIST_EXPENSE_GROUP_FIXTURE } from '@repo/mock/finance/fixtures/expense/group/group';

import { Service } from '../../../shared';

import { CreateExpenseGroupDto } from './dto/create-expense-group.dto';
import { UpdateExpenseGroupDto } from './dto/update-expense-group.dto';

import { ExpenseGroup } from './expense-group.entity';

@Injectable()
export class ExpenseGroupService extends Service<ExpenseGroup> {
  constructor(
    @InjectRepository(ExpenseGroup)
    protected repository: Repository<ExpenseGroup>,
  ) {
    super('expense_groups', [], repository);
  }

  async create({ name }: CreateExpenseGroupDto) {
    const expenseGroup = new ExpenseGroup();
    expenseGroup.name = name;
    return await this.save(expenseGroup);
  }

  findAll() {
    return `This action returns all expenseGroup`;
  }

  update(id: number, updateExpenseGroupDto: UpdateExpenseGroupDto) {
    return `This action updates a #${id} expenseGroup`;
  }

  remove(id: number) {
    return `This action removes a #${id} expenseGroup`;
  }

  async seed() {
    return await Promise.all(
      LIST_EXPENSE_GROUP_FIXTURE.map(async (group) => {
        const result = await this.findOne({
          value: group.name,
          withThrow: false,
          withDeleted: true,
        });
        if (!result) {
          return await this.create(group);
        }
        return result;
      }),
    );
  }
}
