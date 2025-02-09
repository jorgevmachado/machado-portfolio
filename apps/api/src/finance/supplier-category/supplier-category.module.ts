import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierCategory } from './supplierCategory.entity';

import { SupplierCategoryService } from './supplier-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierCategory])],
  providers: [SupplierCategoryService],
  exports: [SupplierCategoryService],
})
export class SupplierCategoryModule {}
