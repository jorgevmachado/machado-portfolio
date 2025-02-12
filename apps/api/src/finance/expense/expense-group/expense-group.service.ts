import {ConflictException, Injectable} from '@nestjs/common';
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

  async update(param: string, { name }: UpdateExpenseGroupDto) {
    const result = await this.findOne({ value: param });
    result.name = name;
    return this.save(result);
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
}
