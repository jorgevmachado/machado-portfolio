import { EExpenseType } from '@repo/business/finance/enum';
import Expense from '@repo/business/finance/expense/expense';

import { PAO_DE_ACUCAR_SUPPLIER_FIXTURE } from '../../../../../supplier';

export const PAO_DE_ACUCAR_DIGITAL_WALLET_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE: Expense = new Expense({
  id: '2c4213af-bd6f-446a-b64e-5d7f7e9580a8',
  year: 2025,
  type: EExpenseType.VARIABLE,
  supplier: PAO_DE_ACUCAR_SUPPLIER_FIXTURE,
  january: 68.93,
  february: 0,
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

export const DIGITAL_WALLET_NUBANK_CREDIT_CARD_EXPENSE_LIST_FIXTURE: Array<Expense> =
  [PAO_DE_ACUCAR_DIGITAL_WALLET_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE];