import type { IFinanceBase } from '../interface';
import type { ISupplierType } from '../supplier-type';

export interface ISupplier extends IFinanceBase {
  type: ISupplierType;
  active?: boolean;
  description?: string;
}