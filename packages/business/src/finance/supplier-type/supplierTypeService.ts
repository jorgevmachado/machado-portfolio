import { type INestBaseResponse, Nest } from '../../api';

import { QueryParameters } from '../../shared';
import { Paginate } from '../../paginate';

import SupplierType from './supplierType';
import type {
  CreateSupplierTypeParams,
  SupplierTypeEntity,
  UpdateSupplierTypeParams,
} from './interface';

export class SupplierTypeService {
  constructor(private nest: Nest) {}

  public async create(params: CreateSupplierTypeParams): Promise<SupplierType> {
    return await this.nest.finance.supplier.type
      .create(params)
      .then((response) => new SupplierType(response));
  }

  public async update(
    param: string,
    params: UpdateSupplierTypeParams,
  ): Promise<SupplierType> {
    return await this.nest.finance.supplier.type
      .update(param, params)
      .then((response) => new SupplierType(response));
  }

  public async getAll(
    parameters: QueryParameters,
  ): Promise<Array<SupplierType> | Paginate<SupplierType>> {
    return await this.nest.finance.supplier.type
      .getAll(parameters)
      .then((response) => {
        if (Array.isArray(response)) {
          return response.map((result) => new SupplierType(result));
        }
        const responsePaginate = response as Paginate<SupplierTypeEntity>;
        return {
          ...responsePaginate,
          results: responsePaginate.results.map(
            (result) => new SupplierType(result),
          ),
        };
      });
  }

  public async get(param: string): Promise<SupplierType> {
    return await this.nest.finance.supplier.type
      .getOne(param)
      .then((response) => new SupplierType(response));
  }

  public async remove(param: string): Promise<INestBaseResponse> {
    return await this.nest.finance.supplier.type.delete(param);
  }
}