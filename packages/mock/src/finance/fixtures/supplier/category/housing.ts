import SupplierCategory from '@repo/business/finance/supplier/category/supplierCategory';

import { HOUSING_SUPPLIER_TYPE_FIXTURE } from '../type';


export const RENT_SUPPLIER_CATEGORY_FIXTURE: SupplierCategory = new SupplierCategory({
  name: 'Rent',
  type: HOUSING_SUPPLIER_TYPE_FIXTURE,
});

export const ELECTRICITY_BILL_SUPPLIER_CATEGORY_FIXTURE: SupplierCategory = new SupplierCategory({
  name: 'Electricity Bill',
  type: HOUSING_SUPPLIER_TYPE_FIXTURE,
});

export const IPTU_SUPPLIER_CATEGORY_FIXTURE: SupplierCategory = new SupplierCategory({
  name: 'IPTU',
  type: HOUSING_SUPPLIER_TYPE_FIXTURE,
});

export const INTERNET_SUPPLIER_CATEGORY_FIXTURE: SupplierCategory = new SupplierCategory({
  name: 'Internet',
  type: HOUSING_SUPPLIER_TYPE_FIXTURE,
});

export const GARAGE_SUPPLIER_CATEGORY_FIXTURE: SupplierCategory = new SupplierCategory({
  name: 'Garage',
  type: HOUSING_SUPPLIER_TYPE_FIXTURE,
});

export const DAY_LABORER_SUPPLIER_CATEGORY_FIXTURE: SupplierCategory = new SupplierCategory({
  name: 'Day laborer',
  type: HOUSING_SUPPLIER_TYPE_FIXTURE,
});

export const LIST_HOUSING_SUPPLIER_CATEGORY_FIXTURE: Array<SupplierCategory> = [
  RENT_SUPPLIER_CATEGORY_FIXTURE,
  IPTU_SUPPLIER_CATEGORY_FIXTURE,
  GARAGE_SUPPLIER_CATEGORY_FIXTURE,
  INTERNET_SUPPLIER_CATEGORY_FIXTURE,
  ELECTRICITY_BILL_SUPPLIER_CATEGORY_FIXTURE,
  DAY_LABORER_SUPPLIER_CATEGORY_FIXTURE,
];