import { Injectable } from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import { FinanceService } from './finance/finance.service';

@Injectable()
export class AppService {
  constructor(
    protected authService: AuthService,
    protected financeService: FinanceService,
  ) {}
  getHello(): string {
    return 'Hello World!';
  }
  async seed() {
    const user = await this.authService.seed();
    console.info('# => user exist => ', Boolean(user));
    const finance = await this.financeService.seed(user);
    console.info('# => finance exist => ', Boolean(finance));
    return {
      message: 'Seeds executed successfully',
    };
  }
}
