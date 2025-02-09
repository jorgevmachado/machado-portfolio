import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthRoleGuards } from '../../../auth/guards/auth-role.guards';
import { AuthStatusGuards } from '../../../auth/guards/auth-status.guards';

import { SupplierTypeService } from './supplier-type.service';
import { CreateSupplierTypeDto } from './dto/create-supplier-type.dto';

@Controller('finance/supplier/type')
@UseGuards(AuthGuard(), AuthRoleGuards, AuthStatusGuards)
export class SupplierTypeController {
  constructor(private readonly service: SupplierTypeService) {}

  @Get()
  find() {
    // return this.service.createSupplierType(createSupplierTypeDto);
    return {
      message: 'Find',
    };
  }

  @Post()
  async create(@Body() { name }: CreateSupplierTypeDto) {
    return await this.service.create({ name });
  }

  @Get('/:param')
  findOne(@Param('param') param: string) {
    return this.service.findOne({ value: param });
  }
}
