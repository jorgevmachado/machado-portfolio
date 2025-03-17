import { Controller, Get, Param, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { QueryParameters } from '@repo/business/shared/interface';

import { BillService } from './bill.service';

import { AuthRoleGuards } from '../../auth/guards/auth-role.guards';
import { AuthStatusGuards } from '../../auth/guards/auth-status.guards';
import { GetUserAuth } from '../../auth/decorators/auth-user.decorator';
import { User } from '../../auth/users/user.entity';

@Controller('finance/bill')
@UseGuards(AuthGuard(), AuthRoleGuards, AuthStatusGuards)
export class BillController {
  constructor(private readonly service: BillService) {}

  @Get()
  findAll(@GetUserAuth() user: User, @Query() parameters: QueryParameters) {
    return this.service.findAll(user, { parameters });
  }

  @Get(':param')
  findOne(@Param('param') param: string) {
    return this.service.findOne({ value: param });
  }
}
