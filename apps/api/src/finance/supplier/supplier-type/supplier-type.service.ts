import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import SupplierTypeBusiness from '@repo/business/finance/supplier-type/supplierType';

import { LIST_SUPPLIER_TYPE_FIXTURE } from '@repo/mock/finance/fixtures/supplier-type/supplierType';

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
    const supplierType = new SupplierTypeBusiness({ name });
    return await this.save(supplierType);
  }

  async update(param: string, { name }: UpdateSupplierTypeDto) {
    const result = await this.findOne({ value: param, withDeleted: true });
    const supplierType = new SupplierTypeBusiness({
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
    if (result.suppliers.length) {
      throw this.error(
        new ConflictException(
          'You cannot delete the supplier type because it is already in use.',
        ),
      );
    }
    await this.repository.softRemove(result);
    return { message: 'Successfully removed' };
  }

  async seed(): Promise<Array<SupplierType>> {
    return (await Promise.all(
      LIST_SUPPLIER_TYPE_FIXTURE.map(async (type) => {
        const result = await this.findOne({
          value: type.name,
          withThrow: false,
          withDeleted: true,
        });
        if (!result) {
          return await this.create(type);
        }
        return result;
      }),
    )) as Array<SupplierType>;
  }

  async treatSupplierTypeParam(supplierType: string | SupplierType) {
    return await this.treatEntityParam<SupplierType>(
      supplierType,
      'Supplier Type',
    );
  }
}
