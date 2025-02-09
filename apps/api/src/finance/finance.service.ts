import { Injectable } from '@nestjs/common';
import { Base } from '../shared';
import { SupplierTypeService } from './supplier-type/supplier-type.service';
import { CreateSupplierTypeDto } from './dto/supplier/create-supplier-type.dto';
import { CreateSupplierCategoryDto } from './dto/supplier/create-supplier-category.dto';
import { SupplierCategoryService } from './supplier-category/supplier-category.service';

@Injectable()
export class FinanceService extends Base {
  constructor(
    protected supplierTypeService: SupplierTypeService,
    protected supplierCategoryService: SupplierCategoryService,
  ) {
    super();
  }
  async createSupplierType({ name }: CreateSupplierTypeDto) {
    return await this.supplierTypeService.create({ name });
  }

  async findOneSupplierType(param: string) {
    return await this.supplierTypeService.findOne({
      value: param,
    });
  }

  async createSupplierCategory({ name, type }: CreateSupplierCategoryDto) {
    const supplierType = await this.supplierTypeService.findOne({
      value: type,
      withThrow: false,
    });
    return this.supplierCategoryService.create(name, supplierType);
  }

  async findOneSupplierCategory(param: string) {
    return await this.supplierCategoryService.findOne({
      value: param,
    });
  }

  async seeds() {
    const supplierTypes = await this.supplierTypeService.seed();
    const supplierCategories = await this.supplierCategoryService.seed(supplierTypes);
    console.log('supplierTypes => ', supplierTypes.length);
    console.log('supplierCategories => ', supplierCategories.length);
    return { message: 'Seeds Executed Successfully!!!' };
  }
}
