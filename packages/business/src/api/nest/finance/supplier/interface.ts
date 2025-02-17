import type { IFinanceBase, IFinanceResponse } from '../interface';
import type { ISupplierType } from '../supplier-type';

export interface ISupplier extends IFinanceBase {
  type: ISupplierType;
  active?: boolean;
  description?: string;
}

export type ISupplierParams = Omit<
  ISupplier,
  'id' | 'created_at' | 'updated_at' | 'deleted_at'
>;

export type ISupplierResponse = IFinanceResponse;