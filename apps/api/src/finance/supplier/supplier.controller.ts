import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthRoleGuards } from '../../auth/guards/auth-role.guards';
import { AuthStatusGuards } from '../../auth/guards/auth-status.guards';

import { CreateSupplierDto } from './dto/create-supplier.dto';

import { SupplierService } from './supplier.service';

@Controller('finance/supplier')
@UseGuards(AuthGuard(), AuthRoleGuards, AuthStatusGuards)
export class SupplierController {
  constructor(private readonly service: SupplierService) {}

  @Get()
  find() {
    // return this.financeService.createSupplierType(createSupplierTypeDto);
    return {
      message: 'Find',
    };
  }

  @Post()
  async create(@Body() { name, category }: CreateSupplierDto) {
    return await this.service.create({ name, category });
  }

  @Get('/:param')
  findOne(@Param('param') param: string) {
    return this.service.findOne({ value: param });
  }
}
