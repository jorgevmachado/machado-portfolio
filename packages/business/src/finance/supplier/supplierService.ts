import { type INestBaseResponse, Nest } from '../../api';

import { QueryParameters } from '@repo/business/shared/interface';

import { Paginate } from '../../paginate';

import Supplier from './supplier';
import {
  CreateSupplierParams,
  SupplierEntity,
  UpdateSupplierParams,
} from './interface';

export class SupplierService {
  constructor(private nest: Nest) {}

  public async create(params: CreateSupplierParams): Promise<Supplier> {
    return await this.nest.finance.supplier
      .create(params)
      .then((response) => new Supplier(response));
  }

  public async update(
    param: string,
    params: UpdateSupplierParams,
  ): Promise<Supplier> {
    return this.nest.finance.supplier
      .update(param, params)
      .then((response) => new Supplier(response));
  }

  public async getAll(
    parameters: QueryParameters,
  ): Promise<Array<Supplier> | Paginate<Supplier>> {
    return await this.nest.finance.supplier
      .getAll(parameters)
      .then((response) => {
        if (Array.isArray(response)) {
          return response.map((result) => new Supplier(result));
        }
        const responsePaginate = response as Paginate<SupplierEntity>;
        return {
          ...responsePaginate,
          results: responsePaginate.results.map(
            (result) => new Supplier(result),
          ),
        };
      });
  }

  public async get(param: string): Promise<Supplier> {
    return await this.nest.finance.supplier
      .getOne(param)
      .then((response) => new Supplier(response));
  }

  public async remove(param: string): Promise<INestBaseResponse> {
    return await this.nest.finance.supplier.delete(param);
  }
}