import Expense from '@repo/business/finance/expense/expense';
import { EExpenseType } from '@repo/business/finance/enum';

import { USER_FIXTURE } from '../../../../auth';
import { MONTE_CARLO_RESIDENTIAL_EXPENSE_GROUP_FIXTURE } from '../../../expense-group';
import {
    CLARO_HOUSING_SUPPLIER_FIXTURE,
    CONDOMINIUM_HOUSING_SUPPLIER_FIXTURE,
    DAY_LABORER_DIDI_HOUSING_SUPPLIER_FIXTURE,
    GARAGE_HOUSING_SUPPLIER_FIXTURE,
    IPTU_HOUSING_SUPPLIER_FIXTURE,
    NEOENERGIA_HOUSING_SUPPLIER_FIXTURE,
} from '../../../supplier';
import {
    ACCOUNT_DEBIT_EXPENSE_CATEGORY_FIXTURE,
    BANK_SLIP_EXPENSE_CATEGORY_FIXTURE,
    DEBIT_EXPENSE_CATEGORY_FIXTURE
} from '../../../expense-category';


const NEOENERGIA_MONTE_CARLO_RESIDENTIAL_EXPENSE_FIXTURE: Expense = new Expense(
  {
    id: '41b0ef6f-0b6e-4633-94d9-14680010a0e2',
    year: 2025,
    user: USER_FIXTURE,
    type: EExpenseType.VARIABLE,
    group: MONTE_CARLO_RESIDENTIAL_EXPENSE_GROUP_FIXTURE,
    supplier: NEOENERGIA_HOUSING_SUPPLIER_FIXTURE,
    category: BANK_SLIP_EXPENSE_CATEGORY_FIXTURE,
    january: 93.00,
    february: 108.96,
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
    created_at: new Date('2025-02-01T17:37:47.783Z'),
    updated_at: new Date('2025-02-01T14:40:31.207Z'),
    deleted_at: null,
    instalment_number: 1,
  },
);

const IPTU_MONTE_CARLO_RESIDENTIAL_EXPENSE_FIXTURE: Expense = new Expense({
  id: 'aec02e53-f5d9-4696-b69b-2d0c5722df37',
  year: 2025,
  user: USER_FIXTURE,
  type: EExpenseType.VARIABLE,
  group: MONTE_CARLO_RESIDENTIAL_EXPENSE_GROUP_FIXTURE,
  supplier: IPTU_HOUSING_SUPPLIER_FIXTURE,
  category: BANK_SLIP_EXPENSE_CATEGORY_FIXTURE,
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
  created_at: new Date('2025-02-01T17:37:47.783Z'),
  updated_at: new Date('2025-02-01T14:40:31.207Z'),
  deleted_at: null,
  instalment_number: 1,
});

const CLARO_MONTE_CARLO_RESIDENTIAL_EXPENSE_FIXTURE: Expense = new Expense({
    id: 'ea6c92a1-e799-4b4b-8187-27a7a8cca072',
    year: 2025,
    user: USER_FIXTURE,
    type: EExpenseType.VARIABLE,
    group: MONTE_CARLO_RESIDENTIAL_EXPENSE_GROUP_FIXTURE,
    supplier: CLARO_HOUSING_SUPPLIER_FIXTURE,
    category: ACCOUNT_DEBIT_EXPENSE_CATEGORY_FIXTURE,
    january: 502.61,
    february: 496.87,
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
    created_at: new Date('2025-02-01T17:37:47.783Z'),
    updated_at: new Date('2025-02-01T14:40:31.207Z'),
    deleted_at: null,
    instalment_number: 1,
});

const DAY_LABORER_DIDI_MONTE_CARLO_RESIDENTIAL_EXPENSE_FIXTURE: Expense =
  new Expense({
      id: '8f6747aa-e863-46a2-8247-48a25cee532c',
      year: 2025,
      user: USER_FIXTURE,
      type: EExpenseType.VARIABLE,
      group: MONTE_CARLO_RESIDENTIAL_EXPENSE_GROUP_FIXTURE,
      supplier: DAY_LABORER_DIDI_HOUSING_SUPPLIER_FIXTURE,
      category: DEBIT_EXPENSE_CATEGORY_FIXTURE,
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
      created_at: new Date('2025-02-01T17:37:47.783Z'),
      updated_at: new Date('2025-02-01T14:40:31.207Z'),
      deleted_at: null,
      instalment_number: 1,
  });

const CONDOMINIUM_MONTE_CARLO_RESIDENTIAL_EXPENSE_FIXTURE: Expense =
  new Expense({
      id: 'b86d2840-5270-48b5-8914-d53b2eb47fd0',
      year: 2025,
      user: USER_FIXTURE,
      type: EExpenseType.VARIABLE,
      group: MONTE_CARLO_RESIDENTIAL_EXPENSE_GROUP_FIXTURE,
      supplier: CONDOMINIUM_HOUSING_SUPPLIER_FIXTURE,
      category: BANK_SLIP_EXPENSE_CATEGORY_FIXTURE,
      january: 781.34,
      february: 972.27,
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
      created_at: new Date('2025-02-01T17:37:47.783Z'),
      updated_at: new Date('2025-02-01T14:40:31.207Z'),
      deleted_at: null,
      instalment_number: 1,
  });

const GARAGE_HOUSING_MONTE_CARLO_RESIDENTIAL_EXPENSE_FIXTURE: Expense =
  new Expense({
      id: 'c0f909a9-4bea-48e1-bc9b-e6635f36bee2',
      year: 2025,
      user: USER_FIXTURE,
      type: EExpenseType.FIXED,
      group: MONTE_CARLO_RESIDENTIAL_EXPENSE_GROUP_FIXTURE,
      supplier: GARAGE_HOUSING_SUPPLIER_FIXTURE,
      category: DEBIT_EXPENSE_CATEGORY_FIXTURE,
      january: 220.00,
      february: 220.00,
      march: 220.00,
      april: 220.00,
      may: 220.00,
      june: 220.00,
      july: 220.00,
      august: 220.00,
      september: 220.00,
      october: 220.00,
      november: 220.00,
      december: 220.00,
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
      created_at: new Date('2025-02-01T17:37:47.783Z'),
      updated_at: new Date('2025-02-01T14:40:31.207Z'),
      deleted_at: null,
      instalment_number: 1,
  });

export const MONTE_CARLO_RESIDENTIAL_EXPENSE_LIST_FIXTURE: Array<Expense> = [
    NEOENERGIA_MONTE_CARLO_RESIDENTIAL_EXPENSE_FIXTURE,
    IPTU_MONTE_CARLO_RESIDENTIAL_EXPENSE_FIXTURE,
    CLARO_MONTE_CARLO_RESIDENTIAL_EXPENSE_FIXTURE,
    DAY_LABORER_DIDI_MONTE_CARLO_RESIDENTIAL_EXPENSE_FIXTURE,
    CONDOMINIUM_MONTE_CARLO_RESIDENTIAL_EXPENSE_FIXTURE,
    GARAGE_HOUSING_MONTE_CARLO_RESIDENTIAL_EXPENSE_FIXTURE
];