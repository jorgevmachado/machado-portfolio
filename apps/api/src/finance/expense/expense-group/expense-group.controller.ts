import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthRoleGuards } from '../../../auth/guards/auth-role.guards';
import { AuthStatusGuards } from '../../../auth/guards/auth-status.guards';

import { CreateExpenseGroupDto } from './dto/create-expense-group.dto';
import { UpdateExpenseGroupDto } from './dto/update-expense-group.dto';

import { ExpenseGroupService } from './expense-group.service';

@Controller('finance/expense/group')
@UseGuards(AuthGuard(), AuthRoleGuards, AuthStatusGuards)
export class ExpenseGroupController {
  constructor(private readonly expenseGroupService: ExpenseGroupService) {}

  @Post()
  create(@Body() createExpenseGroupDto: CreateExpenseGroupDto) {
    return this.expenseGroupService.create(createExpenseGroupDto);
  }

  @Get()
  findAll() {
    return this.expenseGroupService.findAll();
  }

  @Get('/:param')
  findOne(@Param('param') param: string) {
    return this.expenseGroupService.findOne({ value: param });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExpenseGroupDto: UpdateExpenseGroupDto,
  ) {
    return this.expenseGroupService.update(+id, updateExpenseGroupDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expenseGroupService.remove(+id);
  }
}
