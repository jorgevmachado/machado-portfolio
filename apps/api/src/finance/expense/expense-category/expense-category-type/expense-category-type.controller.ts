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

import { AuthRoleGuards } from '../../../../auth/guards/auth-role.guards';
import { AuthStatusGuards } from '../../../../auth/guards/auth-status.guards';

import { ExpenseCategoryTypeService } from './expense-category-type.service';
import { CreateExpenseCategoryTypeDto } from './dto/create-expense-category-type.dto';
import { UpdateExpenseCategoryTypeDto } from './dto/update-expense-category-type.dto';

@Controller('finance/expense/category/type')
@UseGuards(AuthGuard(), AuthRoleGuards, AuthStatusGuards)
export class ExpenseCategoryTypeController {
  constructor(
    private readonly expenseCategoryTypeService: ExpenseCategoryTypeService,
  ) {}

  @Post()
  create(@Body() createExpenseCategoryTypeDto: CreateExpenseCategoryTypeDto) {
    return this.expenseCategoryTypeService.create(createExpenseCategoryTypeDto);
  }

  @Get()
  findAll() {
    return this.expenseCategoryTypeService.findAll();
  }

  @Get('/:param')
  findOne(@Param('param') param: string) {
    return this.expenseCategoryTypeService.findOne({ value: param });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateExpenseCategoryTypeDto: UpdateExpenseCategoryTypeDto,
  ) {
    return this.expenseCategoryTypeService.update(
      +id,
      updateExpenseCategoryTypeDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.expenseCategoryTypeService.remove(+id);
  }
}
