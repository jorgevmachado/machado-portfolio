import Finance from '@repo/business/finance/finance';

import { USER_FIXTURE } from '../../auth';

import { BILL_LIST_FIXTURE } from '../bill/fixtures/bill';

export const FINANCE_FIXTURE: Finance = new Finance({
  id: '493de6c1-ec4b-48a7-9169-c8ba750798ce',
  user: USER_FIXTURE,
  bills: undefined,
  created_at: new Date('2025-02-01T17:37:47.783Z'),
  updated_at: new Date('2025-02-01T14:40:31.207Z'),
});

export const FINANCE_FIXTURE_COMPLETE: Finance = new Finance({
  id: '493de6c1-ec4b-48a7-9169-c8ba750798ce',
  user: USER_FIXTURE,
  bills: BILL_LIST_FIXTURE,
  created_at: new Date('2025-02-01T17:37:47.783Z'),
  updated_at: new Date('2025-02-01T14:40:31.207Z'),
});