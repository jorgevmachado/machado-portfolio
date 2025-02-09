import SupplierCategory from '@repo/business/finance/supplier/category/supplierCategory';

import { FOOD_SUPPLIER_TYPE_FIXTURE } from '../type';

export const MARKET_SUPPLIER_CATEGORY_FIXTURE: SupplierCategory = new SupplierCategory({
  name: 'Market',
  type: FOOD_SUPPLIER_TYPE_FIXTURE,
});

export const FOOD_BY_APP_SUPPLIER_CATEGORY_FIXTURE: SupplierCategory = new SupplierCategory({
  name: 'Food by App',
  type: FOOD_SUPPLIER_TYPE_FIXTURE,
});

export const LIST_FOOD_SUPPLIER_CATEGORY_FIXTURE: Array<SupplierCategory> = [
    MARKET_SUPPLIER_CATEGORY_FIXTURE,
    FOOD_BY_APP_SUPPLIER_CATEGORY_FIXTURE,
]