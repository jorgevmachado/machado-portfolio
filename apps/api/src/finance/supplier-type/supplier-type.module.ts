import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SupplierType } from './supplierType.entity';

import { SupplierTypeService } from './supplier-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([SupplierType])],
  providers: [SupplierTypeService],
  exports: [SupplierTypeService],
})
export class SupplierTypeModule {}
