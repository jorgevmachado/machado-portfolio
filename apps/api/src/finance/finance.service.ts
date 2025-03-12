import { Injectable } from '@nestjs/common';

import { Base } from '../shared';
import { User } from '../auth/users/user.entity';
import { ExpenseService } from './expense/expense.service';
import { SupplierService } from './supplier/supplier.service';
import { BankService } from './bank/bank.service';
import { BillService } from './bill/bill.service';

@Injectable()
export class FinanceService extends Base {
  constructor(
    protected readonly supplierService: SupplierService,
    protected readonly bankService: BankService,
    protected readonly expenseService: ExpenseService,
    protected readonly billService: BillService,
  ) {
    super();
  }

  async seeds(user: User) {
    const { suppliers } = (await this.supplierService.seed()) ?? {};
    console.info('# => suppliers exist => ', Boolean(suppliers));
    const bankList = await this.bankService.seed();
    console.info('# => banks exist => ', Boolean(bankList));
    const expenseList = await this.expenseService.seed(suppliers);
    console.info('# => expenses exist => ', Boolean(expenseList));
    const bills = await this.billService.seed({ user, bankList, expenseList });
    console.info('# => bills exist => ', Boolean(bills));
    return {
      message: 'Seeds executed successfully',
    };
  }
}
