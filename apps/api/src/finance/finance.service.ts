import { Injectable } from '@nestjs/common';
import { Base } from '../shared';

@Injectable()
export class FinanceService extends Base {
  constructor() {
    super();
  }

  async seeds() {
    return {
      message: 'Seeds executed successfully',
    };
  }
}
