import { type IExpenseCategoryType } from '../../../../api/nest/finance';

interface ExpenseCategoryTypeConstructorParams extends Pick<IExpenseCategoryType, 'name'> {
    id?: IExpenseCategoryType['id'];
    created_at?: IExpenseCategoryType['created_at'];
    updated_at?: IExpenseCategoryType['updated_at'];
    deleted_at?: IExpenseCategoryType['deleted_at'];
}

export default class ExpenseCategoryType implements IExpenseCategoryType {
    id: IExpenseCategoryType['id'];
    name!: IExpenseCategoryType['name'];
    created_at: IExpenseCategoryType['created_at'];
    updated_at: IExpenseCategoryType['updated_at'];
    deleted_at: IExpenseCategoryType['deleted_at'];

    constructor(params?: ExpenseCategoryTypeConstructorParams) {
        if (params) {
            this.id = params.id ?? this.id;
            if(!params?.name) {
                throw new Error('name is required');
            }
            this.name = params.name;
            this.created_at = params?.created_at ?? this.created_at;
            this.updated_at = params?.updated_at ?? this.updated_at;
            this.deleted_at = params?.deleted_at ?? this.deleted_at;
        }
    }
}