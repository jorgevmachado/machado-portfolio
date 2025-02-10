import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { ExpenseGroupModule } from './expense-group/expense-group.module';
import { ExpenseCategoryModule } from './expense-category/expense-category.module';
import { Expense } from './expense.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Expense]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ExpenseGroupModule,
    ExpenseCategoryModule,
  ],
  controllers: [ExpenseController],
  providers: [ExpenseService],
  exports: [ExpenseService],
})
export class ExpenseModule {}
