import type { IFinanceBase } from '../interface';
import type { ISupplierType } from '../supplier-type';

export interface ISupplier extends IFinanceBase {
  type: ISupplierType;
  active?: boolean;
  description?: string;
}

export interface ICreateSupplierParams
  extends Omit<
    ISupplier,
    'id' | 'type' | 'created_at' | 'updated_at' | 'deleted_at'
  > {
  type: string | ISupplier['type'];
}

export type IUpdateSupplierParams = ICreateSupplierParams;