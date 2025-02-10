import { type ISupplier } from '../../api/nest/finance';

interface SupplierConstructorParams
  extends Omit<ISupplier, 'id' | 'created_at' | 'updated_at' | 'deleted_at'> {
  id?: ISupplier['id'];
  created_at?: ISupplier['created_at'];
  updated_at?: ISupplier['updated_at'];
  deleted_at?: ISupplier['deleted_at'];
}

export default class Supplier implements ISupplier {
  id: ISupplier['id'];
  name: ISupplier['name'];
  type: ISupplier['type'];
  active?: ISupplier['active'];
  created_at: ISupplier['created_at'];
  updated_at: ISupplier['updated_at'];
  deleted_at: ISupplier['deleted_at'];
  description?: ISupplier['description'];

  constructor(params?: SupplierConstructorParams) {
    if (params) {
      this.id = params?.id ?? this.id;
      this.name = params?.name ?? this.name;
      this.type = params?.type ?? this.type;
      this.active = params?.active ?? this.active;
      this.created_at = params?.created_at ?? this.created_at;
      this.updated_at = params?.updated_at ?? this.updated_at;
      this.deleted_at = params?.deleted_at ?? this.deleted_at;
      this.description = params?.description ?? this.description;
    }
  }
}