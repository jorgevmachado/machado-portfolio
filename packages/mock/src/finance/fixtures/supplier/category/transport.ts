import SupplierCategory from '@repo/business/finance/supplier/category/supplierCategory';

import { TRANSPORT_SUPPLIER_TYPE_FIXTURE } from '../type';

export const FUEL_SUPPLIER_CATEGORY_FIXTURE: SupplierCategory =
  new SupplierCategory({
    name: 'fuel',
    type: TRANSPORT_SUPPLIER_TYPE_FIXTURE,
  });

export const MAINTENANCE_SUPPLIER_CATEGORY_FIXTURE: SupplierCategory =
  new SupplierCategory({
    name: 'Maintenance',
    type: TRANSPORT_SUPPLIER_TYPE_FIXTURE,
  });

export const INSURANCE_SUPPLIER_CATEGORY_FIXTURE: SupplierCategory =
  new SupplierCategory({
    name: 'Insurance',
    type: TRANSPORT_SUPPLIER_TYPE_FIXTURE,
  });

export const INSTALLMENT_SUPPLIER_CATEGORY_FIXTURE: SupplierCategory =
  new SupplierCategory({
    name: 'Installment',
    type: TRANSPORT_SUPPLIER_TYPE_FIXTURE,
  });

export const TICKET_SUPPLIER_CATEGORY_FIXTURE: SupplierCategory =
  new SupplierCategory({
    name: 'Ticket',
    type: TRANSPORT_SUPPLIER_TYPE_FIXTURE,
  });

export const TRANSPORT_BY_APPLICATION_SUPPLIER_CATEGORY_FIXTURE: SupplierCategory =
  new SupplierCategory({
    name: 'Transport by Application',
    type: TRANSPORT_SUPPLIER_TYPE_FIXTURE,
  });

export const LIST_TRANSPORT_SUPPLIER_CATEGORY_FIXTURE: Array<SupplierCategory> =
  [
    FUEL_SUPPLIER_CATEGORY_FIXTURE,
    TICKET_SUPPLIER_CATEGORY_FIXTURE,
    INSURANCE_SUPPLIER_CATEGORY_FIXTURE,
    MAINTENANCE_SUPPLIER_CATEGORY_FIXTURE,
    INSTALLMENT_SUPPLIER_CATEGORY_FIXTURE,
    TRANSPORT_BY_APPLICATION_SUPPLIER_CATEGORY_FIXTURE,
  ];