import { findEntityBy } from '@repo/services/entities/entities';

import BANK_LIST_FIXTURE_JSON from './banks.json';

import Bank from '../bank';

const BANK_LIST_TEMP: Array<Bank> = BANK_LIST_FIXTURE_JSON.map(
  (bank) => bank as unknown as Bank,
);

export const CAIXA_BANK_FIXTURE: Bank = findEntityBy({
  key: 'name',
  value: 'Caixa',
  list: BANK_LIST_TEMP,
});

export const ITAU_BANK_FIXTURE: Bank = findEntityBy({
  key: 'name',
  value: 'Itaú',
  list: BANK_LIST_TEMP,
});

export const NUBANK_BANK_FIXTURE: Bank = findEntityBy({
  key: 'name',
  value: 'Nubank',
  list: BANK_LIST_TEMP,
});

export const PORTO_BANK_FIXTURE: Bank = findEntityBy({
  key: 'name',
  value: 'Porto',
  list: BANK_LIST_TEMP,
});

export const BANK_LIST_FIXTURE: Array<Bank> = BANK_LIST_TEMP;