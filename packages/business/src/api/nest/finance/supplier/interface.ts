import type { IFinanceBase } from '../interface';
import type { ISupplierType } from '../supplier-type';

export interface ISupplier extends IFinanceBase {
  type: ISupplierType;
  description?: string;
}

export interface ICreateSupplierParams
  extends Omit<
    ISupplier,
    'id' | 'type' | 'name_code' | 'created_at' | 'updated_at' | 'deleted_at'
  > {
  type: string | ISupplier['type'];
}

export type IUpdateSupplierParams = ICreateSupplierParams;