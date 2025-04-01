import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import type { QueryParameters } from '@repo/business/shared/interface';

import { BillCategoryService } from './bill-category.service';
import { CreateBillCategoryDto } from './dto/create-bill-category.dto';
import { UpdateBillCategoryDto } from './dto/update-bill-category.dto';

@Controller('finance/bill')
export class BillCategoryController {
  constructor(private readonly billCategoryService: BillCategoryService) {}

  @Get('/list/category')
  findAll(@Query() parameters: QueryParameters) {
    return this.billCategoryService.findAll({ parameters });
  }

  @Post('/category')
  create(@Body() createBillCategoryDto: CreateBillCategoryDto) {
    return this.billCategoryService.create(createBillCategoryDto);
  }

  @Get(':param/category')
  findOne(@Param('param') param: string) {
    return this.billCategoryService.findOne({ value: param });
  }

  @Patch(':param/category')
  update(
    @Param('param') param: string,
    @Body() updateBillCategoryDto: UpdateBillCategoryDto,
  ) {
    return this.billCategoryService.update(param, updateBillCategoryDto);
  }

  @Delete(':param/category')
  remove(@Param('param') param: string) {
    return this.billCategoryService.remove(param);
  }

  @Post('seed/category')
  seed() {
    return this.billCategoryService.seed(false);
  }
}
