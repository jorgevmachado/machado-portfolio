import type { QueryParameters } from '@repo/business/shared/interface';

import { Nest } from '../../api';
import { Paginate } from '../../paginate';

import { BillEntity } from './interface';
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
}