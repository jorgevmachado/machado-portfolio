import { Module } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { FinanceController } from './finance.controller';
import { SupplierModule } from './supplier/supplier.module';
import { PassportModule } from '@nestjs/passport';
import { ExpenseModule } from './expense/expense.module';
import { BillModule } from './bill/bill.module';
import { BankModule } from './bank/bank.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Finance } from './finance.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Finance]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    SupplierModule,
    ExpenseModule,
    BillModule,
    BankModule,
  ],
  controllers: [FinanceController],
  providers: [FinanceService],
  exports: [FinanceService],
})
export class FinanceModule {}
