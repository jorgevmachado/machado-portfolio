import { Nest } from '../../api';
import { ExpenseCategoryTypeResponse } from './interface';

export class ExpenseCategoryTypeService {
  constructor(private nest: Nest) {}

  public async create(name: string): Promise<ExpenseCategoryTypeResponse> {
    return this.nest.finance.expense.category.type.create(name);
  }
}