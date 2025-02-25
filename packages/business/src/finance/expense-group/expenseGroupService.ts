import { type INestBaseResponse, Nest } from '../../api';

import { QueryParameters } from '../../shared';
import { Paginate } from '../../paginate';

import ExpenseGroup from './expenseGroup';

import { ExpenseGroupEntity } from './interface';
import { isObject } from '@repo/services/object/object';

export class ExpenseGroupService {
  constructor(private nest: Nest) {}

  public async create(name: string): Promise<ExpenseGroup> {
    return this.nest.finance.expense.group
      .create({ name })
      .then((response) => new ExpenseGroup(response));
  }

  public async update(param: string, name: string): Promise<ExpenseGroup> {
    return this.nest.finance.expense.group
      .update(param, { name })
      .then((response) => new ExpenseGroup(response));
  }

  public async getAll(
    parameters: QueryParameters,
  ): Promise<Array<ExpenseGroup> | Paginate<ExpenseGroup>> {
    return await this.nest.finance.expense.group
      .getAll(parameters)
      .then((response) => {
        if (isObject(response)) {
          const responsePaginate = response as Paginate<ExpenseGroupEntity>;
          return {
            ...responsePaginate,
            results: responsePaginate.results.map(
              (result) => new ExpenseGroup(result),
            ),
          };
        }
        const responseArray = response as Array<ExpenseGroupEntity>;
        return responseArray.map((result) => new ExpenseGroup(result));
      });
  }

  public async get(param: string): Promise<ExpenseGroup> {
    return await this.nest.finance.expense.group
      .getOne(param)
      .then((response) => new ExpenseGroup(response));
  }

  public async remove(param: string): Promise<INestBaseResponse> {
    return await this.nest.finance.expense.group.delete(param);
  }
}