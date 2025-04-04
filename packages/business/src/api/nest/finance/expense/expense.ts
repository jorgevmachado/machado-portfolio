import type { QueryParameters } from '../../../../shared';
import { Paginate } from '../../../../paginate';

import type { INestBaseResponse, INestModuleConfig } from '../../interface';

import { NestModuleAbstract } from '../../nestModuleAbstract';

import type {
  IExpense,
  IExpenseCreateParams,
  IExpenseUpdateParams,
} from './interface';

export class Expense extends NestModuleAbstract<
  IExpense,
  IExpenseCreateParams,
  IExpenseUpdateParams
> {
  private readonly path_url: string;
  constructor(nestModuleConfig: INestModuleConfig) {
    const pathUrl = 'finance/bill';
    super({ pathUrl, nestModuleConfig });
    this.path_url = pathUrl;
  }

  public async getAllByBill(
    billId: string,
    params: QueryParameters,
  ): Promise<Paginate<IExpense> | Array<IExpense>> {
    return this.get(`${this.path_url}/${billId}/list/expense`, { params });
  }

  async getOneByBill(billId: string, expenseId: string): Promise<IExpense> {
    return this.get(`${this.path_url}/${billId}/expense/${expenseId}`);
  }

  async deleteByBill(
    billId: string,
    expenseId: string,
  ): Promise<INestBaseResponse> {
    return this.remove(`${this.path_url}/${billId}/expense/${expenseId}`);
  }

  async createByBill(
    billId: string,
    params: IExpenseCreateParams,
  ): Promise<IExpense> {
    return this.post(`${this.path_url}/${billId}/expense`, { body: params });
  }

  async updateByBill(
    billId: string,
    expenseId: string,
    params: IExpenseUpdateParams,
  ): Promise<IExpense> {
    return this.path(`${this.path_url}/${billId}/expense/${expenseId}`, {
      body: params,
    });
  }
}