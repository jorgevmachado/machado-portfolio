import type { BillConstructorParams } from './interface';
import Bill from './bill';
import ExpenseBusiness from '../expense/expenseBusiness';

export default class BillBusiness {
  initialize(params: BillConstructorParams): Bill {
    const builtBill = new Bill(params);
    return this.processBillValues(builtBill);
  }

  private processBillValues(bill: Bill): Bill {
    if (bill?.expenses && bill.expenses.length > 0) {
      const expenseBusiness = new ExpenseBusiness();
      const expensesCalculated = bill.expenses.map((expense) =>
        expenseBusiness.initializeExpense(expense),
      );
      bill.total = expensesCalculated.reduce(
        (acc, expense) => acc + expense.total,
        0,
      );
      bill.total_paid = expensesCalculated.reduce(
        (acc, expense) => acc + expense.total_paid,
        0,
      );
      bill.all_paid = expensesCalculated.every((expense) => expense.paid);
    }
    return bill;
  }
}