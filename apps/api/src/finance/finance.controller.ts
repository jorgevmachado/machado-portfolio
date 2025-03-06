import { Controller, Post, UseGuards } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthRoleGuards } from '../auth/guards/auth-role.guards';
import { AuthStatusGuards } from '../auth/guards/auth-status.guards';
import { GetUserAuth } from '../auth/decorators/auth-user.decorator';
import { User } from '../auth/users/user.entity';

@Controller('finance')
@UseGuards(AuthGuard(), AuthRoleGuards, AuthStatusGuards)
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Post('/seeds')
  seeds(@GetUserAuth() user: User) {
    return this.financeService.seeds(user);
  }
}
