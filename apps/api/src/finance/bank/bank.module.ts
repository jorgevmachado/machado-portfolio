import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { Bank } from './bank.entity';
import { BankService } from './bank.service';
import { BankController } from './bank.controller';

@Module({
  controllers: [BankController],
  imports: [
    TypeOrmModule.forFeature([Bank]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [BankService],
  exports: [BankService],
})
export class BankModule {}
