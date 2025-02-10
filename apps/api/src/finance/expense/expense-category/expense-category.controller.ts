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

import { ExpenseCategoryService } from './expense-category.service';
import { CreateExpenseCategoryDto } from './dto/create-expense-category.dto';
import { UpdateExpenseCategoryDto } from './dto/update-expense-category.dto';

@Controller('finance/expense/category')
@UseGuards(AuthGuard(), AuthRoleGuards, AuthStatusGuards)
export class ExpenseCategoryController {
  constructor(
    private readonly expenseCategoryService: ExpenseCategoryService,
  ) {}

  @Post()
  create(@Body() createExpenseCategoryDto: CreateExpenseCategoryDto) {
    return this.expenseCategoryService.create(createExpenseCategoryDto);
  }

  @Get()
  findAll() {
    return this.expenseCategoryService.findAll();
  }

  @Get('/:param')
  findOne(@Param('param') param: string) {
    return this.expenseCategoryService.findOne({ value: param });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExpenseCategoryDto: UpdateExpenseCategoryDto,
  ) {
    return this.expenseCategoryService.update(+id, updateExpenseCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expenseCategoryService.remove(+id);
  }
}
