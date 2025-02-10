import { Injectable } from '@nestjs/common';
import { Base } from '../shared';
import { SupplierService } from './supplier/supplier.service';
import { ExpenseService } from './expense/expense.service';

@Injectable()
export class FinanceService extends Base {
  constructor(
    protected expenseService: ExpenseService,
    protected supplierService: SupplierService,
  ) {
    super();
  }

  async seeds() {
    const suppliers = await this.supplierService.seed();
    if(!suppliers) {
      throw Error('Error seeding suppliers');
    }
    const expenses = await this.expenseService.seed();
    if(!expenses) {
      throw Error('Error seeding expenses');
    }
    return {
      message: 'Seeds executed successfully',
    };
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
