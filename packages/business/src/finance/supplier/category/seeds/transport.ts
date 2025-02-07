import SupplierCategory from '../supplierCategory';
import { TRANSPORT } from '../../type';

export const FUEL: SupplierCategory = new SupplierCategory({
  name: 'fuel',
  type: TRANSPORT,
});

export const MAINTENANCE: SupplierCategory = new SupplierCategory({
  name: 'Maintenance',
  type: TRANSPORT,
});

export const INSURANCE: SupplierCategory = new SupplierCategory({
  name: 'Insurance',
  type: TRANSPORT,
});

export const INSTALLMENT: SupplierCategory = new SupplierCategory({
  name: 'Installment',
  type: TRANSPORT,
});

export const TICKET: SupplierCategory = new SupplierCategory({
  name: 'Ticket',
  type: TRANSPORT,
});

export const TRANSPORT_BY_APPLICATION: SupplierCategory = new SupplierCategory({
  name: 'Transport by Application',
  type: TRANSPORT,
});

export const TRANSPORT_CATEGORY_SEEDS: Array<SupplierCategory> = [
  FUEL,
  TICKET,
  INSURANCE,
  MAINTENANCE,
  INSTALLMENT,
  TRANSPORT_BY_APPLICATION,
];