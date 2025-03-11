import { ConflictException, Injectable } from '@nestjs/common';

import { findRepeated } from '@repo/services/string/string';

import { LIST_SUPPLIER_TYPE_FIXTURE } from '@repo/mock/finance/supplier-type/fixtures/supplierType';
import { LIST_SUPPLIER_FIXTURE } from '@repo/mock/finance/supplier/fixtures/supplier';
import { BANK_LIST_FIXTURE } from '@repo/mock/finance/bank/fixtures/bank';
import { EXPENSE_LIST_FIXTURE } from '@repo/mock/finance/expense/fixtures/expense';
import { BILL_LIST_FIXTURE } from '@repo/mock/finance/bill/fixtures/bill';

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
    this.validateMocks();
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

  private validateMocks() {
    const findRepeatedSupplierTypeId = findRepeated(
      LIST_SUPPLIER_TYPE_FIXTURE,
      'id',
    );
    this.validateMock(findRepeatedSupplierTypeId, 'id', 'SupplierType');
    const findRepeatedSupplierTypeName = findRepeated(
      LIST_SUPPLIER_TYPE_FIXTURE,
      'name',
    );
    this.validateMock(findRepeatedSupplierTypeName, 'name', 'SupplierType');

    const findRepeatedSupplierId = findRepeated(LIST_SUPPLIER_FIXTURE, 'id');
    this.validateMock(findRepeatedSupplierId, 'id', 'Supplier');
    const findRepeatedSupplierName = findRepeated(
      LIST_SUPPLIER_FIXTURE,
      'name',
    );
    this.validateMock(findRepeatedSupplierName, 'name', 'Supplier');

    const findRepeatedBankId = findRepeated(BANK_LIST_FIXTURE, 'id');
    this.validateMock(findRepeatedBankId, 'id', 'Bank');
    const findRepeatedBankName = findRepeated(BANK_LIST_FIXTURE, 'name');
    this.validateMock(findRepeatedBankName, 'name', 'Bank');

    const findRepeatedExpenseId = findRepeated(EXPENSE_LIST_FIXTURE, 'id');
    this.validateMock(findRepeatedExpenseId, 'id', 'Expense');

    const findRepeatedBillId = findRepeated(BILL_LIST_FIXTURE, 'id');
    this.validateMock(findRepeatedBillId, 'id', 'Bill');
    const findRepeatedBillName = findRepeated(BILL_LIST_FIXTURE, 'name');
    this.validateMock(findRepeatedBillName, 'name', 'Bill');
  }

  private validateMock(param: string, key: 'id' | 'name', text: string) {
    if (!param) {
      return;
    }
    throw this.error(
      new ConflictException(
        `The selected ${key} ${param} is repeated in ${text}, try another one or update this.`,
      ),
    );
  }
}
