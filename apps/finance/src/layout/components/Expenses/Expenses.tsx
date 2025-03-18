import React, { useEffect, useState } from 'react';

import { currencyFormatter } from '@repo/services/formatter/currency/currency';
import { truncateString } from '@repo/services/string/string';

import Bill from '@repo/business/finance/bill';
import Expense from '@repo/business/finance/expense/expense';

import Text from '@repo/ds/elements/text/Text';
import Table from '@repo/ds/components/table/Table';
import type { TColors } from '@repo/ds/utils/colors/interface';
import { ETypeTableHeaderItem } from '@repo/ds/components/table/enum';

import { expenseBusiness } from '../../../shared';

import './Expenses.scss';

type AllCalculatedExpenses = {
  total: number;
  allPaid: boolean;
  totalPaid: number;
  totalPending: number;
};

type ExpensesProps = {
  expenses: Array<Expense> | Bill['expenses'];
  allCalculated?: AllCalculatedExpenses;
};

const Expenses: React.FC<ExpensesProps> = ({ expenses, allCalculated }) => {
  const [calculatedExpenses, setCalculatedExpenses] = useState<Array<Expense>>(
    [],
  );
  const [allCalculatedExpenses, setAllCalculatedExpenses] =
    useState<AllCalculatedExpenses>({
      total: 0,
      allPaid: false,
      totalPaid: 0,
      totalPending: 0,
    });
  const generateHeaders = () => {
    const monthHeaders = expenseBusiness.months.map((month) => ({
      text: truncateString(month, 3),
      type: ETypeTableHeaderItem.MONEY,
      value: month,
      conditionColor: {
        value: `${month}_paid`,
        trueColor: 'success-80' as TColors,
        falseColor: 'error-80' as TColors,
      },
    }));
    return [
      { text: 'Supplier', value: 'supplier.name' },
      ...monthHeaders,
      { text: 'Total', value: 'total', type: ETypeTableHeaderItem.MONEY },
    ];
  };
  const calculateExpenses = (expenses: Array<Expense> | Bill['expenses']) => {
    return expenses?.map((expense) =>
      expenseBusiness.processAllCalculate(expense as unknown as Expense),
    );
  };

  useEffect(() => {
    const calculatedExpenses = calculateExpenses(expenses);
    setCalculatedExpenses(calculatedExpenses || []);
  }, [expenses]);

  useEffect(() => {
    if (allCalculated) {
      if (
        allCalculated.total === 0 &&
        allCalculated.totalPaid === 0 &&
        allCalculated.totalPending === 0 &&
        !allCalculated.allPaid
      ) {
        const calculatedAllExpenses =
          expenseBusiness.calculateAllExpenses(calculatedExpenses);
        setAllCalculatedExpenses(calculatedAllExpenses);
        return;
      }
      setAllCalculatedExpenses(allCalculated);
      return;
    }
    const calculatedAllExpenses =
      expenseBusiness.calculateAllExpenses(calculatedExpenses);
    setAllCalculatedExpenses(calculatedAllExpenses);
  }, [allCalculated, calculatedExpenses]);

  return (
    <div className="expenses">
      <div className="expenses__summary">
        <div className="expenses__summary-item">
          <Text tag="p">
            Expenses Paid:{' '}
            <span
              className={
                allCalculatedExpenses.allPaid ? 'status--yes' : 'status--no'
              }
            >
              {allCalculatedExpenses.allPaid ? 'Yes' : 'No'}
            </span>
          </Text>
        </div>
        <div className="expenses__summary-item">
          <Text tag="p">
            Total: {currencyFormatter(allCalculatedExpenses.total)}
          </Text>
        </div>
        <div className="expenses__summary-item">
          <Text tag="p">
            Total Paid: {currencyFormatter(allCalculatedExpenses.totalPaid)}
          </Text>
        </div>
        <div className="expenses__summary-item">
          <Text tag="p">
            Total Pending:{' '}
            {currencyFormatter(allCalculatedExpenses.totalPending)}
          </Text>
        </div>
      </div>
      <div className="expenses__table">
        <Table headers={generateHeaders()} items={calculatedExpenses} />
      </div>
    </div>
  );
};

export default Expenses;