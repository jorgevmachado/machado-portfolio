import Bill from '@repo/business/finance/bill/bill';

import { INGRID_RESIDENTIAL_BILL_LIST_FIXTURE } from './ingrid';
import { MONTE_CARLO_RESIDENTIAL_BILL_LIST_FIXTURE } from './monte-carlo';
import { MOTHER_BILL_LIST_FIXTURE } from './mother';
import { PERSONAL_BILL_LIST_FIXTURE } from './personal';

export const BILL_LIST_FIXTURE: Array<Bill> = [
  ...INGRID_RESIDENTIAL_BILL_LIST_FIXTURE,
  ...MONTE_CARLO_RESIDENTIAL_BILL_LIST_FIXTURE,
  ...MOTHER_BILL_LIST_FIXTURE,
  ...PERSONAL_BILL_LIST_FIXTURE,
];