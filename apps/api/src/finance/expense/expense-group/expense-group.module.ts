import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';

import { ExpenseGroupService } from './expense-group.service';
import { ExpenseGroupController } from './expense-group.controller';
import { ExpenseGroup } from './expense-group.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ExpenseGroup]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [ExpenseGroupController],
  providers: [ExpenseGroupService],
  exports: [ExpenseGroupService],
})
export class ExpenseGroupModule {}
