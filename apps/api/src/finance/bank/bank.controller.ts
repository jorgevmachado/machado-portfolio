import {Controller, Get, Param, Query} from '@nestjs/common';

import { QueryParameters } from '@repo/business/shared/interface';

import { BankService } from './bank.service';

@Controller('finance/bank')
export class BankController {
  constructor(private readonly service: BankService) {}

  @Get()
  findAll(@Query() parameters: QueryParameters) {
    return this.service.list({ parameters });
  }

  @Get(':param')
  findOne(@Param('param') param: string) {
    return this.service.findOne({ value: param });
  }
}
