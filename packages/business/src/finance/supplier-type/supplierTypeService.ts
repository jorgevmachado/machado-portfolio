import { type INestBaseResponse, Nest } from '../../api';

import { isObject } from '@repo/services/object/object';

import { QueryParameters } from '../../shared';
import { Paginate } from '../../paginate';

import SupplierType from './supplierType';
import type { SupplierTypeEntity } from './interface';

export class SupplierTypeService {
  constructor(private nest: Nest) {}

  public async create(name: string): Promise<SupplierType> {
    return await this.nest.finance.supplier.type
      .create({ name })
      .then((response) => new SupplierType(response));
  }

  public async update(param: string, name: string): Promise<SupplierType> {
    return await this.nest.finance.supplier.type
      .update(param, { name })
      .then((response) => new SupplierType(response));
  }

  public async getAll(
    parameters: QueryParameters,
  ): Promise<Array<SupplierType> | Paginate<SupplierType>> {
    return await this.nest.finance.supplier.type
      .getAll(parameters)
      .then((response) => {
        if (isObject(response)) {
          const responsePaginate = response as Paginate<SupplierTypeEntity>;
          return {
            ...responsePaginate,
            results: responsePaginate.results.map(
              (result) => new SupplierType(result),
            ),
          };
        }
        const responseArray = response as Array<SupplierTypeEntity>;
        return responseArray.map((result) => new SupplierType(result));
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