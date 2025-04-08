import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import BillBusiness from '@repo/business/finance/bill/business';

import { BankModule } from '../bank/bank.module';

import { BillCategoryModule } from './bill-category/bill-category.module';
import { ExpenseModule } from './expense/expense.module';

import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { Bill } from './bill.entity';

@Module({
  controllers: [BillController],
  imports: [
    TypeOrmModule.forFeature([Bill]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    BankModule,
    BillCategoryModule,
    ExpenseModule,
  ],
  providers: [BillService, BillBusiness],
  exports: [BillService],
})
export class BillModule {}
