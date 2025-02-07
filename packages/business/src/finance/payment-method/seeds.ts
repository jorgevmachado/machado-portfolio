import { CREDIT_CARD } from './type';
import PaymentMethod from './paymentMethod';

export const PHYSICAL_CARD: PaymentMethod = new PaymentMethod({
  name: 'Physical Card',
  type: CREDIT_CARD,
});

export const PAYMENT_METHOD_SEEDS: Array<PaymentMethod> = [PHYSICAL_CARD];