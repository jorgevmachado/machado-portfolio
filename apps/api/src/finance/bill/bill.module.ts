import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import BillBusiness from '@repo/business/finance/bill/billBusiness';

import { AuthModule } from '../../auth/auth.module';

import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { Bill } from './bill.entity';
import { BillCategoryModule } from './bill-category/bill-category.module';


@Module({
  controllers: [BillController],
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Bill]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    BillCategoryModule,
  ],
  providers: [BillService, BillBusiness],
  exports: [BillService],
})
export class BillModule {}
