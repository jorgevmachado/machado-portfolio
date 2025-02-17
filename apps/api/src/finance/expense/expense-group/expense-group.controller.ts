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
import { AuthGuard } from '@nestjs/passport';

import { QueryParameters } from '@repo/business/shared/interface';

import { AuthRoleGuards } from '../../../auth/guards/auth-role.guards';
import { AuthStatusGuards } from '../../../auth/guards/auth-status.guards';

import { CreateExpenseGroupDto } from './dto/create-expense-group.dto';
import { UpdateExpenseGroupDto } from './dto/update-expense-group.dto';

import { ExpenseGroupService } from './expense-group.service';

@Controller('finance/expense')
@UseGuards(AuthGuard(), AuthRoleGuards, AuthStatusGuards)
export class ExpenseGroupController {
  constructor(private readonly service: ExpenseGroupService) {}

  @Get('list/group')
  findAll(@Query() parameters: QueryParameters) {
    return this.service.list(parameters);
  }

  @Post('group')
  create(@Body() createExpenseGroupDto: CreateExpenseGroupDto) {
    return this.service.create(createExpenseGroupDto);
  }

  @Get(':param/group')
  findOne(@Param('param') param: string) {
    return this.service.findOne({ value: param });
  }

  @Patch(':param/group')
  update(
    @Param('param') param: string,
    @Body() updateExpenseGroupDto: UpdateExpenseGroupDto,
  ) {
    return this.service.update(param, updateExpenseGroupDto);
  }

  @Delete(':param/group')
  remove(@Param('param') param: string) {
    return this.service.remove(param);
  }
}
