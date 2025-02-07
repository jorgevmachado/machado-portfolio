import SupplierCategory from '../supplierCategory';
import { HEALTH } from '../../type';

export const REMEDIES: SupplierCategory = new SupplierCategory({
  name: 'Remedies',
  type: HEALTH,
});

export const HEALTH_PLAN: SupplierCategory = new SupplierCategory({
  name: 'Health Plan',
  type: HEALTH,
});

export const DENTAL_PLAN: SupplierCategory = new SupplierCategory({
  name: 'Dental Plan',
  type: HEALTH,
});

export const PRIVATE_DOCTOR: SupplierCategory = new SupplierCategory({
  name: 'Private doctor',
  type: HEALTH,
});

export const PRIVATE_DENTIST: SupplierCategory = new SupplierCategory({
  name: 'Private Dentist',
  type: HEALTH,
});

export const BEARD_OR_HAIR: SupplierCategory = new SupplierCategory({
  name: 'Beard/Hair',
  type: HEALTH,
});

export const GYM: SupplierCategory = new SupplierCategory({
  name: 'Gym',
  type: HEALTH,
});

export const HEALTH_CATEGORY_SEEDS: Array<SupplierCategory> = [
  GYM,
  REMEDIES,
  HEALTH_PLAN,
  DENTAL_PLAN,
  BEARD_OR_HAIR,
  PRIVATE_DOCTOR,
  PRIVATE_DENTIST,
];