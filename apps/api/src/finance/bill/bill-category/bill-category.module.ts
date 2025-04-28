import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { BillCategoryService } from './bill-category.service';
import { BillCategoryController } from './bill-category.controller';
import { BillCategory } from './bill-category.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BillCategory]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [BillCategoryController],
  providers: [BillCategoryService],
  exports: [BillCategoryService],
})
export class BillCategoryModule {}
