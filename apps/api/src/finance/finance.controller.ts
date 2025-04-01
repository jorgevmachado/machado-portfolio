import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthRoleGuards } from '../guards/auth-role.guards';
import { AuthStatusGuards } from '../guards/auth-status.guards';
import { GetUserAuth } from '../decorators/auth-user.decorator';
import { User } from '../auth/users/user.entity';

import { FinanceService } from './finance.service';

@Controller('finance')
@UseGuards(AuthGuard(), AuthRoleGuards, AuthStatusGuards)
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Post('/initialize')
  initialize(@GetUserAuth() user: User) {
    return this.financeService.initializeFinance(user);
  }

  @Get('/seed')
  seed(@GetUserAuth() user: User) {
    return this.financeService.seed(user, false);
  }

  @Get('/seeds')
  seeds(@GetUserAuth() user: User) {
    return this.financeService.seeds(user);
  }

  @Get('/seeds/basic')
  seedBasic(@GetUserAuth() user: User) {
    return this.financeService.basicSeeds(false);
  }
}
