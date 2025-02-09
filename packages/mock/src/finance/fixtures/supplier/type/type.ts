import SupplierType from '@repo/business/finance/supplier/type/supplierType';

export const HOUSING_SUPPLIER_TYPE_FIXTURE: SupplierType = new SupplierType({ name: 'Housing' });
export const FOOD_SUPPLIER_TYPE_FIXTURE: SupplierType = new SupplierType({ name: 'Food' });
export const TRANSPORT_SUPPLIER_TYPE_FIXTURE: SupplierType = new SupplierType({ name: 'Transport' });
export const HEALTH_SUPPLIER_TYPE_FIXTURE: SupplierType = new SupplierType({ name: 'Health' });
export const LEISURE_SUPPLIER_TYPE_FIXTURE: SupplierType = new SupplierType({ name: 'Leisure' });
export const EDUCATION_SUPPLIER_TYPE_FIXTURE: SupplierType = new SupplierType({ name: 'Education' });

export const LIST__SUPPLIER_TYPE_FIXTURE: Array<SupplierType> = [
  HOUSING_SUPPLIER_TYPE_FIXTURE,
  FOOD_SUPPLIER_TYPE_FIXTURE,
  TRANSPORT_SUPPLIER_TYPE_FIXTURE,
  HEALTH_SUPPLIER_TYPE_FIXTURE,
  LEISURE_SUPPLIER_TYPE_FIXTURE,
  EDUCATION_SUPPLIER_TYPE_FIXTURE,
];