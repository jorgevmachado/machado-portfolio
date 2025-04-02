import {
  findEntityBy,
  transformObjectDateAndNulls,
} from '@repo/services/entities/entities';

import BANK_LIST_FIXTURE_JSON from '@repo/mock-json/finance/bank/banks.json';

import Bank from '../bank';

const BANK_LIST_TEMP: Array<Bank> = BANK_LIST_FIXTURE_JSON.map(
  (bank) => transformObjectDateAndNulls<Bank, unknown>(bank),
);

export const CAIXA_BANK_FIXTURE: Bank = findEntityBy({
  key: 'name_code',
  value: 'caixa',
  list: BANK_LIST_TEMP,
});

export const ITAU_BANK_FIXTURE: Bank = findEntityBy({
  key: 'name_code',
  value: 'itau',
  list: BANK_LIST_TEMP,
});

export const NUBANK_BANK_FIXTURE: Bank = findEntityBy({
  key: 'name_code',
  value: 'nubank',
  list: BANK_LIST_TEMP,
});

export const PORTO_BANK_FIXTURE: Bank = findEntityBy({
  key: 'name_code',
  value: 'porto',
  list: BANK_LIST_TEMP,
});

export const BANK_LIST_FIXTURE: Array<Bank> = BANK_LIST_TEMP;