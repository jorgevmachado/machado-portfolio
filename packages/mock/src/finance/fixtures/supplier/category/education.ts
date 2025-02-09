import SupplierCategory from '@repo/business/finance/supplier/category/supplierCategory';

import { EDUCATION_SUPPLIER_TYPE_FIXTURE } from '../type';

export const COURSE_SUPPLIER_CATEGORY_FIXTURE: SupplierCategory = new SupplierCategory({
  name: 'Course',
  type: EDUCATION_SUPPLIER_TYPE_FIXTURE,
});

export const LIST_EDUCATION_CATEGORY_FIXTURE: Array<SupplierCategory> = [COURSE_SUPPLIER_CATEGORY_FIXTURE];