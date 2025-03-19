import {
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  MaxLength,
} from 'class-validator';

import { EBillType } from '@repo/business/finance/enum';

import { User } from '../../../auth/users/user.entity';
import { Bank } from '../../bank/bank.entity';
import { Expense } from '../../expense/expense.entity';
import { BillCategory } from '../bill-category/bill-category.entity';

export class CreateBillDto {
  @IsEmpty()
  user: User;

  @IsEnum(EBillType)
  type: EBillType;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 0 })
  year?: number;

  @IsNotEmpty()
  @MaxLength(200)
  bank: string | Bank;

  @IsNotEmpty()
  @MaxLength(200)
  category: string | BillCategory;

  @IsEmpty()
  expenses?: Array<string | Expense>;
}