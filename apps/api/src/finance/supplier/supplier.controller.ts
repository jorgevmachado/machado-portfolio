import {
  Body,
  Controller, Delete,
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

import { CreateSupplierDto } from './dto/create-supplier.dto';

import { SupplierService } from './supplier.service';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Controller('finance/supplier')
@UseGuards(AuthGuard(), AuthRoleGuards, AuthStatusGuards)
export class SupplierController {
  constructor(private readonly service: SupplierService) {}

  @Get()
  findAll(@Query() parameters: QueryParameters) {
    return this.service.findAll({ parameters });
  }

  @Post()
  async create(@Body() { name, type }: CreateSupplierDto) {
    return await this.service.create({ name, type });
  }

  @Get(':param')
  findOne(@Param('param') param: string) {
    return this.service.findOne({ value: param });
  }

  @Put(':param')
  update(
    @Param('param') param: string,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ) {
    return this.service.update(param, updateSupplierDto);
  }

  @Delete(':param')
  remove(@Param('param') param: string) {
    return this.service.remove(param);
  }

  @Get('seed')
  seed() {
    return this.service.seed(false);
  }
}
