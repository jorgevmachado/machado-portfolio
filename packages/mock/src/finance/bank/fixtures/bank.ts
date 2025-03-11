import Bank from '@repo/business/finance/bank/bank';

import type { FinanceEntity } from '../../interface';

export const CAIXA_BANK_FIXTURE: Bank = new Bank({
  id: '58ff5efb-f261-4631-9658-3a69ee7df3fc',
  name: 'Caixa',
  created_at: new Date('2025-02-01T19:46:54.072Z'),
  updated_at: new Date('2025-02-01T19:46:54.072Z'),
  deleted_at: null,
});

export const ITAU_BANK_FIXTURE: Bank = new Bank({
  id: '70b9ecf7-bd98-4601-b25a-fae5163017a5',
  name: 'Itaú',
  created_at: new Date('2025-02-01T19:46:54.072Z'),
  updated_at: new Date('2025-02-01T19:46:54.072Z'),
  deleted_at: null,
});

export const NUBANK_BANK_FIXTURE: Bank = new Bank({
  id: 'dfea3644-1e51-4c59-9456-64ced7d13873',
  name: 'Nubank',
  created_at: new Date('2025-02-01T19:46:54.072Z'),
  updated_at: new Date('2025-02-01T19:46:54.072Z'),
  deleted_at: null,
});

export const PORTO_BANK_FIXTURE: Bank = new Bank({
  id: '6d958829-590b-4340-9e7a-be99b4185f25',
  name: 'Porto',
  created_at: new Date('2025-02-01T19:46:54.072Z'),
  updated_at: new Date('2025-02-01T19:46:54.072Z'),
  deleted_at: null,
});

export const BANK_LIST_FIXTURE: Array<Bank> = [
  CAIXA_BANK_FIXTURE,
  ITAU_BANK_FIXTURE,
  NUBANK_BANK_FIXTURE,
  PORTO_BANK_FIXTURE,
];

export const BANK_FINANCE_ENTITY: FinanceEntity = {
  id: 'BANK',
  list: BANK_LIST_FIXTURE,
  label: 'Bank',
  alias: 'banks',
};