import { Injectable } from '@nestjs/common';
import { Base } from '../shared';
import { CreateSupplierTypeDto } from './supplier/supplier-type/dto/create-supplier-type.dto';
import { CreateSupplierCategoryDto } from './supplier/supplier-category/dto/create-supplier-category.dto';
import { SupplierService } from './supplier/supplier.service';

@Injectable()
export class FinanceService extends Base {
  constructor(protected supplierervice: SupplierService) {
    super();
  }
  // async createSupplierType({ name }: CreateSupplierTypeDto) {
  //   return await this.supplierTypeService.create({ name });
  // }
  //
  // async findOneSupplierType(param: string) {
  //   return await this.supplierTypeService.findOne({
  //     value: param,
  //   });
  // }
  //
  // async createSupplierCategory({ name, type }: CreateSupplierCategoryDto) {
  //   const supplierType = await this.supplierTypeService.findOne({
  //     value: type,
  //     withThrow: false,
  //   });
  //   return this.supplierCategoryService.create(name, supplierType);
  // }
  //
  // async findOneSupplierCategory(param: string) {
  //   return await this.supplierCategoryService.findOne({
  //     value: param,
  //   });
  // }
}
