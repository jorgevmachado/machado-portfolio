import SupplierType from '../supplierType';

import { findEntityBy } from '@repo/services/entities/entities';

import SUPPLIER_TYPE_LIST_FIXTURE_JSON from './supplier-types.json';

const SUPPLIER_TYPE_LIST_TEMP: Array<SupplierType> =
  SUPPLIER_TYPE_LIST_FIXTURE_JSON.map(
    (supplierType) => supplierType as unknown as SupplierType,
  );

export const HOUSING_SUPPLIER_TYPE_FIXTURE: SupplierType = findEntityBy({
  key: 'name',
  value: 'Housing',
  list: SUPPLIER_TYPE_LIST_TEMP,
});

export const FOOD_SUPPLIER_TYPE_FIXTURE: SupplierType = findEntityBy({
  key: 'name',
  value: 'Food',
  list: SUPPLIER_TYPE_LIST_TEMP,
});

export const TRANSPORT_SUPPLIER_TYPE_FIXTURE: SupplierType = findEntityBy({
  key: 'name',
  value: 'Transport',
  list: SUPPLIER_TYPE_LIST_TEMP,
});

export const HEALTH_SUPPLIER_TYPE_FIXTURE: SupplierType = findEntityBy({
  key: 'name',
  value: 'Health',
  list: SUPPLIER_TYPE_LIST_TEMP,
});

export const LEISURE_SUPPLIER_TYPE_FIXTURE: SupplierType = findEntityBy({
  key: 'name',
  value: 'Leisure',
  list: SUPPLIER_TYPE_LIST_TEMP,
});

export const EDUCATION_SUPPLIER_TYPE_FIXTURE: SupplierType = findEntityBy({
  key: 'name',
  value: 'Education',
  list: SUPPLIER_TYPE_LIST_TEMP,
});

export const BILLS_SUPPLIER_TYPE_FIXTURE: SupplierType = findEntityBy({
  key: 'name',
  value: 'Bills',
  list: SUPPLIER_TYPE_LIST_TEMP,
});

export const UNKNOWN_SUPPLIER_TYPE_FIXTURE: SupplierType = findEntityBy({
  key: 'name',
  value: 'Unknown',
  list: SUPPLIER_TYPE_LIST_TEMP,
});

export const SUPPLIER_LIST_TYPE_FIXTURE: Array<SupplierType> = [
  HOUSING_SUPPLIER_TYPE_FIXTURE,
  FOOD_SUPPLIER_TYPE_FIXTURE,
  TRANSPORT_SUPPLIER_TYPE_FIXTURE,
  HEALTH_SUPPLIER_TYPE_FIXTURE,
  LEISURE_SUPPLIER_TYPE_FIXTURE,
  EDUCATION_SUPPLIER_TYPE_FIXTURE,
  UNKNOWN_SUPPLIER_TYPE_FIXTURE,
  BILLS_SUPPLIER_TYPE_FIXTURE,
];