import React, { useEffect, useState } from 'react';

import { MONTHS } from '@repo/services/month/month';
import { currencyFormatter } from '@repo/services/formatter/currency/currency';
import { truncateString } from '@repo/services/string/string';

import { EExpenseType } from '@repo/business/finance/enum';

import Bill from '@repo/business/finance/bill';
import Expense from '@repo/business/finance/expense/expense';

import type { TColors } from '@repo/ds/utils/colors/interface';
import { ETypeTableHeaderItem } from '@repo/ds/components/table/enum';
import Text from '@repo/ds/elements/text/Text';
import Table from '@repo/ds/components/table/Table';

import Button from '@repo/ds/components/button/Button';
import Spinner from '@repo/ds/elements/spinner/Spinner';

import CRUDModal from '../../../../layout/components/CRUDModal';

import { expenseBusiness, expenseService } from '../../../../shared';

import useBill from '../../useBill';

import Form from './Form';
import { ExpenseFormFields } from './Form/inteface';

import './Expenses.scss';


type AllCalculatedExpenses = {
  total: number;
  allPaid: boolean;
  totalPaid: number;
  totalPending: number;
};

type ExpensesProps = {
  bill: Bill;
  allCalculated?: AllCalculatedExpenses;
};

const Expenses: React.FC<ExpensesProps> = ({ bill, allCalculated }) => {
  const { handleReload, suppliers } = useBill();
  const [loading, setLoading] = useState<boolean>(false);
  const [calculatedExpenses, setCalculatedExpenses] = useState<Array<Expense>>(
    [],
  );
  const [selectedExpense, setSelectedExpense] = useState<Expense | undefined>(
    undefined,
  );
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [allCalculatedExpenses, setAllCalculatedExpenses] =
    useState<AllCalculatedExpenses>({
      total: 0,
      allPaid: false,
      totalPaid: 0,
      totalPending: 0,
    });

  const generateHeaders = () => {
    const monthHeaders = MONTHS.map((month) => ({
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
      expenseBusiness.calculateExpense(expense),
    );
  };

  const calculateAllExpenses = (expenses: Array<Expense>) => {
    const calculatedAllExpenses = expenseBusiness.calculateAllExpenses(expenses);
    setAllCalculatedExpenses(calculatedAllExpenses);
  }

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setSelectedExpense(undefined);
  };

  const handleOpenModal = (item: Expense) => {
    setSelectedExpense(item);
    setIsModalVisible(true);
    setLoading(false);
  };

  useEffect(() => {
    const calculatedExpenses = calculateExpenses(bill.expenses);
    setCalculatedExpenses((calculatedExpenses as Expense[]) || []);
  }, [bill.expenses]);

  useEffect(() => {
    if(allCalculated) {
      const { total, totalPaid, totalPending, allPaid } = allCalculated;
      if(total === 0 && totalPaid === 0 && totalPending === 0 && !allPaid) {
        calculateAllExpenses(calculatedExpenses);
        return;
      }
      setAllCalculatedExpenses(allCalculated);
      return;
    }
    calculateAllExpenses(calculatedExpenses);
  }, [allCalculated, calculatedExpenses]);

  const handleSaveItem = async (
    fields: ExpenseFormFields,
    expense?: Expense,
  ) => {
    setLoading(true);
    if (!expense) {
      return await expenseService
        .create(bill.id, {
          type: fields.type ?? EExpenseType.VARIABLE,
          paid: fields.paid,
          value: fields.value,
          month: fields.month,
          supplier: fields.supplier?.id || '',
          description: fields.description,
          instalment_number: fields.instalment_number,
        })
        .finally(() => {
          setLoading(false);
          handleReload(true);
        });
    }
    return await expenseService
      .update(bill.id, expense.id, {
        ...expense,
        ...fields,
        type: fields.type ?? EExpenseType.VARIABLE,
        supplier: fields.supplier || '',
      })
      .finally(() => {
        setLoading(false);
        handleReload(true);
      });
  };

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
        <div className="expenses__summary-item">
          <Button onClick={() => setIsModalVisible(true)} context="success">
            Add Expense
          </Button>
        </div>
      </div>
      <div className="expenses__table">
        <Table
          headers={generateHeaders()}
          items={calculatedExpenses}
          onRowClick={(item) => handleOpenModal(item as Expense)}
        />
      </div>
      {isModalVisible && (
        <CRUDModal title={`${selectedExpense ? 'Edit' : 'Create'} Expense`} onClose={handleCloseModal} width="500px">
          {loading ? (
            <Spinner context="neutral" />
          ) : (
            <Form
              expense={selectedExpense}
              suppliers={suppliers}
              handleSaveItem={handleSaveItem}
              handleCloseModal={handleCloseModal}
            />
          )}
        </CRUDModal>
      )}
    </div>
  );
};

export default Expenses;