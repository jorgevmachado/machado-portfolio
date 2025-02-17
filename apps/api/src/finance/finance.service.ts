import { Injectable } from '@nestjs/common';
import { Base } from '../shared';
import { SupplierService } from './supplier/supplier.service';
import { ExpenseService } from './expense/expense.service';

@Injectable()
export class FinanceService extends Base {
  constructor(
    protected readonly supplierService: SupplierService,
    protected readonly expenseService: ExpenseService,
  ) {
    super();
  }

  async seeds() {
    await this.supplierService.seed();
    await this.expenseService.seed();
    return {
      message: 'Seeds executed successfully',
    };
  }
}
