import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { SupplierService } from './supplier.service';
import { Supplier } from './supplier.entity';
import { SupplierTypeModule } from './supplier-type/supplier-type.module';
import { SupplierController } from './supplier.controller';


@Module({
  controllers: [SupplierController],
  imports: [
    TypeOrmModule.forFeature([Supplier]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    SupplierTypeModule,
  ],
  providers: [SupplierService],
  exports: [SupplierService],
})
export class SupplierModule {}
