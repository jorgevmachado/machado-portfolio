import ExpenseCategory from '@repo/business/finance/expense-category/expenseCategory';

import { FinanceEntity } from '../../interface';

import {
  ACCOUNT_DEBIT_EXPENSE_CATEGORY_TYPE_FIXTURE,
  CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE,
  DEBIT_EXPENSE_CATEGORY_TYPE_FIXTURE,
  EXPENSE_CATEGORY_TYPE_FINANCE_ENTITY,
  MONEY_EXPENSE_CATEGORY_TYPE_FIXTURE,
  PIX_EXPENSE_CATEGORY_TYPE_FIXTURE,
} from '../../expense-category-type';

export const AMAZON_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE: ExpenseCategory =
  new ExpenseCategory({
    id: 'a34315aa-c259-46db-a7db-d69179127918',
    type: CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE,
    name: 'Amazon Virtual Credit Card',
    created_at: new Date('2025-01-31T19:46:54.080Z'),
    updated_at: new Date('2025-01-31T19:46:54.080Z'),
    deleted_at: null,
  });

export const CHINA_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE: ExpenseCategory =
  new ExpenseCategory({
    id: '9f5831a9-6628-4c9e-acb2-2ed11b2381ed',
    type: CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE,
    name: 'China in Box Virtual Credit Card',
    created_at: new Date('2025-01-31T19:46:54.080Z'),
    updated_at: new Date('2025-01-31T19:46:54.080Z'),
    deleted_at: null,
  });

export const MERCADO_LIVRE_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE: ExpenseCategory =
  new ExpenseCategory({
    id: '36573a87-4729-46ef-af77-b6354d7c4112',
    type: CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE,
    name: 'Mercado Livre Virtual Credit Card',
    created_at: new Date('2025-01-31T19:46:54.080Z'),
    updated_at: new Date('2025-01-31T19:46:54.080Z'),
    deleted_at: null,
  });

export const STREAMING_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE: ExpenseCategory =
  new ExpenseCategory({
    id: 'fd82c5d6-8d44-41c5-82f5-7a346e03e8ba',
    type: CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE,
    name: 'Streaming Virtual Credit Card',
    created_at: new Date('2025-01-31T19:46:54.080Z'),
    updated_at: new Date('2025-01-31T19:46:54.080Z'),
    deleted_at: null,
  });

export const CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE: ExpenseCategory =
  new ExpenseCategory({
    id: 'befb7ff6-938e-4cc1-aae5-85f7b1a5266a',
    type: CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE,
    name: 'Physical',
    created_at: new Date('2025-01-31T19:46:54.080Z'),
    updated_at: new Date('2025-01-31T19:46:54.080Z'),
    deleted_at: null,
  });

export const PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE: ExpenseCategory =
  new ExpenseCategory({
    id: '843be2db-1ecc-4774-a6ae-65fdc707a728',
    type: CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE,
    name: 'Physical',
    created_at: new Date('2025-02-01T19:46:54.080Z'),
    updated_at: new Date('2025-02-01T19:46:54.080Z'),
    deleted_at: null,
  });

export const DIGITAL_WALLET_EXPENSE_CATEGORY_FIXTURE: ExpenseCategory =
  new ExpenseCategory({
    id: 'da1b68e0-5717-4cc7-8dcf-9503c18032cc',
    type: CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE,
    name: 'Digital Wallet',
    created_at: new Date('2025-02-02T19:46:54.080Z'),
    updated_at: new Date('2025-02-02T19:46:54.080Z'),
    deleted_at: null,
  });

export const VIRTUAL_24H_EXPENSE_CATEGORY_FIXTURE: ExpenseCategory =
  new ExpenseCategory({
    id: '3a5a37a5-909d-4196-ad76-647067733f0b',
    type: CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE,
    name: 'Virtual 24h',
    created_at: new Date('2025-02-03T19:46:54.080Z'),
    updated_at: new Date('2025-02-03T19:46:54.080Z'),
    deleted_at: null,
  });

export const IFOOD_EXPENSE_CATEGORY_FIXTURE: ExpenseCategory =
  new ExpenseCategory({
    id: '861cb73d-eb18-462e-a92d-6efe25ad7e5b',
    type: CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE,
    name: 'Ifood',
    created_at: new Date('2025-02-04T19:46:54.080Z'),
    updated_at: new Date('2025-02-04T19:46:54.080Z'),
    deleted_at: null,
  });

export const BANK_SLIP_EXPENSE_CATEGORY_FIXTURE: ExpenseCategory =
  new ExpenseCategory({
    id: '291be24d-7870-40e8-8bf4-58dfcfcf31c6',
    type: CREDIT_CARD_EXPENSE_CATEGORY_TYPE_FIXTURE,
    name: 'Bank Slip',
    created_at: new Date('2025-02-05T19:46:54.081Z'),
    updated_at: new Date('2025-02-05T19:46:54.081Z'),
    deleted_at: null,
  });

export const ACCOUNT_DEBIT_EXPENSE_CATEGORY_FIXTURE: ExpenseCategory =
  new ExpenseCategory({
    id: '087b2528-0814-4a6b-8c62-99539fe77165',
    type: ACCOUNT_DEBIT_EXPENSE_CATEGORY_TYPE_FIXTURE,
    name: 'Account Debit',
    created_at: new Date('2025-02-06T19:46:54.081Z'),
    updated_at: new Date('2025-02-06T19:46:54.081Z'),
    deleted_at: null,
  });

export const PIX_EXPENSE_CATEGORY_FIXTURE: ExpenseCategory =
  new ExpenseCategory({
    id: 'b83823f1-b0d3-4a55-8861-8c85cf23619f',
    type: PIX_EXPENSE_CATEGORY_TYPE_FIXTURE,
    name: 'Pix',
    created_at: new Date('2025-02-07T19:46:54.081Z'),
    updated_at: new Date('2025-02-07T19:46:54.081Z'),
    deleted_at: null,
  });

export const DEBIT_EXPENSE_CATEGORY_FIXTURE: ExpenseCategory =
  new ExpenseCategory({
    id: 'e5b74df9-39c4-4c77-b450-40db3296ff7c',
    type: DEBIT_EXPENSE_CATEGORY_TYPE_FIXTURE,
    name: 'Debit',
    created_at: new Date('2025-02-07T19:46:54.081Z'),
    updated_at: new Date('2025-02-07T19:46:54.081Z'),
    deleted_at: null,
  });

export const MONEY_EXPENSE_CATEGORY_FIXTURE: ExpenseCategory =
  new ExpenseCategory({
    id: 'c6b5f54a-a2ae-47dd-94f0-9a48359ffca4',
    type: MONEY_EXPENSE_CATEGORY_TYPE_FIXTURE,
    name: 'Money',
    created_at: new Date('2025-02-07T19:46:54.081Z'),
    updated_at: new Date('2025-02-07T19:46:54.081Z'),
    deleted_at: null,
  });

export const LIST_EXPENSE_CATEGORY_FIXTURE: Array<ExpenseCategory> = [
  CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE,
  PHYSICAL_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE,
  DIGITAL_WALLET_EXPENSE_CATEGORY_FIXTURE,
  VIRTUAL_24H_EXPENSE_CATEGORY_FIXTURE,
  IFOOD_EXPENSE_CATEGORY_FIXTURE,
  BANK_SLIP_EXPENSE_CATEGORY_FIXTURE,
  ACCOUNT_DEBIT_EXPENSE_CATEGORY_FIXTURE,
  PIX_EXPENSE_CATEGORY_FIXTURE,
  DEBIT_EXPENSE_CATEGORY_FIXTURE,
  MONEY_EXPENSE_CATEGORY_FIXTURE,
  MERCADO_LIVRE_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE,
  STREAMING_CREDIT_CARD_EXPENSE_CATEGORY_FIXTURE,
];

export const EXPENSE_CATEGORY_FINANCE_ENTITY: FinanceEntity = {
  id: 'EXPENSE_CATEGORY',
  label: 'Expense Category',
  alias: 'expense_categories',
  list: LIST_EXPENSE_CATEGORY_FIXTURE,
  type: EXPENSE_CATEGORY_TYPE_FINANCE_ENTITY,
};