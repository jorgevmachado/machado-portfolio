import Expense from '@repo/business/finance/expense/expense';

import { NUBANK_PERSONAL_LIST_FIXTURE } from './nubank';
import { PORTO_PERSONAL_LIST_FIXTURE } from './porto';

export const PERSONAL_LIST_FIXTURE: Array<Expense> = [
  ...NUBANK_PERSONAL_LIST_FIXTURE,
  ...PORTO_PERSONAL_LIST_FIXTURE,
];
