import SupplierType from '@repo/business/finance/supplier-type/supplierType';

import { FinanceEntity } from '../../interface';

export const HOUSING_SUPPLIER_TYPE_FIXTURE: SupplierType = new SupplierType({
  id: '8df2ee99-cfce-435a-9df0-efd533d825b7',
  name: 'Housing',
  created_at: new Date('2025-02-11T19:00:18.670Z'),
  updated_at: new Date('2025-02-11T19:00:18.670Z'),
  deleted_at: null,
});
export const FOOD_SUPPLIER_TYPE_FIXTURE: SupplierType = new SupplierType({
  id: '66efe38d-6878-4a55-8898-5feadce8f6ca',
  name: 'Food',
  created_at: new Date('2025-02-11T19:00:18.686Z'),
  updated_at: new Date('2025-02-11T19:00:18.686Z'),
  deleted_at: null,
});
export const TRANSPORT_SUPPLIER_TYPE_FIXTURE: SupplierType = new SupplierType({
  id: '5e9f3895-4b9f-473b-b100-43a51d25d4cc',
  name: 'Transport',
  created_at: new Date('2025-02-11T19:00:18.686Z'),
  updated_at: new Date('2025-02-11T19:00:18.686Z'),
  deleted_at: null,
});
export const HEALTH_SUPPLIER_TYPE_FIXTURE: SupplierType = new SupplierType({
  id: '1f886516-c5fa-4ca5-8e16-e395a65598cd',
  name: 'Health',
  created_at: new Date('2025-02-11T19:00:18.687Z'),
  updated_at: new Date('2025-02-11T19:00:18.687Z'),
  deleted_at: null,
});
export const LEISURE_SUPPLIER_TYPE_FIXTURE: SupplierType = new SupplierType({
  id: '9a8e83c3-8fc0-498d-bb1e-39f7c6d57fd9',
  name: 'Leisure',
  created_at: new Date('2025-02-11T19:00:18.686Z'),
  updated_at: new Date('2025-02-11T19:00:18.686Z'),
  deleted_at: null,
});
export const EDUCATION_SUPPLIER_TYPE_FIXTURE: SupplierType = new SupplierType({
  id: '693a8c6a-0832-4acc-9a00-2f38ac2cab7b',
  name: 'Education',
  created_at: new Date('2025-02-11T19:00:18.688Z'),
  updated_at: new Date('2025-02-11T19:00:18.688Z'),
  deleted_at: null,
});
export const BILLS_SUPPLIER_TYPE_FIXTURE: SupplierType = new SupplierType({
  id: 'afdb7bc2-78ad-459c-9d1f-27b99e38f954',
  name: 'Bills',
  created_at: new Date('2025-02-11T19:00:18.688Z'),
  updated_at: new Date('2025-02-11T19:00:18.688Z'),
  deleted_at: null,
});
export const UNKNOWN_SUPPLIER_TYPE_FIXTURE: SupplierType = new SupplierType({
  id: '10f85833-96e5-44c6-a73a-9f4960ba9279',
  name: 'Unknown',
  created_at: new Date('2025-02-11T19:00:18.687Z'),
  updated_at: new Date('2025-02-11T19:00:18.687Z'),
  deleted_at: null,
});

export const LIST_SUPPLIER_TYPE_FIXTURE: Array<SupplierType> = [
  HOUSING_SUPPLIER_TYPE_FIXTURE,
  FOOD_SUPPLIER_TYPE_FIXTURE,
  TRANSPORT_SUPPLIER_TYPE_FIXTURE,
  HEALTH_SUPPLIER_TYPE_FIXTURE,
  LEISURE_SUPPLIER_TYPE_FIXTURE,
  EDUCATION_SUPPLIER_TYPE_FIXTURE,
  UNKNOWN_SUPPLIER_TYPE_FIXTURE,
  BILLS_SUPPLIER_TYPE_FIXTURE,
];

export const SUPPLIER_TYPE_FINANCE_ENTITY: FinanceEntity = {
  id: 'SUPPLIER_TYPE',
  label: 'Supplier Type',
  alias: 'supplier_types',
  list: LIST_SUPPLIER_TYPE_FIXTURE,
};