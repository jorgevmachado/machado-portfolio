import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import ExpenseBusiness from '@repo/business/finance/expense/expenseBusiness';

import { AuthModule } from '../../../auth/auth.module';
import { SupplierModule } from '../../supplier/supplier.module';

import { Expense } from './expense.entity';
import { ExpenseService } from './expense.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Expense]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    AuthModule,
    SupplierModule,
  ],
  providers: [ExpenseService, ExpenseBusiness],
  exports: [ExpenseService],
})
export class ExpenseModule {}
