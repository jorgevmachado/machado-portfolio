import { EBillType } from '@repo/business/finance/enum';
import Bill from '@repo/business/finance/bill/bill';

import { FINANCE_FIXTURE } from '../../../fixtures';

import { CAIXA_BANK_FIXTURE, NUBANK_BANK_FIXTURE } from '../../../bank';

import {
  CAR_INSURANCE_MOTHER_EXPENSE_FIXTURE,
  LICENSING_CAR_MOTHER_EXPENSE_FIXTURE,
  MOTHER_CAIXA_CREDIT_CARD_EXPENSE_FIXTURE,
  MOTHER_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE,
  MOTOR_VEHICLE_PROPERTY_TAX_MOTHER_EXPENSE_FIXTURE,
  UNIMED_HEALTH_MOTHER_EXPENSE_FIXTURE,
} from '../../../expense';

export const MOTHER_BANK_SLIP_CAIXA_BILL_FIXTURE: Bill = new Bill({
  id: 'b403cdff-4537-4c62-8dcd-47dd17a11c64',
  year: 2025,
  type: EBillType.BANK_SLIP,
  bank: CAIXA_BANK_FIXTURE,
  name: 'Mother Bank Slip',
  total: 0,
  finance: FINANCE_FIXTURE,
  expenses: [
    UNIMED_HEALTH_MOTHER_EXPENSE_FIXTURE,
    MOTOR_VEHICLE_PROPERTY_TAX_MOTHER_EXPENSE_FIXTURE,
    LICENSING_CAR_MOTHER_EXPENSE_FIXTURE,
    CAR_INSURANCE_MOTHER_EXPENSE_FIXTURE,
  ],
});

export const MOTHER_CREDIT_CARD_CAIXA_BILL_FIXTURE: Bill = new Bill({
  id: '807e9c14-b852-4515-911e-09925d506d7e',
  year: 2025,
  type: EBillType.CREDIT_CARD,
  bank: CAIXA_BANK_FIXTURE,
  name: 'Mother Physical Credit Card Caixa',
  total: 0,
  finance: FINANCE_FIXTURE,
  expenses: [MOTHER_CAIXA_CREDIT_CARD_EXPENSE_FIXTURE],
});

export const MOTHER_CREDIT_CARD_NUBANK_BILL_FIXTURE: Bill = new Bill({
  id: 'f21e4367-f2a5-4388-925e-fedbb81eee24',
  year: 2025,
  type: EBillType.CREDIT_CARD,
  bank: NUBANK_BANK_FIXTURE,
  name: 'Mother Physical Credit Card Nubank',
  total: 0,
  finance: FINANCE_FIXTURE,
  expenses: [MOTHER_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE],
});

export const MOTHER_BILL_LIST_FIXTURE: Array<Bill> = [
  MOTHER_BANK_SLIP_CAIXA_BILL_FIXTURE,
  MOTHER_CREDIT_CARD_CAIXA_BILL_FIXTURE,
  MOTHER_CREDIT_CARD_NUBANK_BILL_FIXTURE,
];