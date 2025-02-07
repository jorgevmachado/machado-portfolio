import { type ITypePaymentMethod } from '../../../api/nest/finance';

interface TypePaymentMethodConstructorParams
  extends Pick<ITypePaymentMethod, 'name'> {
  id?: ITypePaymentMethod['id'];
  created_at?: ITypePaymentMethod['created_at'];
  updated_at?: ITypePaymentMethod['updated_at'];
  deleted_at?: ITypePaymentMethod['deleted_at'];
}

export default class TypePaymentMethod implements ITypePaymentMethod {
  id: ITypePaymentMethod['id'];
  name: ITypePaymentMethod['name'];
  created_at: ITypePaymentMethod['created_at'];
  updated_at: ITypePaymentMethod['updated_at'];
  deleted_at: ITypePaymentMethod['deleted_at'];
  constructor(params?: TypePaymentMethodConstructorParams) {
    if (params) {
      this.id = params?.id ?? this.id;
      this.name = params?.name ?? this.name;
      this.created_at = params?.created_at ?? this.created_at;
      this.updated_at = params?.updated_at ?? this.updated_at;
      this.deleted_at = params?.deleted_at ?? this.deleted_at;
    }
  }
}