import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import BillCategoryBusiness from '@repo/business/finance/bill-category/billCategory';
import { BILL_CATEGORY_LIST_FIXTURE } from '@repo/business/finance/bill-category/fixtures/billCategory';

import { Service } from '../../../shared';

import { CreateBillCategoryDto } from './dto/create-bill-category.dto';
import { UpdateBillCategoryDto } from './dto/update-bill-category.dto';

import { BillCategory } from './bill-category.entity';

@Injectable()
export class BillCategoryService extends Service<BillCategory> {
  constructor(
    @InjectRepository(BillCategory)
    protected repository: Repository<BillCategory>,
  ) {
    super('bill_categories', [], repository);
  }

  async create({ name }: CreateBillCategoryDto) {
    const billCategory = new BillCategoryBusiness({ name });
    return await this.save(billCategory);
  }

  async update(param: string, { name }: UpdateBillCategoryDto) {
    const result = await this.findOne({ value: param, withDeleted: true });
    const billCategory = new BillCategoryBusiness({ ...result, name });
    return await this.save(billCategory);
  }

  async remove(param: string) {
    const result = await this.findOne({
      value: param,
      relations: ['bills'],
      withDeleted: true,
    });
    if (result.bills.length) {
      throw this.error(
        new ConflictException(
          'You cannot delete the bill category because it is already in use.',
        ),
      );
    }
    await this.repository.softRemove(result);
    return { message: 'Successfully removed' };
  }

  async seed(withReturnSeed: boolean = true) {
    return this.seedEntities({
      by: 'name',
      key: 'all',
      label: 'Bill Category',
      seeds: BILL_CATEGORY_LIST_FIXTURE,
      withReturnSeed,
      createdEntityFn: async (item) => item,
    });
  }

  async treatBillCategoryParam(billCategory: string | BillCategory) {
    return await this.treatEntityParam<BillCategory>(
      billCategory,
      'Bill Category',
    );
  }
}
