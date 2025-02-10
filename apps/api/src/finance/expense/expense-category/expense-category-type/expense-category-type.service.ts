import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LIST_EXPENSE_CATEGORY_TYPE_FIXTURE } from '@repo/mock/finance/fixtures/expense/category/type/type';

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
  create(createExpenseCategoryTypeDto: CreateExpenseCategoryTypeDto) {
    const expenseCategoryType = new ExpenseCategoryType();
    expenseCategoryType.name = createExpenseCategoryTypeDto.name;
    return this.save(expenseCategoryType);
  }

  findAll() {
    return `This action returns all expenseCategoryType`;
  }

  update(
    param: string,
    updateExpenseCategoryTypeDto: UpdateExpenseCategoryTypeDto,
  ) {
    return `This action updates a #${param} expenseCategoryType`;
  }

  remove(id: number) {
    return `This action removes a #${id} expenseCategoryType`;
  }

  async seed(): Promise<Array<ExpenseCategoryType>> {
    return (await Promise.all(
      LIST_EXPENSE_CATEGORY_TYPE_FIXTURE.map(async (type) => {
        const result = await this.findOne({
          value: type.name,
          withThrow: false,
          withDeleted: true,
        });
        if (!result) {
          return (await this.create(type)) as ExpenseCategoryType;
        }
        return result;
      }),
    )) as Array<ExpenseCategoryType>;
  }


}
