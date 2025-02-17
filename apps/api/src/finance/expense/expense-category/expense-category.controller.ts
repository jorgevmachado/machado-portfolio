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

import { ExpenseCategoryService } from './expense-category.service';
import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { UpdateExpenseCategoryDto } from './dto/update-expense-category.dto';

@Controller('finance/expense')
@UseGuards(AuthGuard(), AuthRoleGuards, AuthStatusGuards)
export class ExpenseCategoryController {
  constructor(private readonly service: ExpenseCategoryService) {}

  @Post('category')
  create(@Body() createExpenseCategoryDto: CreateExpenseCategoryDto) {
    return this.service.create(createExpenseCategoryDto);
  }

  @Get('list/category')
  findAll(@Query() parameters: QueryParameters) {
    return this.service.list(parameters);
  }

  @Get(':param/category')
  findOne(@Param('param') param: string) {
    return this.service.findOne({ value: param });
  }

  @Patch(':param/category')
  update(
    @Param('param') param: string,
    @Body() updateExpenseCategoryDto: UpdateExpenseCategoryDto,
  ) {
    return this.service.update(param, updateExpenseCategoryDto);
  }

  @Delete(':param/category')
  remove(@Param('param') param: string) {
    return this.service.remove(param);
  }
}
