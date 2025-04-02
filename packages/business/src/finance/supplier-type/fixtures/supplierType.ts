import {
  findEntityBy,
  transformObjectDateAndNulls,
} from '@repo/services/entities/entities';

import SUPPLIER_TYPE_LIST_FIXTURE_JSON from '@repo/mock-json/finance/supplier-type/supplier-types.json';

import SupplierType from '../supplierType';

const SUPPLIER_TYPE_LIST_TEMP: Array<SupplierType> =
  SUPPLIER_TYPE_LIST_FIXTURE_JSON.map((supplierType) =>
    transformObjectDateAndNulls<SupplierType, unknown>(supplierType),
  );

export const HOUSING_SUPPLIER_TYPE_FIXTURE: SupplierType = findEntityBy({
  key: 'name_code',
  value: 'housing',
  list: SUPPLIER_TYPE_LIST_TEMP,
});

export const FOOD_SUPPLIER_TYPE_FIXTURE: SupplierType = findEntityBy({
  key: 'name_code',
  value: 'food',
  list: SUPPLIER_TYPE_LIST_TEMP,
});

export const TRANSPORT_SUPPLIER_TYPE_FIXTURE: SupplierType = findEntityBy({
  key: 'name_code',
  value: 'transport',
  list: SUPPLIER_TYPE_LIST_TEMP,
});

export const HEALTH_SUPPLIER_TYPE_FIXTURE: SupplierType = findEntityBy({
  key: 'name_code',
  value: 'health',
  list: SUPPLIER_TYPE_LIST_TEMP,
});

export const LEISURE_SUPPLIER_TYPE_FIXTURE: SupplierType = findEntityBy({
  key: 'name_code',
  value: 'leisure',
  list: SUPPLIER_TYPE_LIST_TEMP,
});

export const EDUCATION_SUPPLIER_TYPE_FIXTURE: SupplierType = findEntityBy({
  key: 'name_code',
  value: 'education',
  list: SUPPLIER_TYPE_LIST_TEMP,
});

export const BILLS_SUPPLIER_TYPE_FIXTURE: SupplierType = findEntityBy({
  key: 'name_code',
  value: 'bills',
  list: SUPPLIER_TYPE_LIST_TEMP,
});

export const UNKNOWN_SUPPLIER_TYPE_FIXTURE: SupplierType = findEntityBy({
  key: 'name_code',
  value: 'unknown',
  list: SUPPLIER_TYPE_LIST_TEMP,
});

export const SUPPLIER_TYPE_LIST_FIXTURE: Array<SupplierType> = [
  HOUSING_SUPPLIER_TYPE_FIXTURE,
  FOOD_SUPPLIER_TYPE_FIXTURE,
  TRANSPORT_SUPPLIER_TYPE_FIXTURE,
  HEALTH_SUPPLIER_TYPE_FIXTURE,
  LEISURE_SUPPLIER_TYPE_FIXTURE,
  EDUCATION_SUPPLIER_TYPE_FIXTURE,
  UNKNOWN_SUPPLIER_TYPE_FIXTURE,
  BILLS_SUPPLIER_TYPE_FIXTURE,
];