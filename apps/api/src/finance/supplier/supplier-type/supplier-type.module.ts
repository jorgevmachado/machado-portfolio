import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { SupplierType } from './supplierType.entity';

import { SupplierTypeService } from './supplier-type.service';
import { SupplierTypeController } from './supplier-type.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([SupplierType]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [SupplierTypeController],
  providers: [SupplierTypeService],
  exports: [SupplierTypeService],
})
export class SupplierTypeModule {}
