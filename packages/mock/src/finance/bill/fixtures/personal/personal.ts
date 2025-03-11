import { EBillType } from '@repo/business/finance/enum';
import Bill from '@repo/business/finance/bill/bill';

import { USER_FIXTURE } from '../../../../auth';

import { NUBANK_BANK_FIXTURE, PORTO_BANK_FIXTURE } from '../../../bank';
import {
  LICENSING_CAR_PERSONAL_EXPENSE_FIXTURE,
  MASONIC_LODGE_PERSONAL_EXPENSE_FIXTURE,
  MOTOR_VEHICLE_PROPERTY_TAX_PERSONAL_EXPENSE_FIXTURE,
  MOTORCYCLE_CLUB_PERSONAL_EXPENSE_FIXTURE,
  PHILOSOPHICAL_MASONIC_LODGE_PERSONAL_EXPENSE_FIXTURE,
  PORTO_CREDIT_CARD_EXPENSE_LIST_FIXTURE,
} from '../../../expense';
import { PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_LIST_FIXTURE } from '../../../expense/fixtures/personal/credit-card/nubank/physical';
import { DIGITAL_WALLET_NUBANK_CREDIT_CARD_EXPENSE_LIST_FIXTURE } from '../../../expense/fixtures/personal/credit-card/nubank/digital-wallet';
import { IFOOD_NUBANK_CREDIT_CARD_EXPENSE_LIST_FIXTURE } from '../../../expense/fixtures/personal/credit-card/nubank/ifood';
import { CHINA_IN_BOX_NUBANK_CREDIT_CARD_EXPENSE_LIST_FIXTURE } from '../../../expense/fixtures/personal/credit-card/nubank/china';
import { MERCADO_LIVRE_NUBANK_CREDIT_CARD_EXPENSE_LIST_FIXTURE } from '../../../expense/fixtures/personal/credit-card/nubank/mercado-livre';
import { STREAMING_NUBANK_CREDIT_CARD_EXPENSE_LIST_FIXTURE } from '../../../expense/fixtures/personal/credit-card/nubank/streaming';
import { AMAZON_NUBANK_CREDIT_CARD_EXPENSE_LIST_FIXTURE } from '../../../expense/fixtures/personal/credit-card/nubank/amazon';
import { VIRTUAL_24H_NUBANK_CREDIT_CARD_EXPENSE_LIST_FIXTURE } from '../../../expense/fixtures/personal/credit-card/nubank/virtual-24h';

export const PERSONAL_ACCOUNT_DEBIT_NUBANK_BILL_FIXTURE: Bill = new Bill({
  id: '4bb19b63-a503-4750-a7ed-f1b06dd5917f',
  user: USER_FIXTURE,
  year: 2025,
  type: EBillType.ACCOUNT_DEBIT,
  bank: NUBANK_BANK_FIXTURE,
  name: 'Personal Account Debit Nubank',
  total: 0,
  expenses: [
    MASONIC_LODGE_PERSONAL_EXPENSE_FIXTURE,
    PHILOSOPHICAL_MASONIC_LODGE_PERSONAL_EXPENSE_FIXTURE,
    MOTORCYCLE_CLUB_PERSONAL_EXPENSE_FIXTURE,
  ],
});

export const PERSONAL_BANK_SLIP_NUBANK_BILL_FIXTURE: Bill = new Bill({
  id: 'f5a2df8f-7b7b-4d85-b8db-12a107d6f797',
  user: USER_FIXTURE,
  year: 2025,
  type: EBillType.BANK_SLIP,
  bank: NUBANK_BANK_FIXTURE,
  name: 'Personal Bank Slip Nubank',
  total: 0,
  expenses: [
    MOTOR_VEHICLE_PROPERTY_TAX_PERSONAL_EXPENSE_FIXTURE,
    LICENSING_CAR_PERSONAL_EXPENSE_FIXTURE,
  ],
});

export const PERSONAL_CREDIT_CARD_NUBANK_PHYSICAL_BILL_FIXTURE: Bill = new Bill(
  {
    id: '5b5d20de-c9d6-48ec-a099-2d6b9b02ad43',
    user: USER_FIXTURE,
    year: 2025,
    type: EBillType.CREDIT_CARD,
    bank: NUBANK_BANK_FIXTURE,
    name: 'Personal Physical Credit Card Nubank',
    total: 0,
    expenses: PHYSICAL_NUBANK_CREDIT_CARD_EXPENSE_LIST_FIXTURE,
  },
);

export const PERSONAL_CREDIT_CARD_NUBANK_DIGITAL_WALLET_BILL_FIXTURE: Bill =
  new Bill({
    id: '25bc91eb-fc6e-40ae-84df-e93d1bc5bd57',
    user: USER_FIXTURE,
    year: 2025,
    type: EBillType.CREDIT_CARD,
    bank: NUBANK_BANK_FIXTURE,
    name: 'Personal Digital Wallet Credit Card Nubank',
    total: 0,
    expenses: DIGITAL_WALLET_NUBANK_CREDIT_CARD_EXPENSE_LIST_FIXTURE,
  });

export const PERSONAL_CREDIT_CARD_NUBANK_IFOOD_BILL_FIXTURE: Bill = new Bill({
  id: '95ba05ca-f307-45c4-879f-5f7fda221c54',
  user: USER_FIXTURE,
  year: 2025,
  type: EBillType.CREDIT_CARD,
  bank: NUBANK_BANK_FIXTURE,
  name: 'Personal Ifood Credit Card Nubank',
  total: 0,
  expenses: IFOOD_NUBANK_CREDIT_CARD_EXPENSE_LIST_FIXTURE,
});

export const PERSONAL_CREDIT_CARD_NUBANK_CHINA_IN_BOX_FIXTURE: Bill = new Bill({
  id: 'f255fe92-920e-4e3f-a845-13b6e267ebd2',
  user: USER_FIXTURE,
  year: 2025,
  type: EBillType.CREDIT_CARD,
  bank: NUBANK_BANK_FIXTURE,
  name: 'Personal China In Box Credit Card Nubank',
  total: 0,
  expenses: CHINA_IN_BOX_NUBANK_CREDIT_CARD_EXPENSE_LIST_FIXTURE,
});

export const PERSONAL_CREDIT_CARD_NUBANK_MERCADO_LIVRE_BILL_FIXTURE: Bill =
  new Bill({
    id: '68f6a344-5fda-45a7-9f73-61c2f057b9dc',
    user: USER_FIXTURE,
    year: 2025,
    type: EBillType.CREDIT_CARD,
    bank: NUBANK_BANK_FIXTURE,
    name: 'Personal Mercado Livre Credit Card Nubank',
    total: 0,
    expenses: MERCADO_LIVRE_NUBANK_CREDIT_CARD_EXPENSE_LIST_FIXTURE,
  });

export const PERSONAL_CREDIT_CARD_NUBANK_STREAMING_BILL_FIXTURE: Bill =
  new Bill({
    id: '700afabc-fa96-4c7a-b06d-c3556cc2bc31',
    user: USER_FIXTURE,
    year: 2025,
    type: EBillType.CREDIT_CARD,
    bank: NUBANK_BANK_FIXTURE,
    name: 'Personal Streaming Credit Card Nubank',
    total: 0,
    expenses: STREAMING_NUBANK_CREDIT_CARD_EXPENSE_LIST_FIXTURE,
  });

export const PERSONAL_CREDIT_CARD_NUBANK_AMAZON_BILL_FIXTURE: Bill = new Bill({
  id: '5db368ef-0bd9-4233-aa75-c1a91e323b24',
  user: USER_FIXTURE,
  year: 2025,
  type: EBillType.CREDIT_CARD,
  bank: NUBANK_BANK_FIXTURE,
  name: 'Personal Amazon Credit Card Nubank',
  total: 0,
  expenses: AMAZON_NUBANK_CREDIT_CARD_EXPENSE_LIST_FIXTURE,
});

export const PERSONAL_CREDIT_CARD_NUBANK_VIRTUAL_24H_BILL_FIXTURE: Bill =
  new Bill({
    id: '3c5f27fe-9f66-42af-812c-2fdc9af51cc4',
    user: USER_FIXTURE,
    year: 2025,
    type: EBillType.CREDIT_CARD,
    bank: NUBANK_BANK_FIXTURE,
    name: 'Personal Virtual 24 Horas Credit Card Nubank',
    total: 0,
    expenses: VIRTUAL_24H_NUBANK_CREDIT_CARD_EXPENSE_LIST_FIXTURE,
  });

export const PERSONAL_CREDIT_CARD_PORTO_PHYSICAL_BILL_FIXTURE: Bill = new Bill({
  id: '3f5bf099-4c3b-4ee2-a21f-7d7ccd66d13c',
  user: USER_FIXTURE,
  year: 2025,
  type: EBillType.CREDIT_CARD,
  bank: PORTO_BANK_FIXTURE,
  name: 'Personal Physical Credit Card Porto',
  total: 0,
  expenses: PORTO_CREDIT_CARD_EXPENSE_LIST_FIXTURE,
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