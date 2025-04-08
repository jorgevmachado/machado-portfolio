import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import SupplierConstructor from '@repo/business/finance/supplier/supplier';

import { SUPPLIER_LIST_FIXTURE } from '@repo/business/finance/supplier/fixtures/supplier';

import { Service } from '../../shared';

import { Supplier } from './supplier.entity';
import { SupplierTypeService } from './supplier-type/supplier-type.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { SupplierType } from './supplier-type/supplierType.entity';

@Injectable()
export class SupplierService extends Service<Supplier> {
  constructor(
    @InjectRepository(Supplier)
    protected repository: Repository<Supplier>,
    protected supplierTypeService: SupplierTypeService,
  ) {
    super('suppliers', ['type'], repository);
  }

  async create({ name, type }: CreateSupplierDto) {
    const supplierType =
      await this.supplierTypeService.treatEntityParam<SupplierType>(
        type,
        'Supplier Type',
      );
    const supplier = new SupplierConstructor({
      name,
      type: supplierType,
    });
    return await this.save(supplier);
  }

  async update(param: string, { name, type }: UpdateSupplierDto) {
    const result = await this.findOne({ value: param });
    const supplierType = !type
      ? result.type
      : await this.supplierTypeService.treatEntityParam<SupplierType>(
          type,
          'Supplier Type',
        );
    const supplier = new SupplierConstructor({
      name,
      type: supplierType,
    });
    return await this.save(supplier);
  }

  async remove(param: string, withDeleted: boolean = false) {
    const result = await this.findOne({
      value: param,
      relations: ['expenses'],
      withDeleted,
    });
    if (result?.expenses?.length) {
      throw this.error(
        new ConflictException(
          'You cannot delete the supplier because it is already in use.',
        ),
      );
    }
    await this.repository.softRemove(result);
    return { message: 'Successfully removed' };
  }

  async seed(withReturnSeed: boolean = true) {
    const supplierTypeList = (
      (await this.supplierTypeService.seed()) as Array<SupplierType>
    ).filter((type): type is SupplierType => !!type);
    return this.seeder.entities({
      by: 'name',
      key: 'all',
      label: 'Supplier',
      seeds: SUPPLIER_LIST_FIXTURE,
      withReturnSeed,
      createdEntityFn: async (data) => {
        const type = this.seeder.getRelation<SupplierType>({
          key: 'name',
          list: supplierTypeList,
          param: data?.type?.name,
          relation: 'SupplierType',
        });
        return new SupplierConstructor({
          name: data.name,
          type,
        });
      },
    });
  }
}
