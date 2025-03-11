import type { INestBaseEntity, INestBaseResponse } from '../interface';
import type { IUser } from '../auth';

export interface IFinanceBase extends INestBaseEntity {
  name: string;
}

export type IFinanceResponse = INestBaseResponse;

export interface IFinance extends IFinanceBase {
  user: IUser;
  year: number;
}

export * from './supplier-type/interface';
export * from './supplier/interface';
export * from './expense/interface';