import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Service } from '../../shared';

import { Supplier } from './supplier.entity';
import { SupplierTypeService } from './supplier-type/supplier-type.service';
import { SupplierCategoryService } from './supplier-category/supplier-category.service';
import { SupplierCategory } from './supplier-category/supplierCategory.entity';
import { CreateSupplierDto } from './dto/create-supplier.dto';


@Injectable()
export class SupplierService extends Service<Supplier> {
  constructor(
    @InjectRepository(Supplier)
    protected repository: Repository<Supplier>,
    protected supplierTypeService: SupplierTypeService,
    protected supplierCategoryService: SupplierCategoryService,
  ) {
    super('suppliers', ['category'], repository);
  }

  async create({ name, category }: CreateSupplierDto) {
    const supplier = new Supplier();
    supplier.name = name;
    supplier.category = await this.getSupplierCategory(category);
    return await this.save(supplier);
  }

  private async getSupplierCategory(
    category: string | SupplierCategory,
  ): Promise<SupplierCategory> {
    this.validateSupplierCategory(category);
    if (this.isSupplierCategory(category)) {
      return category;
    }
    const supplierCategory = await this.supplierCategoryService.findOne({
      value: category,
    });
    this.validateSupplierCategory(supplierCategory);
    return supplierCategory;
  }

  private validateSupplierCategory(type: string | SupplierCategory) {
    if (!type) {
      throw new Error(
        'The selected Supplier Type does not exist, try another one or create one.',
      );
    }
  }

  private isSupplierCategory(value: any): value is SupplierCategory {
    return typeof value === 'object' && 'id' in value && 'name' in value;
  }

  async seeds() {
    const supplierTypes = await this.supplierTypeService.seed();
    const supplierCategories =
      await this.supplierCategoryService.seed(supplierTypes);

    console.log('supplierTypes => ', supplierTypes.length);
    console.log('supplierCategories => ', supplierCategories.length);
    return { message: 'Seeds Executed Successfully!!!' };
  }
}
