import PaymentMethod from '@repo/business/finance/payment-method/paymentMethod';

import { CREDIT_CARD_TYPE_PAYMENT_METHOD_FIXTURE } from './type';

export const PHYSICAL_CARD_PAYMENT_METHOD_FIXTURE: PaymentMethod = new PaymentMethod({
  name: 'Physical Card',
  type: CREDIT_CARD_TYPE_PAYMENT_METHOD_FIXTURE,
});

export const LIST_PAYMENT_METHOD_FIXTURE: Array<PaymentMethod> = [PHYSICAL_CARD_PAYMENT_METHOD_FIXTURE];