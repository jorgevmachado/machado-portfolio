import type { IFinanceBase } from '../interface';

export type IBank = IFinanceBase;

export type ICreateBankParams = Pick<IBank, 'name'>;

export type IUpdateBankParams = ICreateBankParams;