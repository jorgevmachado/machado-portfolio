import { EExpenseType } from '@repo/business/finance/enum';
import Expense from '@repo/business/finance/expense/expense';

import {
  CAIXA_CREDIT_CARD_BILLS_SUPPLIER_FIXTURE,
  CAR_INSURANCE_TRANSPORT_SUPPLIER_FIXTURE,
  IPVA_TRANSPORT_SUPPLIER_FIXTURE,
  LICENSING_TRANSPORT_SUPPLIER_FIXTURE,
  NUBANK_CREDIT_CARD_BILLS_SUPPLIER_FIXTURE,
  UNIMED_HEALTH_SUPPLIER_FIXTURE,
} from '../../../supplier';

export const UNIMED_HEALTH_MOTHER_EXPENSE_FIXTURE: Expense = new Expense({
  id: '820fbc50-b03d-4f4b-acc2-6731326d4a53',
  year: 2025,
  type: EExpenseType.FIXED,
  supplier: UNIMED_HEALTH_SUPPLIER_FIXTURE,
  january: 3783.75,
  february: 3783.75,
  march: 0,
  april: 0,
  may: 0,
  june: 0,
  july: 0,
  august: 0,
  september: 0,
  october: 0,
  november: 0,
  december: 0,
  january_paid: true,
  february_paid: true,
  march_paid: false,
  april_paid: false,
  may_paid: false,
  june_paid: false,
  july_paid: false,
  august_paid: false,
  september_paid: false,
  october_paid: false,
  november_paid: false,
  december_paid: false,
  description: null,
  created_at: new Date('2025-01-01T17:37:47.783Z'),
  updated_at: new Date('2025-01-01T14:40:31.207Z'),
  deleted_at: null,
  instalment_number: 1,
});

export const MOTOR_VEHICLE_PROPERTY_TAX_MOTHER_EXPENSE_FIXTURE: Expense =
  new Expense({
    id: '3bc98b1f-fe87-48b1-be9e-fc1b32be255e',
    year: 2025,
    type: EExpenseType.FIXED,
    supplier: IPVA_TRANSPORT_SUPPLIER_FIXTURE,
    january: 2997.89,
    february: 0,
    march: 0,
    april: 0,
    may: 0,
    june: 0,
    july: 0,
    august: 0,
    september: 0,
    october: 0,
    november: 0,
    december: 0,
    january_paid: true,
    february_paid: true,
    march_paid: true,
    april_paid: true,
    may_paid: true,
    june_paid: true,
    july_paid: true,
    august_paid: true,
    september_paid: true,
    october_paid: true,
    november_paid: true,
    december_paid: true,
    description: null,
    created_at: new Date('2025-01-05T17:37:47.783Z'),
    updated_at: new Date('2025-01-05T14:40:31.207Z'),
    deleted_at: null,
    instalment_number: 1,
  });

export const LICENSING_CAR_MOTHER_EXPENSE_FIXTURE: Expense = new Expense({
  id: '721e08f7-31c9-49da-9b92-9d9692b360a7',
  year: 2025,
  type: EExpenseType.FIXED,
  supplier: LICENSING_TRANSPORT_SUPPLIER_FIXTURE,
  january: 102.0,
  february: 0,
  march: 0,
  april: 0,
  may: 0,
  june: 0,
  july: 0,
  august: 0,
  september: 0,
  october: 0,
  november: 0,
  december: 0,
  january_paid: true,
  february_paid: true,
  march_paid: true,
  april_paid: true,
  may_paid: true,
  june_paid: true,
  july_paid: true,
  august_paid: true,
  september_paid: true,
  october_paid: true,
  november_paid: true,
  december_paid: true,
  description: null,
  created_at: new Date('2025-01-05T17:37:47.783Z'),
  updated_at: new Date('2025-01-05T14:40:31.207Z'),
  deleted_at: null,
  instalment_number: 1,
});

export const CAR_INSURANCE_MOTHER_EXPENSE_FIXTURE: Expense = new Expense({
  id: '468f7833-3e38-4fb5-9c1d-b564e303b23a',
  year: 2025,
  type: EExpenseType.FIXED,
  supplier: CAR_INSURANCE_TRANSPORT_SUPPLIER_FIXTURE,
  january: 0,
  february: 0,
  march: 0,
  april: 0,
  may: 0,
  june: 0,
  july: 0,
  august: 0,
  september: 0,
  october: 0,
  november: 0,
  december: 0,
  january_paid: false,
  february_paid: false,
  march_paid: false,
  april_paid: false,
  may_paid: false,
  june_paid: false,
  july_paid: false,
  august_paid: false,
  september_paid: false,
  october_paid: false,
  november_paid: false,
  december_paid: false,
  description: null,
  created_at: new Date('2025-01-05T17:37:47.783Z'),
  updated_at: new Date('2025-01-05T14:40:31.207Z'),
  deleted_at: null,
  instalment_number: 1,
});

export const MOTHER_CAIXA_CREDIT_CARD_EXPENSE_FIXTURE: Expense = new Expense({
  id: '90439af0-99d3-4b2f-9968-830317ba7240',
  year: 2025,
  type: EExpenseType.VARIABLE,
  supplier: CAIXA_CREDIT_CARD_BILLS_SUPPLIER_FIXTURE,
  january: 1709.07,
  february: 1447.32,
  march: 0,
  april: 0,
  may: 0,
  june: 0,
  july: 0,
  august: 0,
  september: 0,
  october: 0,
  november: 0,
  december: 0,
  january_paid: true,
  february_paid: true,
  march_paid: false,
  april_paid: false,
  may_paid: false,
  june_paid: false,
  july_paid: false,
  august_paid: false,
  september_paid: false,
  october_paid: false,
  november_paid: false,
  december_paid: false,
  description: null,
  created_at: new Date('2025-01-02T17:37:47.783Z'),
  updated_at: new Date('2025-01-02T14:40:31.207Z'),
  deleted_at: null,
  instalment_number: 1,
});

export const MOTHER_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE: Expense = new Expense({
  id: 'd79d1d53-ca31-41fb-aef3-2adcc3854a93',
  year: 2025,
  type: EExpenseType.VARIABLE,
  supplier: NUBANK_CREDIT_CARD_BILLS_SUPPLIER_FIXTURE,
  january: 1400.0,
  february: 1257.75,
  march: 0,
  april: 0,
  may: 0,
  june: 0,
  july: 0,
  august: 0,
  september: 0,
  october: 0,
  november: 0,
  december: 0,
  january_paid: true,
  february_paid: true,
  march_paid: false,
  april_paid: false,
  may_paid: false,
  june_paid: false,
  july_paid: false,
  august_paid: false,
  september_paid: false,
  october_paid: false,
  november_paid: false,
  december_paid: false,
  description: null,
  created_at: new Date('2025-01-03T17:37:47.783Z'),
  updated_at: new Date('2025-01-03T14:40:31.207Z'),
  deleted_at: null,
  instalment_number: 1,
});

export const MOTHER_EXPENSE_LIST_FIXTURE: Array<Expense> = [
  UNIMED_HEALTH_MOTHER_EXPENSE_FIXTURE,
  MOTOR_VEHICLE_PROPERTY_TAX_MOTHER_EXPENSE_FIXTURE,
  LICENSING_CAR_MOTHER_EXPENSE_FIXTURE,
  CAR_INSURANCE_MOTHER_EXPENSE_FIXTURE,
  MOTHER_CAIXA_CREDIT_CARD_EXPENSE_FIXTURE,
  MOTHER_NUBANK_CREDIT_CARD_EXPENSE_FIXTURE,
];