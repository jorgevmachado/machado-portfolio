import type { QueryParameters } from '@repo/business/shared/interface';

import { Nest } from '../../api';
import { Paginate } from '../../paginate';

import type {
  BillEntity,
  CreateBillParams,
  UpdateBillParams,
} from './interface';
import Bill from './bill';
import BillBusiness from './billBusiness';

export class BillService {
  constructor(private nest: Nest) {}

  public async getAll(parameters: QueryParameters) {
    const billBusiness = new BillBusiness();
    return this.nest.finance.bill.getAll(parameters).then((response) => {
      if (Array.isArray(response)) {
        return response.map((bill) => billBusiness.initialize(bill));
      }
      const responsePaginate = response as Paginate<BillEntity>;
      return {
        ...responsePaginate,
        results: responsePaginate.results.map((bill) =>
          billBusiness.initialize(bill),
        ),
      };
    });
  }

  public async create(params: CreateBillParams): Promise<BillEntity> {
    return await this.nest.finance.bill
      .create(params)
      .then((response) => new Bill(response));
  }

  public async update(
    param: string,
    params: UpdateBillParams,
  ): Promise<BillEntity> {
    return await this.nest.finance.bill
      .update(param, params)
      .then((response) => new Bill(response));
  }
}