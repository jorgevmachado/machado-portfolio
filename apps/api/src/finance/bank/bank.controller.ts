import {Body, Controller, Delete, Get, Param, Post, Put, Query} from '@nestjs/common';

import { QueryParameters } from '@repo/business/shared/interface';

import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';

import { BankService } from './bank.service';

@Controller('finance/bank')
export class BankController {
  constructor(private readonly service: BankService) {}

  @Get()
  findAll(@Query() parameters: QueryParameters) {
    return this.service.list({ parameters });
  }

  @Post()
  async create(@Body() { name }: CreateBankDto) {
    return await this.service.create({ name });
  }

  @Get(':param')
  findOne(@Param('param') param: string) {
    return this.service.findOne({ value: param });
  }

  @Put(':param')
  update(@Param('param') param: string, @Body() updateBank: UpdateBankDto) {
    return this.service.update(param, updateBank);
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
