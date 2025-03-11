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

export class CreateBillDto {
  @IsEmpty()
  user: User;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 0 })
  year?: number;

  @IsNotEmpty()
  @MaxLength(200)
  name: string;

  @IsEnum(EBillType)
  type: EBillType;

  @IsNotEmpty()
  @MaxLength(200)
  bank: string | Bank;

  @IsEmpty()
  expenses?: Array<string | Expense>;
}