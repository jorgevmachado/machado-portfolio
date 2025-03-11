import { EBillType } from '@repo/business/finance/enum';
import Bill from '@repo/business/finance/bill/bill';

import { USER_FIXTURE } from '../../../../auth';

import { ITAU_BANK_FIXTURE, NUBANK_BANK_FIXTURE } from '../../../bank';
import {
  CONDOMINIUM_MONTE_CARLO_RESIDENTIAL_EXPENSE_FIXTURE,
  DAY_LABORER_MONTE_CARLO_RESIDENTIAL_EXPENSE_FIXTURE,
  ELECTRICITY_BILL_MONTE_CARLO_RESIDENTIAL_EXPENSE_FIXTURE,
  GARAGE_HOUSING_MONTE_CARLO_RESIDENTIAL_EXPENSE_FIXTURE,
  INTERNET_TELEPHONE_FEE_MONTE_CARLO_RESIDENTIAL_EXPENSE_FIXTURE,
  URBAN_PROPERTY_LAND_TAX_MONTE_CARLO_RESIDENTIAL_EXPENSE_FIXTURE,
} from '../../../expense';

export const MONTE_CARLO_RESIDENTIAL_ACCOUNT_DEBIT_ITAU_BILL_FIXTURE: Bill =
  new Bill({
    id: 'b6c3adea-9e79-47c3-a506-0e8a0e8852f6',
    user: USER_FIXTURE,
    year: 2025,
    type: EBillType.ACCOUNT_DEBIT,
    bank: ITAU_BANK_FIXTURE,
    name: 'Monte Carlo Residential Account Debit',
    total: 0,
    expenses: [INTERNET_TELEPHONE_FEE_MONTE_CARLO_RESIDENTIAL_EXPENSE_FIXTURE],
  });

export const MONTE_CARLO_RESIDENTIAL_BANK_SLIP_NUBANK_BILL_FIXTURE: Bill =
  new Bill({
    id: '4c992e7b-12df-4af6-b991-c109b57b9974',
    user: USER_FIXTURE,
    year: 2025,
    type: EBillType.BANK_SLIP,
    bank: NUBANK_BANK_FIXTURE,
    name: 'Monte Carlo Residential Bank Slip',
    total: 0,
    expenses: [
      ELECTRICITY_BILL_MONTE_CARLO_RESIDENTIAL_EXPENSE_FIXTURE,
      URBAN_PROPERTY_LAND_TAX_MONTE_CARLO_RESIDENTIAL_EXPENSE_FIXTURE,
      CONDOMINIUM_MONTE_CARLO_RESIDENTIAL_EXPENSE_FIXTURE,
    ],
  });

export const MONTE_CARLO_RESIDENTIAL_PIX_NUBANK_BILL_FIXTURE: Bill = new Bill({
  id: 'f647a585-664b-4d01-97cb-c39f07f7ca5d',
  user: USER_FIXTURE,
  year: 2025,
  type: EBillType.PIX,
  bank: NUBANK_BANK_FIXTURE,
  name: 'Monte Carlo Residential Pix',
  total: 0,
  expenses: [
    GARAGE_HOUSING_MONTE_CARLO_RESIDENTIAL_EXPENSE_FIXTURE,
    DAY_LABORER_MONTE_CARLO_RESIDENTIAL_EXPENSE_FIXTURE,
  ],
});

export const MONTE_CARLO_RESIDENTIAL_BILL_LIST_FIXTURE: Array<Bill> = [
  MONTE_CARLO_RESIDENTIAL_ACCOUNT_DEBIT_ITAU_BILL_FIXTURE,
  MONTE_CARLO_RESIDENTIAL_BANK_SLIP_NUBANK_BILL_FIXTURE,
  MONTE_CARLO_RESIDENTIAL_PIX_NUBANK_BILL_FIXTURE,
];