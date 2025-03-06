import Expense from '@repo/business/finance/expense/expense';
import { EExpenseType } from '@repo/business/finance/enum';

import { USER_FIXTURE } from '../../../../../auth';
import { PERSONAL_EXPENSE_GROUP_FIXTURE } from '../../../../expense-group';
import { AMAZON_SUPPLIER_FIXTURE } from '../../../../supplier';
import { CHINA_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE } from '../../../../expense-category';

export const CHINA_IN_BOX_CHINA_PERSONAL_FIXTURE: Expense = new Expense({
  id: '0e49cb9a-ded0-40e5-8a1d-c36bd9956c52',
  year: 2025,
  user: USER_FIXTURE,
  type: EExpenseType.VARIABLE,
  group: PERSONAL_EXPENSE_GROUP_FIXTURE,
  supplier: AMAZON_SUPPLIER_FIXTURE,
  category: CHINA_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE,
  january: 99.79,
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

export const CHINA_IN_BOX_PERSONAL_LIST_FIXTURE: Array<Expense> = [
  CHINA_IN_BOX_CHINA_PERSONAL_FIXTURE,
];