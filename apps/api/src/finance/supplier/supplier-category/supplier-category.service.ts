import { Injectable } from '@nestjs/common';
import { Service } from '../../../shared';
import { SupplierCategory } from './supplierCategory.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LIST_SUPPLIER_CATEGORY_FIXTURE } from '@repo/mock/finance/fixtures/supplier/category/category';

import { SupplierType } from '../supplier-type/supplierType.entity';
import { SupplierTypeService } from '../supplier-type/supplier-type.service';
import { CreateSupplierCategoryDto } from './dto/create-supplier-category.dto';

@Injectable()
export class SupplierCategoryService extends Service<SupplierCategory> {
  constructor(
    @InjectRepository(SupplierCategory)
    protected repository: Repository<SupplierCategory>,
    protected supplierTypeService: SupplierTypeService,
  ) {
    super('supplier_categories', ['type'], repository);
  }

  async create({ name, type }: CreateSupplierCategoryDto) {
    const supplierCategory = new SupplierCategory();
    supplierCategory.name = name;
    supplierCategory.type = await this.getSupplierType(type);
    return await this.save(supplierCategory);
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
      throw new Error(
        'The selected Supplier Type does not exist, try another one or create one.',
      );
    }
  }

  private isSupplierType(value: any): value is SupplierType {
    return typeof value === 'object' && 'id' in value && 'name' in value;
  }

  async seed(supplierTypes: Array<SupplierType>) {
    return Promise.all(
      LIST_SUPPLIER_CATEGORY_FIXTURE.map((category) => {
        const supplierType = supplierTypes.find(
          (type) => type.name === category.type.name,
        );
        if (!supplierType) {
          throw new Error(
            'The selected Supplier Type does not exist, try another one or create one.',
          );
        }
        return this.create({
          name: category.name,
          type: supplierType
        });
      }),
    );
  }
}
