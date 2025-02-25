import type { IFinanceBase, IFinanceResponse } from '../interface';
import type { ISupplierType } from '../supplier-type';

export interface ISupplier extends IFinanceBase {
  type: ISupplierType;
  active?: boolean;
  description?: string;
}

export interface ISupplierParams extends Omit<
  ISupplier,
  'id' | 'type' | 'created_at' | 'updated_at' | 'deleted_at'
> {
  type: string;
}

export type ISupplierResponse = IFinanceResponse;