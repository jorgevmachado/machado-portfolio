import { EExpenseType } from '@repo/business/finance/enum';
import Expense from '@repo/business/finance/expense/expense';

import { AMAZON_SUPPLIER_FIXTURE } from '../../../../../supplier';

export const AMAZON_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE: Expense = new Expense({
  id: '0ba093b0-22ab-444d-8a2a-41f414a8212d',
  year: 2025,
  type: EExpenseType.VARIABLE,
  supplier: AMAZON_SUPPLIER_FIXTURE,
  january: 0,
  february: 69.9,
  march: 0,
  april: 0,
  may: 0,
  june: 0,
  july: 0,
  august: 0,
  september: 0,
  october: 0,
  november: 0,
  december: 0,
  january_paid: true,
  february_paid: true,
  march_paid: false,
  april_paid: false,
  may_paid: false,
  june_paid: false,
  july_paid: false,
  august_paid: false,
  september_paid: false,
  october_paid: false,
  november_paid: false,
  december_paid: false,
  description: null,
  created_at: new Date('2025-01-01T17:37:47.783Z'),
  updated_at: new Date('2025-01-01T14:40:31.207Z'),
  deleted_at: null,
  instalment_number: 1,
});

export const AMAZON_NUBANK_CREDIT_CARD_EXPENSE_LIST_FIXTURE: Array<Expense> = [
    AMAZON_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE
]