import type { INestBaseEntity, INestBaseResponse } from '../interface';
import type { IUser } from '../auth';
import { IBank } from './bank';
import { ISupplier } from './supplier';
import { IBill } from './bill';

export interface IFinanceBase extends INestBaseEntity {
  name: string;
}

export type IFinanceResponse = INestBaseResponse;

export interface IFinance extends Omit<IFinanceBase, 'name'> {
  user: IUser;
  bills?: Array<IBill>;
}

export interface ICreateFinanceParams extends Omit<IFinance, 'bills' | 'banks' | 'suppliers'> {
  bills?: Array<string | IBill>;
  banks?: Array<string | IBank>;
  suppliers?: Array<string | ISupplier>;
}
export type IUpdateFinanceParams = ICreateFinanceParams;

export * from './supplier-type/interface';
export * from './supplier/interface';
export * from './expense/interface';