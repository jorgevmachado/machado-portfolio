import Expense from '@repo/business/finance/expense/expense';
import { EExpenseType } from '@repo/business/finance/enum';

import {
  CAR_INSURANCE_TRANSPORT_SUPPLIER_FIXTURE,
  CREDIT_CARD_ADDITIONAL_IOF_ON_FINANCED_BALANCE_SUPPLIER_FIXTURE,
  CREDIT_CARD_ANNUAL_FEE_SUPPLIER_FIXTURE,
  CREDIT_CARD_CHARGES_SUPPLIER_FIXTURE,
  CREDIT_CARD_LOSS_AND_THEFT_PROTECTION_SERVICE_SUPPLIER_FIXTURE,
  CREDIT_CARD_PREVIOUS_INVOICE_BALANCE_SUPPLIER_FIXTURE,
} from '../../../../supplier';
import { USER_FIXTURE } from '../../../../../auth';
import { PERSONAL_EXPENSE_GROUP_FIXTURE } from '../../../../expense-group';
import { PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE } from '../../../../expense-category';

export const CAR_INSURANCE_PORTO_PERSONAL_FIXTURE: Expense = new Expense({
  id: '6c87d5de-d652-442c-a7b0-e89ee9d3a7b5',
  year: 2025,
  user: USER_FIXTURE,
  type: EExpenseType.VARIABLE,
  group: PERSONAL_EXPENSE_GROUP_FIXTURE,
  supplier: CAR_INSURANCE_TRANSPORT_SUPPLIER_FIXTURE,
  category: PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE,
  january: 546.68,
  february: 546.68,
  march: 546.68,
  april: 546.68,
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

export const CREDIT_CARD_ANNUAL_FEE_PORTO_PERSONAL_FIXTURE: Expense =
  new Expense({
    id: 'f9244ce5-f7e4-410a-b840-6000f3e0cd2e',
    year: 2025,
    user: USER_FIXTURE,
    type: EExpenseType.VARIABLE,
    group: PERSONAL_EXPENSE_GROUP_FIXTURE,
    supplier: CREDIT_CARD_ANNUAL_FEE_SUPPLIER_FIXTURE,
    category: PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE,
    january: 37.0,
    february: 37.0,
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

export const CREDIT_CARD_LOSS_AND_THEFT_PROTECTION_SERVICE_PORTO_PERSONAL_FIXTURE: Expense =
  new Expense({
    id: 'e8ff59cb-6702-43f3-9a08-1f1c68324eac',
    year: 2025,
    user: USER_FIXTURE,
    type: EExpenseType.VARIABLE,
    group: PERSONAL_EXPENSE_GROUP_FIXTURE,
    supplier: CREDIT_CARD_LOSS_AND_THEFT_PROTECTION_SERVICE_SUPPLIER_FIXTURE,
    category: PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE,
    january: 9.99,
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

export const CREDIT_CARD_ADDITIONAL_IOF_ON_FINANCED_BALANCE_PORTO_PERSONAL_FIXTURE: Expense =
  new Expense({
    id: '92e94d1d-1703-46bc-a591-22746dfefb1e',
    year: 2025,
    user: USER_FIXTURE,
    type: EExpenseType.VARIABLE,
    group: PERSONAL_EXPENSE_GROUP_FIXTURE,
    supplier: CREDIT_CARD_ADDITIONAL_IOF_ON_FINANCED_BALANCE_SUPPLIER_FIXTURE,
    category: PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE,
    january: 0.03,
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

export const CREDIT_CARD_PREVIOUS_INVOICE_BALANCE_PORTO_PERSONAL_FIXTURE: Expense =
  new Expense({
    id: '06091107-7101-4733-bdd2-c018a9864710',
    year: 2025,
    user: USER_FIXTURE,
    type: EExpenseType.VARIABLE,
    group: PERSONAL_EXPENSE_GROUP_FIXTURE,
    supplier: CREDIT_CARD_PREVIOUS_INVOICE_BALANCE_SUPPLIER_FIXTURE,
    category: PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE,
    january: 8.99,
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

export const CREDIT_CARD_CHARGES_PORTO_PERSONAL_FIXTURE: Expense = new Expense({
  id: '13bf9dba-e9e1-4bd9-8d89-2890e51b429d',
  year: 2025,
  user: USER_FIXTURE,
  type: EExpenseType.VARIABLE,
  group: PERSONAL_EXPENSE_GROUP_FIXTURE,
  supplier: CREDIT_CARD_CHARGES_SUPPLIER_FIXTURE,
  category: PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE,
  january: 1.58,
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

export const PORTO_PERSONAL_LIST_FIXTURE: Array<Expense> = [
  CAR_INSURANCE_PORTO_PERSONAL_FIXTURE,
  CREDIT_CARD_ANNUAL_FEE_PORTO_PERSONAL_FIXTURE,
  CREDIT_CARD_LOSS_AND_THEFT_PROTECTION_SERVICE_PORTO_PERSONAL_FIXTURE,
  CREDIT_CARD_ADDITIONAL_IOF_ON_FINANCED_BALANCE_PORTO_PERSONAL_FIXTURE,
  CREDIT_CARD_PREVIOUS_INVOICE_BALANCE_PORTO_PERSONAL_FIXTURE,
  CREDIT_CARD_CHARGES_PORTO_PERSONAL_FIXTURE,
];