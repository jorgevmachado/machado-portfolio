import {Body, Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {FinanceService} from './finance.service';
import {AuthGuard} from '@nestjs/passport';
import {AuthRoleGuards} from '../auth/guards/auth-role.guards';
import {AuthStatusGuards} from '../auth/guards/auth-status.guards';
import {CreateSupplierTypeDto} from "./supplier/supplier-type/dto/create-supplier-type.dto";
import {CreateSupplierCategoryDto} from "./supplier/supplier-category/dto/create-supplier-category.dto";

@Controller('finance')
@UseGuards(AuthGuard(), AuthRoleGuards, AuthStatusGuards)
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Post('/seeds')
  seeds() {
    return {
      message: 'Seeds',
    }
    // return this.financeService.seeds();
  }


  @Post('/supplier-category')
  createSupplierCategory(@Body() createSupplierCategoryDto: CreateSupplierCategoryDto) {
    return {
      message: 'Create Supplier Category',
    }
    // return this.financeService.createSupplierCategory(createSupplierCategoryDto);
  }

  @Get('/supplier-category/:param')
  findOneSupplierCategory(@Param('param') param: string) {
    return {
      message: 'Find One Supplier Category',
    }
    // return this.financeService.findOneSupplierCategory(param);
  }
}
