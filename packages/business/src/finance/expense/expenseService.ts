import { type INestBaseResponse, Nest } from '../../api';

import { QueryParameters } from '@repo/business/shared/interface';

import { Paginate } from '../../paginate';

import Expense from './expense';
import {
  ExpenseCreateParams,
  ExpenseEntity,
  ExpenseUpdateParams,
} from './interface';

export class ExpenseService {
  constructor(private nest: Nest) {}

  public async create(params: ExpenseCreateParams): Promise<Expense> {
    return await this.nest.finance.expense
      .create(params)
      .then((response) => new Expense(response));
  }

  public async update(
    param: string,
    params: ExpenseUpdateParams,
  ): Promise<Expense> {
    return this.nest.finance.expense
      .update(param, params)
      .then((response) => new Expense(response));
  }

  public async getAll(
    parameters: QueryParameters,
  ): Promise<Array<Expense> | Paginate<Expense>> {
    return await this.nest.finance.expense
      .getAll(parameters)
      .then((response) => {
        if (Array.isArray(response)) {
          return response.map((result) => new Expense(result));
        }

        const responsePaginate = response as Paginate<ExpenseEntity>;
        return {
          ...responsePaginate,
          results: responsePaginate.results.map(
            (result) => new Expense(result),
          ),
        };
      });
  }

  public async get(param: string): Promise<Expense> {
    return await this.nest.finance.expense
      .getOne(param)
      .then((response) => new Expense(response));
  }

  public async remove(param: string): Promise<INestBaseResponse> {
    return await this.nest.finance.expense.delete(param);
  }
}