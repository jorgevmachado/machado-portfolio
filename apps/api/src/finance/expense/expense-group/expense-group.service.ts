import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import ExpenseGroupBusiness from '@repo/business/finance/expense-group/expenseGroup';

import { LIST_EXPENSE_GROUP_FIXTURE } from '@repo/mock/finance/expense-group/fixtures/expenseGroup';

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
    const expenseGroup = new ExpenseGroupBusiness({ name });
    return await this.save(expenseGroup);
  }

  async update(param: string, { name }: UpdateExpenseGroupDto) {
    const result = await this.findOne({ value: param });
    const expenseGroup = new ExpenseGroupBusiness({ ...result, name });
    return this.save(expenseGroup);
  }

  async remove(param: string) {
    const result = await this.findOne({
      value: param,
      withDeleted: true,
      relations: ['categories'],
    });
    if (result?.expenses?.length) {
      throw this.error(
        new ConflictException(
          'You cannot delete the expense group because it is already in use.',
        ),
      );
    }
    await this.repository.softRemove(result);
    return { message: 'Successfully removed' };
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

  async treatExpenseGroupParam(group?: string | ExpenseGroup) {
    return await this.treatEntityParam<ExpenseGroup>(group, 'Expense Group');
  }
}
