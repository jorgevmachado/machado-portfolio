import TypePaymentMethod from '@repo/business/finance/payment-method/type/TypePaymentMethod';

export const CREDIT_CARD_TYPE_PAYMENT_METHOD_FIXTURE: TypePaymentMethod = new TypePaymentMethod({
    name: 'Credit Card',
});
export const ACCOUNT_DEBIT_TYPE_PAYMENT_METHOD_FIXTURE: TypePaymentMethod = new TypePaymentMethod({
    name: 'Account Debit',
});
export const BANK_SLIP_TYPE_PAYMENT_METHOD_FIXTURE: TypePaymentMethod = new TypePaymentMethod({
    name: 'Bank Slip',
});
export const PIX_TYPE_PAYMENT_METHOD_FIXTURE: TypePaymentMethod = new TypePaymentMethod({ name: 'PIX' });

export const LIST_TYPE_PAYMENT_METHOD_FIXTURE: Array<TypePaymentMethod> = [
    PIX_TYPE_PAYMENT_METHOD_FIXTURE,
    BANK_SLIP_TYPE_PAYMENT_METHOD_FIXTURE,
    CREDIT_CARD_TYPE_PAYMENT_METHOD_FIXTURE,
    ACCOUNT_DEBIT_TYPE_PAYMENT_METHOD_FIXTURE,
];