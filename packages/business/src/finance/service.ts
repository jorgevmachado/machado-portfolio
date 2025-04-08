import { Nest } from '../api';

import type { FinanceEntity } from './interface';

export class FinanceService {
  constructor(private nest: Nest) {}

  public async initialize(): Promise<FinanceEntity> {
    return this.nest.finance.initialize();
  }
}