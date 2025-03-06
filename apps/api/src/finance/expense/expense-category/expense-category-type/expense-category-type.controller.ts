import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post, Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthRoleGuards } from '../../../../auth/guards/auth-role.guards';
import { AuthStatusGuards } from '../../../../auth/guards/auth-status.guards';

import { ExpenseCategoryTypeService } from './expense-category-type.service';
import { CreateExpenseCategoryTypeDto } from './dto/create-expense-category-type.dto';
import { UpdateExpenseCategoryTypeDto } from './dto/update-expense-category-type.dto';
import {QueryParameters} from "@repo/business/shared/interface";

@Controller('finance/expense/category')
@UseGuards(AuthGuard(), AuthRoleGuards, AuthStatusGuards)
export class ExpenseCategoryTypeController {
  constructor(
    private readonly service: ExpenseCategoryTypeService,
  ) {}

  @Get('list/type')
  findAll(@Query() parameters: QueryParameters) {
    return this.service.list({ parameters });
  }

  @Post('type')
  create(@Body() createExpenseCategoryTypeDto: CreateExpenseCategoryTypeDto) {
    return this.service.create(createExpenseCategoryTypeDto);
  }

  @Get(':param/type')
  findOne(@Param('param') param: string) {
    return this.service.findOne({ value: param });
  }

  @Patch(':param/type')
  update(
    @Param('param') param: string,
    @Body() updateExpenseCategoryTypeDto: UpdateExpenseCategoryTypeDto,
  ) {
    return this.service.update(
      param,
      updateExpenseCategoryTypeDto,
    );
  }

  @Delete(':param/type')
  remove(@Param('param') param: string) {
    return this.service.remove(param);
  }
}
