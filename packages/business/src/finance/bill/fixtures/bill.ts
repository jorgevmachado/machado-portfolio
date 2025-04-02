import {
    findEntityBy,
    transformObjectDateAndNulls,
} from '@repo/services/entities/entities';

import BILL_LIST_FIXTURE_JSON from '@repo/mock-json/finance/bill/bills.json';

import Bill from '../bill';

const BILL_LIST_TEMP: Array<Bill> = BILL_LIST_FIXTURE_JSON.map(
  (bill) => transformObjectDateAndNulls<Bill, unknown>(bill),
);

export const INGRID_RESIDENTIAL_BANK_SLIP_NUBANK_BILL_FIXTURE: Bill =
  findEntityBy({
    key: 'id',
    value: '4245135e-0e58-48fc-8fd2-9353d0f56c34',
    list: BILL_LIST_TEMP,
  });

export const INGRID_RESIDENTIAL_PIX_NUBANK_BILL_FIXTURE: Bill = findEntityBy({
  key: 'id',
  value: '89a19ea6-13e2-44c6-ba8f-cb93729b0ed7',
  list: BILL_LIST_TEMP,
});

export const INGRID_RESIDENTIAL_BILL_LIST_FIXTURE: Array<Bill> = [
  INGRID_RESIDENTIAL_BANK_SLIP_NUBANK_BILL_FIXTURE,
  INGRID_RESIDENTIAL_PIX_NUBANK_BILL_FIXTURE,
];

export const MONTE_CARLO_RESIDENTIAL_ACCOUNT_DEBIT_ITAU_BILL_FIXTURE: Bill =
  findEntityBy({
    key: 'id',
    value: 'b6c3adea-9e79-47c3-a506-0e8a0e8852f6',
    list: BILL_LIST_TEMP,
  });

export const MONTE_CARLO_RESIDENTIAL_BANK_SLIP_NUBANK_BILL_FIXTURE: Bill =
  findEntityBy({
    key: 'id',
    value: '4c992e7b-12df-4af6-b991-c109b57b9974',
    list: BILL_LIST_TEMP,
  });

export const MONTE_CARLO_RESIDENTIAL_PIX_NUBANK_BILL_FIXTURE: Bill =
  findEntityBy({
    key: 'id',
    value: 'f647a585-664b-4d01-97cb-c39f07f7ca5d',
    list: BILL_LIST_TEMP,
  });

export const MONTE_CARLO_RESIDENTIAL_BILL_LIST_FIXTURE: Array<Bill> = [
  MONTE_CARLO_RESIDENTIAL_ACCOUNT_DEBIT_ITAU_BILL_FIXTURE,
  MONTE_CARLO_RESIDENTIAL_BANK_SLIP_NUBANK_BILL_FIXTURE,
  MONTE_CARLO_RESIDENTIAL_PIX_NUBANK_BILL_FIXTURE,
];

export const MOTHER_BANK_SLIP_CAIXA_BILL_FIXTURE: Bill = findEntityBy({
  key: 'id',
  value: 'b403cdff-4537-4c62-8dcd-47dd17a11c64',
  list: BILL_LIST_TEMP,
});

export const MOTHER_CREDIT_CARD_CAIXA_BILL_FIXTURE: Bill = findEntityBy({
  key: 'id',
  value: '807e9c14-b852-4515-911e-09925d506d7e',
  list: BILL_LIST_TEMP,
});

export const MOTHER_CREDIT_CARD_NUBANK_BILL_FIXTURE: Bill = findEntityBy({
  key: 'id',
  value: 'f21e4367-f2a5-4388-925e-fedbb81eee24',
  list: BILL_LIST_TEMP,
});

export const MOTHER_BILL_LIST_FIXTURE: Array<Bill> = [
  MOTHER_BANK_SLIP_CAIXA_BILL_FIXTURE,
  MOTHER_CREDIT_CARD_CAIXA_BILL_FIXTURE,
  MOTHER_CREDIT_CARD_NUBANK_BILL_FIXTURE,
];

export const PERSONAL_ACCOUNT_DEBIT_NUBANK_BILL_FIXTURE: Bill = findEntityBy({
  key: 'id',
  value: '4bb19b63-a503-4750-a7ed-f1b06dd5917f',
  list: BILL_LIST_TEMP,
});

export const PERSONAL_BANK_SLIP_NUBANK_BILL_FIXTURE: Bill = findEntityBy({
  key: 'id',
  value: 'f5a2df8f-7b7b-4d85-b8db-12a107d6f797',
  list: BILL_LIST_TEMP,
});

export const PERSONAL_CREDIT_CARD_NUBANK_PHYSICAL_BILL_FIXTURE: Bill =
  findEntityBy({
    key: 'id',
    value: '5b5d20de-c9d6-48ec-a099-2d6b9b02ad43',
    list: BILL_LIST_TEMP,
  });

export const PERSONAL_CREDIT_CARD_NUBANK_DIGITAL_WALLET_BILL_FIXTURE: Bill =
  findEntityBy({
    key: 'id',
    value: '25bc91eb-fc6e-40ae-84df-e93d1bc5bd57',
    list: BILL_LIST_TEMP,
  });

export const PERSONAL_CREDIT_CARD_NUBANK_IFOOD_BILL_FIXTURE: Bill =
  findEntityBy({
    key: 'id',
    value: '95ba05ca-f307-45c4-879f-5f7fda221c54',
    list: BILL_LIST_TEMP,
  });

export const PERSONAL_CREDIT_CARD_NUBANK_CHINA_IN_BOX_FIXTURE: Bill =
  findEntityBy({
    key: 'id',
    value: 'f255fe92-920e-4e3f-a845-13b6e267ebd2',
    list: BILL_LIST_TEMP,
  });

export const PERSONAL_CREDIT_CARD_NUBANK_MERCADO_LIVRE_BILL_FIXTURE: Bill =
  findEntityBy({
    key: 'id',
    value: '68f6a344-5fda-45a7-9f73-61c2f057b9dc',
    list: BILL_LIST_TEMP,
  });

export const PERSONAL_CREDIT_CARD_NUBANK_STREAMING_BILL_FIXTURE: Bill =
  findEntityBy({
    key: 'id',
    value: '700afabc-fa96-4c7a-b06d-c3556cc2bc31',
    list: BILL_LIST_TEMP,
  });

export const PERSONAL_CREDIT_CARD_NUBANK_AMAZON_BILL_FIXTURE: Bill =
  findEntityBy({
    key: 'id',
    value: '5db368ef-0bd9-4233-aa75-c1a91e323b24',
    list: BILL_LIST_TEMP,
  });

export const PERSONAL_CREDIT_CARD_NUBANK_VIRTUAL_24H_BILL_FIXTURE: Bill =
  findEntityBy({
    key: 'id',
    value: '3c5f27fe-9f66-42af-812c-2fdc9af51cc4',
    list: BILL_LIST_TEMP,
  });

export const PERSONAL_CREDIT_CARD_PORTO_PHYSICAL_BILL_FIXTURE: Bill =
  findEntityBy({
    key: 'id',
    value: '3f5bf099-4c3b-4ee2-a21f-7d7ccd66d13c',
    list: BILL_LIST_TEMP,
  });

export const PERSONAL_BILL_LIST_FIXTURE: Array<Bill> = [
  PERSONAL_ACCOUNT_DEBIT_NUBANK_BILL_FIXTURE,
  PERSONAL_BANK_SLIP_NUBANK_BILL_FIXTURE,
  PERSONAL_CREDIT_CARD_NUBANK_PHYSICAL_BILL_FIXTURE,
  PERSONAL_CREDIT_CARD_NUBANK_DIGITAL_WALLET_BILL_FIXTURE,
  PERSONAL_CREDIT_CARD_NUBANK_IFOOD_BILL_FIXTURE,
  PERSONAL_CREDIT_CARD_NUBANK_CHINA_IN_BOX_FIXTURE,
  PERSONAL_CREDIT_CARD_NUBANK_MERCADO_LIVRE_BILL_FIXTURE,
  PERSONAL_CREDIT_CARD_NUBANK_STREAMING_BILL_FIXTURE,
  PERSONAL_CREDIT_CARD_NUBANK_AMAZON_BILL_FIXTURE,
  PERSONAL_CREDIT_CARD_NUBANK_VIRTUAL_24H_BILL_FIXTURE,
  PERSONAL_CREDIT_CARD_PORTO_PHYSICAL_BILL_FIXTURE,
];

export const BILL_LIST_FIXTURE: Array<Bill> = [
    ...INGRID_RESIDENTIAL_BILL_LIST_FIXTURE,
    ...MONTE_CARLO_RESIDENTIAL_BILL_LIST_FIXTURE,
    ...MOTHER_BILL_LIST_FIXTURE,
    ...PERSONAL_BILL_LIST_FIXTURE,
];