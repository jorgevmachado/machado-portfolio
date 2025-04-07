import { Controller, Get, Query } from '@nestjs/common';

import { QueryParameters } from '@repo/business/shared/interface';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('seed')
  seed(@Query() parameters: QueryParameters) {
    return this.appService.seed(parameters?.['key']);
  }
}
