import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import BillBusiness from '@repo/business/finance/bill/billBusiness';

import { BillService } from './bill.service';
import { BillController } from './bill.controller';
import { Bill } from './bill.entity';

@Module({
  controllers: [BillController],
  imports: [
    TypeOrmModule.forFeature([Bill]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [BillService, BillBusiness],
  exports: [BillService],
})
export class BillModule {}
