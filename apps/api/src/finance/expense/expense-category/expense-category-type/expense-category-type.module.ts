import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { ExpenseCategoryTypeService } from './expense-category-type.service';
import { ExpenseCategoryTypeController } from './expense-category-type.controller';

import { ExpenseCategoryType } from './expense-category-type.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExpenseCategoryType]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [ExpenseCategoryTypeController],
  providers: [ExpenseCategoryTypeService],
  exports: [ExpenseCategoryTypeService],
})
export class ExpenseCategoryTypeModule {}
