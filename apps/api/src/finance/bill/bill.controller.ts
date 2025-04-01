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
}
