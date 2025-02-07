import SupplierCategory from '../supplierCategory';
import { HOUSING } from '../../type';

export const RENT: SupplierCategory = new SupplierCategory({
  name: 'Rent',
  type: HOUSING,
});

export const ELECTRICITY_BILL: SupplierCategory = new SupplierCategory({
  name: 'Electricity Bill',
  type: HOUSING,
});

export const IPTU: SupplierCategory = new SupplierCategory({
  name: 'IPTU',
  type: HOUSING,
});

export const INTERNET: SupplierCategory = new SupplierCategory({
  name: 'Internet',
  type: HOUSING,
});

export const GARAGE: SupplierCategory = new SupplierCategory({
  name: 'Garage',
  type: HOUSING,
});

export const DAY_LABORER: SupplierCategory = new SupplierCategory({
  name: 'Day laborer',
  type: HOUSING,
});

export const HOUSING_CATEGORY_SEEDS: Array<SupplierCategory> = [
  RENT,
  IPTU,
  GARAGE,
  INTERNET,
  ELECTRICITY_BILL,
  DAY_LABORER,
];