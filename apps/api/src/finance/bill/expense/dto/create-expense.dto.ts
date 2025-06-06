import {
  IsBoolean,
  IsEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  MaxLength,
} from 'class-validator';

import { EExpenseType, EMonth } from '@repo/business/finance/enum';

import { Supplier } from '../../../supplier/supplier.entity';

export class CreateExpenseDto {
  @IsNotEmpty()
  @IsEnum(EExpenseType)
  type: EExpenseType;

  @IsEmpty()
  @IsBoolean()
  paid?: boolean;

  @IsPositive()
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 0 })
  value: number;

  @IsEmpty()
  @IsEnum(EMonth)
  month?: EMonth;

  @IsNotEmpty()
  @MaxLength(200)
  supplier: string | Supplier;

  @IsEmpty()
  @MaxLength(200)
  description?: string;

  @IsPositive()
  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 0 })
  instalment_number: number;
}
