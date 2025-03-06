import { Injectable } from '@nestjs/common';

import { Base } from '../shared';
import { User } from '../auth/users/user.entity';
import { ExpenseService } from './expense/expense.service';

@Injectable()
export class FinanceService extends Base {
  constructor(protected readonly expenseService: ExpenseService) {
    super();
  }

  async seeds(user: User) {
    const expenses = await this.expenseService.seed(user);
    console.info('# => expenses exist => ', Boolean(expenses));
    return {
      message: 'Seeds executed successfully',
    };
  }
}
