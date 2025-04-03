import ExpenseBusiness from '../expense/expenseBusiness';

import { ExpenseConstructorParams, ExpenseEntity } from '../expense';

import type { BillConstructorParams, BillList, TList } from './interface';
import Bill from './bill';

export default class BillBusiness {
  initialize(params: BillConstructorParams): Bill {
    const builtBill = new Bill(params);
    return this.calculateBillTotals(builtBill);
  }

  private calculateBillTotals(bill: Bill): Bill {
    if (bill?.expenses?.length) {
      const expensesCalculated = this.processExpenses(bill.expenses);
      bill.total = this.sumTotalExpenses(expensesCalculated, 'total');
      bill.total_paid = this.sumTotalExpenses(expensesCalculated, 'total_paid');
      bill.all_paid = expensesCalculated.every((expense) => expense.paid);
    }
    return bill;
  }

  private processExpenses(
    expenses: Array<ExpenseEntity>,
  ): Array<ExpenseEntity> {
    const expenseBusiness = new ExpenseBusiness();
    return expenses.map((expense) => expenseBusiness.calculateExpense(expense));
  }

  private sumTotalExpenses(
    expenses: Array<ExpenseEntity>,
    property: 'total' | 'total_paid',
  ): number {
    return expenses.reduce((acc, expense) => acc + (expense[property] ?? 0), 0);
  }

  initializeExpense(expense: ExpenseConstructorParams) {
    const expenseBusiness = new ExpenseBusiness();
    return expenseBusiness.initialize(expense);
  }

  mapBillListByItem(bills: Array<Bill>, listType: TList): Array<BillList> {
    return bills.reduce<Array<BillList>>((groupedBills, currentBill) => {
      const groupTitle = this.getGroupTitle(currentBill, listType);

      let group = groupedBills.find((item) => item.title === groupTitle);

      if (!group) {
        group = { title: groupTitle, list: [], listType };
        groupedBills.push(group);
      }

      group.list.push(currentBill);

      return groupedBills;
    }, []);
  }

  private getGroupTitle(bill: Bill, listType: TList): string {
    if (listType === 'bank') {
      return bill.bank.name;
    }

    if (listType === 'type') {
      return bill.type.toLowerCase().replace(/ /g, '_');
    }

    return bill.category.name;
  }

  calculateAllBill(bill: Bill) {
    const total = Number((bill.total ?? 0).toFixed(2));
    const allPaid = bill.all_paid ?? false;
    const totalPaid = Number((bill.total_paid ?? 0).toFixed(2));
    const totalPending = Number((total - totalPaid).toFixed(2));

    return {
      total,
      allPaid,
      totalPaid,
      totalPending,
    };
  }
}