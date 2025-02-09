import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { SupplierTypeModule } from '../supplier-type/supplier-type.module';

import { SupplierCategory } from './supplierCategory.entity';
import { SupplierCategoryService } from './supplier-category.service';
import { SupplierCategoryController } from './supplier-category.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([SupplierCategory]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    SupplierTypeModule,
  ],
  controllers: [SupplierCategoryController],
  providers: [SupplierCategoryService],
  exports: [SupplierCategoryService],
})
export class SupplierCategoryModule {}
