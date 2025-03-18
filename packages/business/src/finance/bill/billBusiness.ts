import {BillConstructorParams, BillList, TList} from './interface';
import Bill from './bill';
import ExpenseBusiness from '../expense/expenseBusiness';

export default class BillBusiness {
  initialize(params: BillConstructorParams): Bill {
    const builtBill = new Bill(params);
    return this.processBillValues(builtBill);
  }

  mapBillListByItem(
    bills: Array<Bill>,
    listType: TList,
  ): Array<BillList> {
    return bills.reduce<Array<BillList>>((result, bill) => {
      const listTitle = this.listTitle(bill, listType);

      let listItem = result.find((item) => item.title === listTitle);

      if (!listItem) {
        listItem = { title: listTitle, list: [], listType };
        result.push(listItem);
      }

      listItem.list.push(bill);

      return result;
    }, []);
  }

  calculateAllBill(bill: Bill) {
    const total = bill.total ?? 0;
    const allPaid = bill.all_paid ?? false;
    const totalPaid = bill.total_paid ?? 0;
    const totalPending = total - totalPaid;

    return {
      total,
      allPaid,
      totalPaid,
      totalPending
    }
  }

  private listTitle(
    bill: Bill,
    listType: TList,
  ): string {
    if (listType === 'bank') {
      return bill.bank.name;
    }

    if (listType === 'type') {
      return bill.type.toLowerCase().replace(/ /g, '_');
    }

    return bill.category.name;
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