import { type INestBaseResponse, Nest } from '../../api';

import { QueryParameters } from '../../shared';
import { Paginate } from '../../paginate';

import ExpenseCategoryType from './expenseCategoryType';

import { ExpenseCategoryTypeEntity } from './interface';

export class ExpenseCategoryTypeService {
  constructor(private nest: Nest) {}

  public async create(name: string): Promise<ExpenseCategoryType> {
    return this.nest.finance.expense.category.type
      .create({ name })
      .then((response) => new ExpenseCategoryType(response));
  }

  public async update(
    param: string,
    name: string,
  ): Promise<ExpenseCategoryType> {
    return this.nest.finance.expense.category.type
      .update(param, { name })
      .then((response) => new ExpenseCategoryType(response));
  }

  public async getAll(
    parameters: QueryParameters,
  ): Promise<Array<ExpenseCategoryType> | Paginate<ExpenseCategoryType>> {
    return await this.nest.finance.expense.category.type
      .getAll(parameters)
      .then((response) => {
        if (Array.isArray(response)) {
          return response.map((result) => new ExpenseCategoryType(result));
        }
        const responsePaginate =
          response as Paginate<ExpenseCategoryTypeEntity>;
        return {
          ...responsePaginate,
          results: responsePaginate.results.map(
            (result) => new ExpenseCategoryType(result),
          ),
        };
      });
  }

  public async get(param: string): Promise<ExpenseCategoryType> {
    return await this.nest.finance.expense.category.type
      .getOne(param)
      .then((response) => new ExpenseCategoryType(response));
  }

  public async remove(param: string): Promise<INestBaseResponse> {
    return await this.nest.finance.expense.category.type.delete(param);
  }
}