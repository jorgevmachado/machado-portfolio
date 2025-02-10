import { Module } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { FinanceController } from './finance.controller';
import { SupplierModule } from './supplier/supplier.module';
import { PassportModule } from '@nestjs/passport';
import { ExpenseModule } from './expense/expense.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    SupplierModule,
    ExpenseModule,
  ],
  controllers: [FinanceController],
  providers: [FinanceService],
})
export class FinanceModule {}
