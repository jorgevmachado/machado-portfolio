import { type IPaymentMethod } from '../../api/nest/finance';

interface PaymentMethodConstructorParams
  extends Pick<IPaymentMethod, 'name' | 'type'> {
  id?: IPaymentMethod['id'];
  created_at?: IPaymentMethod['created_at'];
  updated_at?: IPaymentMethod['updated_at'];
  deleted_at?: IPaymentMethod['deleted_at'];
}

export default class PaymentMethod implements IPaymentMethod {
  id: IPaymentMethod['id'];
  name: IPaymentMethod['name'];
  type: IPaymentMethod['type'];
  created_at: IPaymentMethod['created_at'];
  updated_at: IPaymentMethod['updated_at'];
  deleted_at: IPaymentMethod['deleted_at'];

  constructor(params?: PaymentMethodConstructorParams) {
    if (params) {
      this.id = params?.id ?? this.id;
      this.name = params?.name ?? this.name;
      this.type = params?.type ?? this.type;
      this.created_at = params?.created_at ?? this.created_at;
      this.updated_at = params?.updated_at ?? this.updated_at;
      this.deleted_at = params?.deleted_at ?? this.deleted_at;
    }
  }
}