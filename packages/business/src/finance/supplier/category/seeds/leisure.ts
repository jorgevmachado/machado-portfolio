import SupplierCategory from '../supplierCategory';
import { LEISURE } from '../../type';

export const STREAMING_SUBSCRIPTIONS: SupplierCategory = new SupplierCategory({
  name: 'Streaming Subscriptions',
  type: LEISURE,
});

export const CLOTHES: SupplierCategory = new SupplierCategory({
  name: 'Clothes',
  type: LEISURE,
});

export const LEISURE_CATEGORY_SEEDS: Array<SupplierCategory> = [
  CLOTHES,
  STREAMING_SUBSCRIPTIONS,
];