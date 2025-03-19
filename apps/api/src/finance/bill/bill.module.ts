import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import BillBusiness from '@repo/business/finance/bill/billBusiness';

import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { Bill } from './bill.entity';
import { BillCategoryModule } from './bill-category/bill-category.module';
import { BankModule } from '../bank/bank.module';
import { ExpenseModule } from '../expense/expense.module';

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
