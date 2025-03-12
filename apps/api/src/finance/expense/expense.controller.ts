import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthRoleGuards } from '../../auth/guards/auth-role.guards';
import { AuthStatusGuards } from '../../auth/guards/auth-status.guards';

import { CreateExpenseDto } from './dto/create-expense.dto';

import { ExpenseQueryParameters } from './expense.interface';
import { ExpenseService } from './expense.service';

@Controller('finance/expense')
@UseGuards(AuthGuard(), AuthRoleGuards, AuthStatusGuards)
export class ExpenseController {
  constructor(private readonly service: ExpenseService) {}

  @Get()
  findAll(@Query() parameters: ExpenseQueryParameters) {
    return this.service.list({ parameters });
  }

  @Post()
  async create(@Body() createExpenseDto: CreateExpenseDto) {
    return await this.service.create(createExpenseDto);
  }

  @Get(':param')
  findOne(@Param('param') param: string) {
    return this.service.findOne({ value: param });
  }
}
