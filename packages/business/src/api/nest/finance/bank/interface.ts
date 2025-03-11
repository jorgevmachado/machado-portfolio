import type { IFinanceBase } from '../interface';

export type IBank = IFinanceBase;

export type IBankParams = Pick<IFinanceBase, 'name'>;