import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import SupplierTypeConstructor from '@repo/business/finance/supplier-type/supplierType';

import { SUPPLIER_TYPE_LIST_FIXTURE } from '@repo/business/finance/supplier-type/fixtures/supplierType';

import { Service } from '../../../shared';

import { SupplierType } from './supplierType.entity';
import { CreateSupplierTypeDto } from './dto/create-supplier-type.dto';
import { UpdateSupplierTypeDto } from './dto/update-supplier-type.dto';

@Injectable()
export class SupplierTypeService extends Service<SupplierType> {
  constructor(
    @InjectRepository(SupplierType)
    protected repository: Repository<SupplierType>,
  ) {
    super('supplier_types', [], repository);
  }

  async create({ name }: CreateSupplierTypeDto) {
    const supplierType = new SupplierTypeConstructor({ name });
    return await this.save(supplierType);
  }

  async update(param: string, { name }: UpdateSupplierTypeDto) {
    const result = await this.findOne({ value: param, withDeleted: true });
    const supplierType = new SupplierTypeConstructor({
      ...result,
      name,
    });
    return this.save(supplierType);
  }

  async remove(param: string) {
    const result = await this.findOne({
      value: param,
      relations: ['suppliers'],
      withDeleted: true,
    });

    const suppliers = result?.suppliers?.filter((item) => !item.deleted_at);

    if (suppliers.length) {
      throw this.error(
        new ConflictException(
          'You cannot delete the supplier type because it is already in use.',
        ),
      );
    }
    await this.repository.softRemove(result);
    return { message: 'Successfully removed' };
  }

  async seed(withReturnSeed: boolean = true) {
    return this.seeder.entities({
      by: 'name',
      key: 'all',
      label: 'Supplier Type',
      seeds: SUPPLIER_TYPE_LIST_FIXTURE,
      withReturnSeed,
      createdEntityFn: async (item) => item,
    });
  }
}
