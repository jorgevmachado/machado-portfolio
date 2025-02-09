import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { SupplierCategoryService } from './supplier-category.service';
import { CreateSupplierCategoryDto } from './dto/create-supplier-category.dto';

import { AuthRoleGuards } from '../../../auth/guards/auth-role.guards';
import { AuthStatusGuards } from '../../../auth/guards/auth-status.guards';

@Controller('finance/supplier/category')
@UseGuards(AuthGuard(), AuthRoleGuards, AuthStatusGuards)
export class SupplierCategoryController {
  constructor(private readonly service: SupplierCategoryService) {}

  @Get()
  find() {
    // return this.financeService.createSupplierType(createSupplierTypeDto);
    return {
      message: 'Find',
    };
  }

  @Post()
  async create(@Body() { name, type }: CreateSupplierCategoryDto) {
    return await this.service.create({ name, type });
  }

  @Get('/:param')
  findOne(@Param('param') param: string) {
    return this.service.findOne({ value: param });
  }
}
