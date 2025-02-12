import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LIST_SUPPLIER_FIXTURE } from '@repo/mock/finance/fixtures/supplier/supplier';

import { Service } from '../../shared';

import { Supplier } from './supplier.entity';
import { SupplierTypeService } from './supplier-type/supplier-type.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { SupplierType } from './supplier-type/supplierType.entity';
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
    const supplier = new Supplier();
    supplier.name = name;
    supplier.type = await this.getSupplierType(type);
    return await this.save(supplier);
  }

  async update(param: string, { name, type }: UpdateSupplierDto) {
    const result = await this.findOne({ value: param });
    const supplierType = !type ? result.type : await this.getSupplierType(type);
    result.name = name;
    result.type = supplierType;
    return this.save(result);
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

  private async getSupplierType(
    type: string | SupplierType,
  ): Promise<SupplierType> {
    this.validateSupplierType(type);
    if (this.isSupplierType(type)) {
      return type;
    }
    const supplierType = await this.supplierTypeService.findOne({
      value: type,
    });
    this.validateSupplierType(supplierType);
    return supplierType;
  }

  private validateSupplierType(type: string | SupplierType) {
    if (!type) {
      throw this.error(
        new ConflictException(
          'The selected Supplier Type does not exist, try another one or create one.',
        ),
      );
    }
  }

  private isSupplierType(value: any): value is SupplierType {
    return typeof value === 'object' && 'id' in value && 'name' in value;
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
              (type) => type.name === supplier.type.name,
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
}
