import { Injectable } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { FinanceService } from './finance/finance.service';

@Injectable()
export class AppService {
  constructor(
    protected authService: AuthService,
    protected financeService: FinanceService,
  ) {}
  async seed(key?: 'all' | 'finance' | 'pokemon') {
    const user = await this.authService.seed();
    console.info('# => user exist => ', Boolean(user));
    if(key === 'all' || key === 'finance') {
      await this.financeService.seeds(user);
    }
    return {
      message: 'Seeds executed successfully',
    };
  }
}
