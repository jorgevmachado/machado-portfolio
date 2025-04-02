import {
    findEntityBy,
    transformObjectDateAndNulls,
} from '@repo/services/entities/entities';


import BILL_CATEGORY_LIST_FIXTURE_JSON from '@repo/mock-json/finance/bill-category/bill-categories.json';

import BillCategory from '../billCategory';

const BILL_CATEGORY_LIST_TEMP: Array<BillCategory> =
  BILL_CATEGORY_LIST_FIXTURE_JSON.map(
    (billCategory) => transformObjectDateAndNulls<BillCategory, unknown>(billCategory),
  );

export const INGRID_RESIDENTIAL_BILL_CATEGORY_FIXTURE: BillCategory =
  findEntityBy({
    key: 'name_code',
    value: 'ingrid_residential',
    list: BILL_CATEGORY_LIST_TEMP,
  });

export const MONTE_CARLO_RESIDENTIAL_BILL_CATEGORY_FIXTURE: BillCategory =
  findEntityBy({
    key: 'name_code',
    value: 'monte_carlo_residential',
    list: BILL_CATEGORY_LIST_TEMP,
  });

export const MOTHER_BILL_CATEGORY_FIXTURE: BillCategory = findEntityBy({
  key: 'name_code',
  value: 'mother',
  list: BILL_CATEGORY_LIST_TEMP,
});

export const PERSONAL_BILL_CATEGORY_FIXTURE: BillCategory = findEntityBy({
  key: 'name_code',
  value: 'personal',
  list: BILL_CATEGORY_LIST_TEMP,
});

export const BILL_CATEGORY_LIST_FIXTURE: Array<BillCategory> = [
  INGRID_RESIDENTIAL_BILL_CATEGORY_FIXTURE,
  MONTE_CARLO_RESIDENTIAL_BILL_CATEGORY_FIXTURE,
  MOTHER_BILL_CATEGORY_FIXTURE,
  PERSONAL_BILL_CATEGORY_FIXTURE,
];