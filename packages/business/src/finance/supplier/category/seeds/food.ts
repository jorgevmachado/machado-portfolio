import SupplierCategory from '../supplierCategory';
import { FOOD } from '../../type';

export const MARKET: SupplierCategory = new SupplierCategory({
  name: 'Market',
  type: FOOD,
});

export const FOOD_BY_APP: SupplierCategory = new SupplierCategory({
  name: 'Food by App',
  type: FOOD,
});

export const FOOD_CATEGORY_SEEDS: Array<SupplierCategory> = [
    MARKET,
    FOOD_BY_APP,
]