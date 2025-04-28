import { type INestBaseResponse, Nest } from '../../api';

import { QueryParameters } from '../../shared';
import { Paginate } from '../../paginate';

import BillCategory from './billCategory';
import type {
    CreateBillCategoryParams,
    UpdateBillCategoryParams,
} from './interface';

export class BillCategoryService {
    constructor(private nest: Nest) {}

    public async create(params: CreateBillCategoryParams): Promise<BillCategory> {
        return await this.nest.finance.bill.category
            .create(params)
            .then((response) => new BillCategory(response));
    }

    public async update(
        param: string,
        params: UpdateBillCategoryParams,
    ): Promise<BillCategory> {
        return await this.nest.finance.bill.category
            .update(param, params)
            .then((response) => new BillCategory(response));
    }

    public async getAll(
        parameters: QueryParameters,
    ): Promise<Array<BillCategory> | Paginate<BillCategory>> {
        return await this.nest.finance.bill.category
            .getAll(parameters)
            .then((response) => {
                if (Array.isArray(response)) {
                    return response.map((result) => new BillCategory(result));
                }
                const responsePaginate = response as Paginate<BillCategory>;
                return {
                    ...responsePaginate,
                    results: responsePaginate.results.map(
                        (result) => new BillCategory(result),
                    ),
                };
            });
    }

    public async get(param: string): Promise<BillCategory> {
        return await this.nest.finance.bill.category
            .getOne(param)
            .then((response) => new BillCategory(response));
    }

    public async remove(param: string): Promise<INestBaseResponse> {
        return await this.nest.finance.bill.category.delete(param);
    }
}