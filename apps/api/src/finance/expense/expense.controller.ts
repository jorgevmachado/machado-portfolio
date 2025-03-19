import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthRoleGuards } from '../../auth/guards/auth-role.guards';
import { AuthStatusGuards } from '../../auth/guards/auth-status.guards';
import { GetUserAuth } from '../../auth/decorators/auth-user.decorator';
import { User } from '../../auth/users/user.entity';

import { CreateExpenseDto } from './dto/create-expense.dto';

import type { ExpenseQueryParameters } from './expense.interface';
import { ExpenseService } from './expense.service';
import { UpdateExpenseDto } from './dto/update-expense.dto';

@Controller('finance/expense')
@UseGuards(AuthGuard(), AuthRoleGuards, AuthStatusGuards)
export class ExpenseController {
  constructor(private readonly service: ExpenseService) {}

  @Get()
  findAll(@Query() parameters: ExpenseQueryParameters) {
    return this.service.findAll({ parameters });
  }

  @Post()
  async create(
    @GetUserAuth() user: User,
    @Body() createExpenseDto: CreateExpenseDto,
  ) {
    this.validateFinanceAndBills(user);
    return await this.service.create(user.finance.bills, createExpenseDto);
  }

  @Put(':param')
  update(
    @GetUserAuth() user: User,
    @Param('param') param: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    this.validateFinanceAndBills(user);
    return this.service.update(param, user.finance.bills, updateExpenseDto);
  }

  @Get(':param')
  findOne(@Param('param') param: string) {
    return this.service.findOne({ value: param });
  }

  @Delete(':param')
  remove(@Param('param') param: string) {
    return this.service.remove(param);
  }

  private validateFinanceAndBills(user: User) {
    if (!user.finance) {
      throw new ConflictException(
        'Finance is not initialized, please start it to access this feature.',
      );
    }
    if (!user.finance.bills || !user.finance.bills.length) {
      throw new ConflictException(
        'No Bill has been created for this finance item. Please create one to access this feature.',
      );
    }
  }
}
