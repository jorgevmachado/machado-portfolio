import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { AuthRoleGuards } from '../../../auth/guards/auth-role.guards';
import { AuthStatusGuards } from '../../../auth/guards/auth-status.guards';

import { SupplierTypeService } from './supplier-type.service';
import { CreateSupplierTypeDto } from './dto/create-supplier-type.dto';
import { UpdateSupplierTypeDto } from './dto/update-supplier-type.dto';

@Controller('finance/supplier')
@UseGuards(AuthGuard(), AuthRoleGuards, AuthStatusGuards)
export class SupplierTypeController {
  constructor(private readonly service: SupplierTypeService) {}

  @Post('/type')
  async create(@Body() { name }: CreateSupplierTypeDto) {
    return await this.service.create({ name });
  }

  @Get(':param/type')
  findOne(@Param('param') param: string) {
    return this.service.findOne({ value: param });
  }

  @Put(':param/type')
  update(
    @Param('param') param: string,
    @Body() updateSupplierTypeDto: UpdateSupplierTypeDto,
  ) {
    return this.service.update(param, updateSupplierTypeDto);
  }
}
