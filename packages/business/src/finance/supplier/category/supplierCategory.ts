import { type ISupplierCategory } from '../../../api/nest/finance';

interface SupplierCategoryConstructorParams extends Pick<ISupplierCategory, 'name' | 'type'> {
    id?: ISupplierCategory['id'];
    created_at?: ISupplierCategory['created_at'];
    updated_at?: ISupplierCategory['updated_at'];
    deleted_at?: ISupplierCategory['deleted_at'];
}

export default class SupplierCategory implements ISupplierCategory {
    id: ISupplierCategory['id'];
    name: ISupplierCategory['name'];
    type: ISupplierCategory['type'];
    created_at: ISupplierCategory['created_at'];
    updated_at: ISupplierCategory['updated_at'];
    deleted_at: ISupplierCategory['deleted_at'];

    constructor(params?: SupplierCategoryConstructorParams) {
        if(params) {
            this.id = params?.id ?? this.id;
            this.name = params?.name ?? this.name;
            this.type = params?.type ?? this.type;
            this.created_at = params?.created_at ?? this.created_at;
            this.updated_at = params?.updated_at ?? this.updated_at;
            this.deleted_at = params?.deleted_at ?? this.deleted_at;
        }
    }
}