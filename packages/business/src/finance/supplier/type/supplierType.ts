import { type ISupplierType } from '../../../api/nest/finance';

interface SupplierTypeConstructorParams extends Pick<ISupplierType, 'name'> {
  id?: ISupplierType['id'];
  created_at?: ISupplierType['created_at'];
  updated_at?: ISupplierType['updated_at'];
  deleted_at?: ISupplierType['deleted_at'];
}

export default class SupplierType implements ISupplierType {
  id: ISupplierType['id'];
  name: ISupplierType['name'];
  created_at: ISupplierType['created_at'];
  updated_at: ISupplierType['updated_at'];
  deleted_at: ISupplierType['deleted_at'];

  constructor(params?: SupplierTypeConstructorParams) {
    if (params) {
      this.id = params?.id ?? this.id;
      this.name = params?.name ?? this.name;
      this.created_at = params?.created_at ?? this.created_at;
      this.updated_at = params?.updated_at ?? this.updated_at;
      this.deleted_at = params?.deleted_at ?? this.deleted_at;
    }
  }
}