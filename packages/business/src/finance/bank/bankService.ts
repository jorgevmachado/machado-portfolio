import { type INestBaseResponse, Nest } from '../../api';

import { QueryParameters } from '../../shared';
import { Paginate } from '../../paginate';

import Bank from './bank';
import type { BankEntity } from './interface';

export class BankService {
  constructor(private nest: Nest) {}

  public async create(name: string): Promise<Bank> {
    return await this.nest.finance.bank
      .create({ name })
      .then((response) => new Bank(response));
  }

  public async update(param: string, name: string): Promise<Bank> {
    return await this.nest.finance.bank
      .update(param, { name })
      .then((response) => new Bank(response));
  }

  public async getAll(
    parameters: QueryParameters,
  ): Promise<Array<Bank> | Paginate<Bank>> {
    return await this.nest.finance.bank.getAll(parameters).then((response) => {
      if (Array.isArray(response)) {
        return response.map((result) => new Bank(result));
      }
      const responsePaginate = response as Paginate<BankEntity>;
      return {
        ...responsePaginate,
        results: responsePaginate.results.map((result) => new Bank(result)),
      };
    });
  }

  public async get(param: string): Promise<Bank> {
    return await this.nest.finance.bank
      .getOne(param)
      .then((response) => new Bank(response));
  }

  public async remove(param: string): Promise<INestBaseResponse> {
    return await this.nest.finance.bank.delete(param);
  }
}