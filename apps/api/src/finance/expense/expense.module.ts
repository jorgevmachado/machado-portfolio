import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import ExpenseBusiness from '@repo/business/finance/expense/expenseBusiness';

import { SupplierModule } from '../supplier/supplier.module';

import { ExpenseGroupModule } from './expense-group/expense-group.module';
import { ExpenseCategoryModule } from './expense-category/expense-category.module';

import { Expense } from './expense.entity';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([Expense]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ExpenseGroupModule,
    ExpenseCategoryModule,
    SupplierModule,
  ],
  controllers: [ExpenseController],
  providers: [ExpenseService, ExpenseBusiness],
  exports: [ExpenseService],
})
export class ExpenseModule {}
