import SupplierCategory from '../supplierCategory';
import { HOUSING_CATEGORY_SEEDS } from './housing';
import { FOOD_CATEGORY_SEEDS } from './food';
import { TRANSPORT_CATEGORY_SEEDS } from './transport';
import { HEALTH_CATEGORY_SEEDS } from './health';
import { LEISURE_CATEGORY_SEEDS } from './leisure';
import { EDUCATION_CATEGORY_SEEDS } from './education';

export const SUPPLIER_CATEGORY_SEEDS: Array<SupplierCategory> = [
  ...HOUSING_CATEGORY_SEEDS,
  ...FOOD_CATEGORY_SEEDS,
  ...TRANSPORT_CATEGORY_SEEDS,
  ...HEALTH_CATEGORY_SEEDS,
  ...LEISURE_CATEGORY_SEEDS,
  ...EDUCATION_CATEGORY_SEEDS,
];