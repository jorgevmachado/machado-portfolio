import SupplierCategory from '@repo/business/finance/supplier/category/supplierCategory';

import { HEALTH_SUPPLIER_TYPE_FIXTURE } from '../type';

export const REMEDIES_SUPPLIER_CATEGORY_FIXTURE: SupplierCategory = new SupplierCategory({
  name: 'Remedies',
  type: HEALTH_SUPPLIER_TYPE_FIXTURE,
});

export const HEALTH_PLAN_SUPPLIER_CATEGORY_FIXTURE: SupplierCategory = new SupplierCategory({
  name: 'Health Plan',
  type: HEALTH_SUPPLIER_TYPE_FIXTURE,
});

export const DENTAL_PLAN_SUPPLIER_CATEGORY_FIXTURE: SupplierCategory = new SupplierCategory({
  name: 'Dental Plan',
  type: HEALTH_SUPPLIER_TYPE_FIXTURE,
});

export const PRIVATE_DOCTOR_SUPPLIER_CATEGORY_FIXTURE: SupplierCategory = new SupplierCategory({
  name: 'Private doctor',
  type: HEALTH_SUPPLIER_TYPE_FIXTURE,
});

export const PRIVATE_DENTIST_SUPPLIER_CATEGORY_FIXTURE: SupplierCategory = new SupplierCategory({
  name: 'Private Dentist',
  type: HEALTH_SUPPLIER_TYPE_FIXTURE,
});

export const BEARD_OR_HAIR_SUPPLIER_CATEGORY_FIXTURE: SupplierCategory = new SupplierCategory({
  name: 'Beard/Hair',
  type: HEALTH_SUPPLIER_TYPE_FIXTURE,
});

export const GYM_SUPPLIER_CATEGORY_FIXTURE: SupplierCategory = new SupplierCategory({
  name: 'Gym',
  type: HEALTH_SUPPLIER_TYPE_FIXTURE,
});

export const LIST_HEALTH_SUPPLIER_CATEGORY_FIXTURE: Array<SupplierCategory> = [
  GYM_SUPPLIER_CATEGORY_FIXTURE,
  REMEDIES_SUPPLIER_CATEGORY_FIXTURE,
  HEALTH_PLAN_SUPPLIER_CATEGORY_FIXTURE,
  DENTAL_PLAN_SUPPLIER_CATEGORY_FIXTURE,
  BEARD_OR_HAIR_SUPPLIER_CATEGORY_FIXTURE,
  PRIVATE_DOCTOR_SUPPLIER_CATEGORY_FIXTURE,
  PRIVATE_DENTIST_SUPPLIER_CATEGORY_FIXTURE,
];