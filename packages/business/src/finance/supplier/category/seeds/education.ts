import { EDUCATION } from '../../type';
import SupplierCategory from '../supplierCategory';

export const COURSE: SupplierCategory = new SupplierCategory({
  name: 'Course',
  type: EDUCATION,
});

export const EDUCATION_CATEGORY_SEEDS: Array<SupplierCategory> = [COURSE];