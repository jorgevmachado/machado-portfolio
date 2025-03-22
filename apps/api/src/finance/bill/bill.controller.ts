import {
  Body,
  ConflictException,
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

import { AuthRoleGuards } from '../../auth/guards/auth-role.guards';
import { AuthStatusGuards } from '../../auth/guards/auth-status.guards';
import { GetUserAuth } from '../../auth/decorators/auth-user.decorator';
import { User } from '../../auth/users/user.entity';

import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update.bill.dto';
import { BillService } from './bill.service';

@Controller('finance/bill')
@UseGuards(AuthGuard(), AuthRoleGuards, AuthStatusGuards)
export class BillController {
  constructor(private readonly service: BillService) {}

  @Get()
  findAll(@GetUserAuth() user: User, @Query() parameters: QueryParameters) {
    this.validateFinance(user);
    return this.service.findAllBills(user.finance, { parameters });
  }

  @Post()
  create(@GetUserAuth() user: User, @Body() createBillDto: CreateBillDto) {
    this.validateFinance(user);
    return this.service.create(user.finance, createBillDto);
  }

  @Put(':param')
  update(
    @GetUserAuth() user: User,
    @Param('param') param: string,
    @Body() updateBillDto: UpdateBillDto,
  ) {
    this.validateFinance(user);
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

  private validateFinance(user: User) {
    if (!user.finance) {
      throw new ConflictException(
        'Finance is not initialized, please start it to access this feature.',
      );
    }
  }
}
