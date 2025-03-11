import {Controller, Get, Param, Query} from '@nestjs/common';

import { QueryParameters } from '@repo/business/shared/interface';

import { BillService } from './bill.service';

@Controller('finance/bill')
export class BillController {
  constructor(private readonly service: BillService) {}

  @Get()
  findAll(@Query() parameters: QueryParameters) {
    return this.service.list({ parameters });
  }

  @Get(':param')
  findOne(@Param('param') param: string) {
    return this.service.findOne({ value: param });
  }
}
