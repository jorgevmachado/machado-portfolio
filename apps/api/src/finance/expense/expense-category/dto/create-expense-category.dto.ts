import { IsNotEmpty, MaxLength } from 'class-validator';

import { ExpenseCategoryType } from '../expense-category-type/expense-category-type.entity';

export class CreateExpenseCategoryDto {
  @IsNotEmpty()
  @MaxLength(200)
  name: string;

  @IsNotEmpty()
  @MaxLength(200)
  type: string | ExpenseCategoryType;
}
