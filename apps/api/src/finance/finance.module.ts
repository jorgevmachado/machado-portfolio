import { Module } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { FinanceController } from './finance.controller';
import { SupplierTypeModule } from './supplier-type/supplier-type.module';
import { SupplierCategoryModule } from './supplier-category/supplier-category.module';
import { SupplierModule } from './supplier/supplier.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    SupplierTypeModule,
    SupplierCategoryModule,
    SupplierModule,
  ],
  controllers: [FinanceController],
  providers: [FinanceService],
})
export class FinanceModule {}
