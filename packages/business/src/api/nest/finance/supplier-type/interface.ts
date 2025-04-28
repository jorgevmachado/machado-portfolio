import type { IFinanceBase } from '../interface';

export type ISupplierType = IFinanceBase;

export type ICreateSupplierTypeParams = Pick<IFinanceBase, 'name'>;

export type IUpdateSupplierTypeParams = ICreateSupplierTypeParams;