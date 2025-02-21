import { Nest } from '../../api';
import { ExpenseCategoryTypeEntity } from './interface';

export class ExpenseCategoryTypeService {
  constructor(private nest: Nest) {}

  public async create(name: string): Promise<ExpenseCategoryTypeEntity> {
    return this.nest.finance.expense.category.type.create({ name });
  }
}