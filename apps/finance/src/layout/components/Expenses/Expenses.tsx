import React from 'react';

import { Expense } from '@repo/business/api/nest/finance/expense';

import Table from '@repo/ds/components/table/Table';
import Bill from '@repo/business/finance/bill';

type ExpensesProps = {
  expenses: Array<Expense> | Bill['expenses'];
};

const Expenses: React.FC<ExpensesProps> = ({ expenses }) => {
  return (
    <Table
      headers={[
        {
          text: 'supplier',
          value: 'supplier.name',
        },
        {
          text: 'january',
          value: 'january',
        },
        {
          text: 'february',
          value: 'february',
        },
        {
          text: 'march',
          value: 'march',
        },
        {
          text: 'april',
          value: 'april',
        },
        {
          text: 'may',
          value: 'may',
        },
        {
          text: 'june',
          value: 'june',
        },
        {
          text: 'july',
          value: 'july',
        },
        {
          text: 'august',
          value: 'august',
        },
        {
          text: 'september',
          value: 'september',
        },
        {
          text: 'october',
          value: 'october',
        },
        {
          text: 'november',
          value: 'november',
        },
        {
          text: 'december',
          value: 'december',
        },
        {
          text: 'total',
          value: 'total',
        },
      ]}
      items={expenses ?? []}
    />
  );
};

export default Expenses;