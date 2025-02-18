import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import SupplierBusiness from '@repo/business/finance/supplier/supplier';

import { LIST_SUPPLIER_FIXTURE } from '@repo/mock/finance/supplier/fixtures/supplier';

import { Service } from '../../shared';

import { Supplier } from './supplier.entity';
import { SupplierTypeService } from './supplier-type/supplier-type.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

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
      await this.supplierTypeService.treatSupplierTypeParam(type);
    const supplier = new SupplierBusiness({
      name,
      type: supplierType,
    });
    return await this.save(supplier);
  }

  async update(param: string, { name, type }: UpdateSupplierDto) {
    const result = await this.findOne({ value: param });
    const supplierType = !type
      ? result.type
      : await this.supplierTypeService.treatSupplierTypeParam(type);
    const supplier = new SupplierBusiness({
      name,
      type: supplierType,
    });
    return await this.save(supplier);
  }

  async remove(param: string) {
    const result = await this.findOne({
      value: param,
      withDeleted: true,
      relations: ['expenses'],
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

  async seed() {
    const supplierTypes = await this.supplierTypeService.seed();
    const suppliers = (
      await Promise.all(
        LIST_SUPPLIER_FIXTURE.map(async (supplier) => {
          const result = await this.findOne({
            value: supplier.name,
            withThrow: false,
            withDeleted: true,
          });
          if (!result) {
            const type = supplierTypes.find(
              (type) => type.name === supplier?.type?.name,
            );
            if (!type) {
              throw this.error(
                new ConflictException(
                  'The selected Supplier Type does not exist, try another one or create one.',
                ),
              );
            }
            return this.create({
              name: supplier.name,
              type: type,
            });
          }
          return result;
        }),
      )
    ).filter((supplier): supplier is Supplier => supplier !== undefined);

    return {
      supplierTypes,
      suppliers,
    };
  }

  async treatSupplierParam(supplier: string | Supplier) {
    return await this.treatEntityParam<Supplier>(supplier, 'Supplier');
  }
}
