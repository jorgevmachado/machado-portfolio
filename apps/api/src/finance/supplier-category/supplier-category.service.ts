import { Injectable } from '@nestjs/common';
import { Service } from '../../shared';
import { SupplierCategory } from './supplierCategory.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupplierType } from '../supplier-type/supplierType.entity';
import { LIST_SUPPLIER_CATEGORY_FIXTURE } from '@repo/mock/finance/fixtures/supplier/category/category';

@Injectable()
export class SupplierCategoryService extends Service<SupplierCategory> {
  constructor(
    @InjectRepository(SupplierCategory)
    protected repository: Repository<SupplierCategory>,
  ) {
    super('supplier_categories', ['type'], repository);
  }

  async create(name: string, type?: SupplierType) {
    if (!type) {
      throw new Error(
        'The selected Supplier Type does not exist, try another one or create one.',
      );
    }
    const supplierCategory = new SupplierCategory();
    supplierCategory.name = name;
    supplierCategory.type = type;
    return await this.save(supplierCategory);
  }

  async seed(supplierTypes: Array<SupplierType>) {
    return Promise.all(LIST_SUPPLIER_CATEGORY_FIXTURE.map((category) => {
      const supplierType = supplierTypes.find((type) => type.name === category.type.name);
      if (!supplierType) {
        throw new Error('The selected Supplier Type does not exist, try another one or create one.');
      }
      return this.create(category.name, supplierType);
    }));
  }
}
