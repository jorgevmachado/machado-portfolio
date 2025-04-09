import {
  Body,
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

import type { QueryParameters } from '@repo/business/shared/interface';

import { AuthRoleGuards } from '../../guards/auth-role.guards';
import { AuthStatusGuards } from '../../guards/auth-status.guards';
import { FinanceInitializeGuard } from '../../guards/finance-initialize.guards';
import { GetUserAuth } from '../../decorators/auth-user.decorator';
import { User } from '../../auth/users/user.entity';

import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update.bill.dto';
import { BillService } from './bill.service';
import {CreateExpenseDto} from "./expense/dto/create-expense.dto";
import {UpdateExpenseDto} from "./expense/dto/update-expense.dto";

@Controller('finance/bill')
@UseGuards(
  AuthGuard(),
  AuthRoleGuards,
  AuthStatusGuards,
  FinanceInitializeGuard,
)
export class BillController {
  constructor(private readonly service: BillService) {}

  @Get()
  findAll(@GetUserAuth() user: User, @Query() parameters: QueryParameters) {
    return this.service.findAllBills(user.finance, { parameters });
  }

  @Post()
  create(@GetUserAuth() user: User, @Body() createBillDto: CreateBillDto) {
    return this.service.create(user.finance, createBillDto);
  }

  @Put(':param')
  update(
    @GetUserAuth() user: User,
    @Param('param') param: string,
    @Body() updateBillDto: UpdateBillDto,
  ) {
    return this.service.update(user.finance, param, updateBillDto);
  }

  @Get(':param')
  findOne(@Param('param') param: string) {
    return this.service.findOne({ value: param });
  }

  @Delete(':param')
  remove(@Param('param') param: string) {
    return this.service.remove(param);
  }

  @Post(':param/expense')
  addExpense(@Param('param') param: string, @Body() createExpenseDto: CreateExpenseDto) {
    return this.service.addExpense(param, createExpenseDto);
  }

  @Put(':param/expense/:expenseId')
  updateExpense(
    @Param('param') param: string,
    @Param('expenseId') expenseId: string,
    @Body() updateExpenseDto: UpdateExpenseDto,
  ) {
    return this.service.updateExpense(param, expenseId, updateExpenseDto);
  }

  @Get(':param/expense/:expenseId')
  findOneExpense(@Param('param') param: string, @Param('expenseId') expenseId: string) {
    return this.service.findOneExpense(param, expenseId);
  }

  @Get(':param/list/expense')
  findAllExpense(@Param('param') param: string, @Query() parameters: QueryParameters) {
    return this.service.findAllExpense(param, { parameters });
  }

  @Delete(':param/expense/:expenseId')
  removeExpense(@Param('param') param: string, @Param('expenseId') expenseId: string) {
    return this.service.removeExpense(param, expenseId);
  }

}
