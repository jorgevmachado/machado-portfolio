import BillCategory from '../billCategory';

import { findEntityBy } from '@repo/services/entities/entities';

import BILL_CATEGORY_LIST_FIXTURE_JSON from '@repo/mock-json/finance/bill-category/bill-categories.json';

const BILL_CATEGORY_LIST_TEMP: Array<BillCategory> =
  BILL_CATEGORY_LIST_FIXTURE_JSON.map(
    (billCategory) => billCategory as unknown as BillCategory,
  );

export const INGRID_RESIDENTIAL_BILL_CATEGORY_FIXTURE: BillCategory =
  findEntityBy({
    key: 'name',
    value: 'Ingrid Residential',
    list: BILL_CATEGORY_LIST_TEMP,
  });

export const MONTE_CARLO_RESIDENTIAL_BILL_CATEGORY_FIXTURE: BillCategory =
  findEntityBy({
    key: 'name',
    value: 'Monte Carlo Residential',
    list: BILL_CATEGORY_LIST_TEMP,
  });

export const MOTHER_BILL_CATEGORY_FIXTURE: BillCategory = findEntityBy({
  key: 'name',
  value: 'Mother',
  list: BILL_CATEGORY_LIST_TEMP,
});

export const PERSONAL_BILL_CATEGORY_FIXTURE: BillCategory = findEntityBy({
  key: 'name',
  value: 'Personal',
  list: BILL_CATEGORY_LIST_TEMP,
});

export const BILL_CATEGORY_LIST_FIXTURE: Array<BillCategory> = [
  INGRID_RESIDENTIAL_BILL_CATEGORY_FIXTURE,
  MONTE_CARLO_RESIDENTIAL_BILL_CATEGORY_FIXTURE,
  MOTHER_BILL_CATEGORY_FIXTURE,
  PERSONAL_BILL_CATEGORY_FIXTURE,
];