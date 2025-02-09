import SupplierCategory from '@repo/business/finance/supplier/category/supplierCategory';

import { LEISURE_SUPPLIER_TYPE_FIXTURE } from '../type';

export const STREAMING_SUBSCRIPTIONS_SUPPLIER_CATEGORY_FIXTURE: SupplierCategory =
  new SupplierCategory({
    name: 'Streaming Subscriptions',
    type: LEISURE_SUPPLIER_TYPE_FIXTURE,
  });

export const CLOTHES_SUPPLIER_CATEGORY_FIXTURE: SupplierCategory =
  new SupplierCategory({
    name: 'Clothes',
    type: LEISURE_SUPPLIER_TYPE_FIXTURE,
  });

export const LIST_LEISURE_SUPPLIER_CATEGORY_FIXTURE: Array<SupplierCategory> = [
  CLOTHES_SUPPLIER_CATEGORY_FIXTURE,
  STREAMING_SUBSCRIPTIONS_SUPPLIER_CATEGORY_FIXTURE,
];