import TypePaymentMethod from './TypePaymentMethod';

export const CREDIT_CARD: TypePaymentMethod = new TypePaymentMethod({
  name: 'Credit Card',
});
export const ACCOUNT_DEBIT: TypePaymentMethod = new TypePaymentMethod({
  name: 'Account Debit',
});
export const BANK_SLIP: TypePaymentMethod = new TypePaymentMethod({
  name: 'Bank Slip',
});
export const PIX: TypePaymentMethod = new TypePaymentMethod({ name: 'PIX' });

export const TYPE_PAYMENT_METHOD_SEEDS: Array<TypePaymentMethod> = [
  PIX,
  BANK_SLIP,
  CREDIT_CARD,
  ACCOUNT_DEBIT,
];