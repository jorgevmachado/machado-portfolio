import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BillModule } from './bill/bill.module';
import { BankModule } from './bank/bank.module';

import { Finance } from './finance.entity';

import { FinanceService } from './finance.service';
import { FinanceController } from './finance.controller';
import { SupplierModule } from './supplier/supplier.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Finance]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    SupplierModule,
    BillModule,
    BankModule,
  ],
  controllers: [FinanceController],
  providers: [FinanceService],
  exports: [FinanceService],
})
export class FinanceModule {}
