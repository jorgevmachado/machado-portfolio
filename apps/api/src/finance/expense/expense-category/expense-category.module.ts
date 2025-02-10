import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { ExpenseCategoryService } from './expense-category.service';
import { ExpenseCategoryController } from './expense-category.controller';
import { ExpenseCategoryTypeModule } from './expense-category-type/expense-category-type.module';
import { ExpenseCategory } from './expense-category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExpenseCategory]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ExpenseCategoryTypeModule,
  ],
  controllers: [ExpenseCategoryController],
  providers: [ExpenseCategoryService],
  exports: [ExpenseCategoryService],
})
export class ExpenseCategoryModule {}
