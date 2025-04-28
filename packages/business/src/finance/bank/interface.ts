import type {
  IBank,
  ICreateBankParams,
  IUpdateBankParams,
} from '../../api/nest/finance/bank';

export type BankEntity = IBank;

export type CreateBankParams = ICreateBankParams;

export type UpdateBankParams = IUpdateBankParams;