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

  public async create(billId: string, params: ExpenseCreateParams): Promise<Expense> {
    return await this.nest.finance.bill.expense
      .createByBill(billId, params)
      .then((response) => new Expense(response));
  }

  public async update(
    billId: string,
    param: string,
    params: ExpenseUpdateParams,
  ): Promise<Expense> {
    return this.nest.finance.bill.expense
      .updateByBill(billId, param, params)
      .then((response) => new Expense(response));
  }

  public async getAll(
    billId: string,
    parameters: QueryParameters,
  ): Promise<Array<Expense> | Paginate<Expense>> {
    return await this.nest.finance.bill.expense
      .getAllByBill(billId, parameters)
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

  public async get(billId: string, param: string): Promise<Expense> {
    return await this.nest.finance.bill.expense
      .getOneByBill(billId, param)
      .then((response) => new Expense(response));
  }

  public async remove(billId: string, param: string): Promise<INestBaseResponse> {
    return await this.nest.finance.bill.expense.deleteByBill(billId, param);
  }
}