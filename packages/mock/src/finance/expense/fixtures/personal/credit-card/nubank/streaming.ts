import { EExpenseType } from '@repo/business/finance/enum';
import Expense from '@repo/business/finance/expense/expense';

import {
  HBO_MAX_SUPPLIER_FIXTURE,
  NETFLIX_SUPPLIER_FIXTURE,
} from '../../../../../supplier';

export const NETFLIX_STREAMING_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE: Expense =
  new Expense({
    id: '71b187c8-5d21-46b9-954e-bb9547d5eeab',
    year: 2025,
    type: EExpenseType.FIXED,
    supplier: NETFLIX_SUPPLIER_FIXTURE,
    january: 44.9,
    february: 44.9,
    march: 44.9,
    april: 44.9,
    may: 44.9,
    june: 44.9,
    july: 44.9,
    august: 44.9,
    september: 44.9,
    october: 44.9,
    november: 44.9,
    december: 44.9,
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

export const HBO_MAX_STREAMING_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE: Expense =
  new Expense({
    id: '2c984b43-87f8-40f9-901c-6c02e941740d',
    year: 2025,
    type: EExpenseType.FIXED,
    supplier: HBO_MAX_SUPPLIER_FIXTURE,
    january: 19.95,
    february: 19.95,
    march: 19.95,
    april: 19.95,
    may: 19.95,
    june: 19.95,
    july: 19.95,
    august: 19.95,
    september: 19.95,
    october: 19.95,
    november: 19.95,
    december: 19.95,
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

export const STREAMING_NUBANK_CREDIT_CARD_EXPENSE_LIST_FIXTURE: Array<Expense> =
  [
    NETFLIX_STREAMING_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE,
    HBO_MAX_STREAMING_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE,
  ];