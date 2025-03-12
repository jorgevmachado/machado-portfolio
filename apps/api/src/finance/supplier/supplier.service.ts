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
    this.validateListMock<Supplier>({ list: LIST_SUPPLIER_FIXTURE, key: 'all', label: 'Supplier' })
    const supplierTypes = await this.supplierTypeService.seed();
    console.info('# => start suppliers seeding');
    const existingSuppliers = await this.repository.find({ withDeleted: true });
    const existingNames = new Set(existingSuppliers.map((supplier) => supplier.name));

    const suppliersToCreate = LIST_SUPPLIER_FIXTURE.filter((supplier) => !existingNames.has(supplier.name));

    if(suppliersToCreate.length === 0) {
      console.info('# => No new Suppliers to seed');
      return {
        supplierTypes,
        suppliers: existingSuppliers
      }
    }

    const createdSuppliers = await Promise.all(suppliersToCreate.map(async (supplier) => {
      const type = supplierTypes?.find((type) => type.name === supplier?.type?.name);
      if (!type) {
        throw new ConflictException(
            'The selected Supplier Type does not exist, try another one or create one.',
        );
      }

      return this.create({
        name: supplier.name,
        type,
      });
    }));

    console.info(`# => Seeded ${createdSuppliers.length} new suppliers`);

    return {
      supplierTypes,
      suppliers: [...existingSuppliers, ...createdSuppliers].filter((supplier): supplier is Supplier => supplier !== undefined),
    };
  }

  async treatSupplierParam(supplier: string | Supplier) {
    return await this.treatEntityParam<Supplier>(supplier, 'Supplier');
  }
}
