import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {FinanceService} from './finance.service';
import {AuthGuard} from '@nestjs/passport';
import {AuthRoleGuards} from '../auth/guards/auth-role.guards';
import {AuthStatusGuards} from '../auth/guards/auth-status.guards';
import {CreateSupplierTypeDto} from "./dto/supplier/create-supplier-type.dto";
import {CreateSupplierCategoryDto} from "./dto/supplier/create-supplier-category.dto";

@Controller('finance')
@UseGuards(AuthGuard(), AuthRoleGuards, AuthStatusGuards)
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Post('/seeds')
  seeds() {
    return this.financeService.seeds();
  }

  @Post('/supplier-type')
  createSupplierType(@Body() createSupplierTypeDto: CreateSupplierTypeDto) {
    return this.financeService.createSupplierType(createSupplierTypeDto);
  }

  @Get('/supplier-type/:param')
  findOneSupplierType(@Param('param') param: string) {
    return this.financeService.findOneSupplierType(param);
  }

  @Post('/supplier-category')
  createSupplierCategory(@Body() createSupplierCategoryDto: CreateSupplierCategoryDto) {
    return this.financeService.createSupplierCategory(createSupplierCategoryDto);
  }

  @Get('/supplier-category/:param')
  findOneSupplierCategory(@Param('param') param: string) {
    return this.financeService.findOneSupplierCategory(param);
  }
}
