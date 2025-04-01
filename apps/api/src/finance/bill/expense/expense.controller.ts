import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { GetUserAuth } from '../../../decorators/auth-user.decorator';

import { User } from '../../../auth/users/user.entity';

import { AuthGuard } from '@nestjs/passport';

import { AuthRoleGuards } from '../../../guards/auth-role.guards';
import { AuthStatusGuards } from '../../../guards/auth-status.guards';
import { FinanceBillInitializeGuard } from '../../../guards/finance-bill-initialize.guards';

import type { ExpenseQueryParameters } from './expense.interface';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { ExpenseService } from './expense.service';

@Controller('finance/bill')
@UseGuards(
  AuthGuard(),
  AuthRoleGuards,
  AuthStatusGuards,
  FinanceBillInitializeGuard,
)
export class ExpenseController {
  constructor(private readonly service: ExpenseService) {}

  @Post('/expense')
  create(
    @GetUserAuth() user: User,
    @Body() createExpenseDto: CreateExpenseDto,
  ) {
    return this.service.create(user.finance.bills, createExpenseDto);
  }

  @Get('/list/expense')
  findAll(@Query() parameters: ExpenseQueryParameters) {
    return this.service.findAll({ parameters });
  }

  @Get(':id/expense')
  findOne(@Param('id') id: string) {
    return this.service.findOne({ value: id });
  }

  @Patch(':id/expense')
  update(
    @GetUserAuth() user: User,
    @Param('id') id: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.service.update(id, user.finance.bills, updateExpenseDto);
  }

  @Delete(':id/expense')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
