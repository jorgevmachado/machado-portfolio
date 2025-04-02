import {
  IsBoolean,
  IsEmpty,
  IsEnum,
  IsNumber,
  IsPositive,
  MaxLength,
} from 'class-validator';

import { EExpenseType } from '@repo/business/finance/enum';

import { Supplier } from '../../../supplier/supplier.entity';

import { Bill } from '../../bill.entity';

export class UpdateExpenseDto {
  @IsEmpty()
  @IsEnum(EExpenseType)
  type?: EExpenseType;

  @IsEmpty()
  @MaxLength(200)
  bill?: string | Bill;

  @IsEmpty()
  @IsBoolean()
  paid?: boolean;

  @IsEmpty()
  @MaxLength(200)
  supplier?: string | Supplier;

  @IsEmpty()
  @MaxLength(200)
  description?: string;

  @IsPositive()
  @IsEmpty()
  @IsNumber({ maxDecimalPlaces: 0 })
  january?: number;

  @IsBoolean()
  @IsEmpty()
  january_paid?: boolean;

  @IsPositive()
  @IsEmpty()
  @IsNumber({ maxDecimalPlaces: 0 })
  february?: number;

  @IsBoolean()
  @IsEmpty()
  february_paid?: boolean;

  @IsPositive()
  @IsEmpty()
  @IsNumber({ maxDecimalPlaces: 0 })
  march?: number;

  @IsBoolean()
  @IsEmpty()
  march_paid?: boolean;

  @IsPositive()
  @IsEmpty()
  @IsNumber({ maxDecimalPlaces: 0 })
  april?: number;

  @IsBoolean()
  @IsEmpty()
  april_paid?: boolean;

  @IsPositive()
  @IsEmpty()
  @IsNumber({ maxDecimalPlaces: 0 })
  may?: number;

  @IsBoolean()
  @IsEmpty()
  may_paid?: boolean;

  @IsPositive()
  @IsEmpty()
  @IsNumber({ maxDecimalPlaces: 0 })
  june?: number;

  @IsBoolean()
  june_paid?: boolean;

  @IsPositive()
  @IsEmpty()
  @IsNumber({ maxDecimalPlaces: 0 })
  july?: number;

  @IsBoolean()
  @IsEmpty()
  july_paid?: boolean;

  @IsPositive()
  @IsEmpty()
  @IsNumber({ maxDecimalPlaces: 0 })
  august?: number;

  @IsBoolean()
  @IsEmpty()
  august_paid?: boolean;

  @IsPositive()
  @IsEmpty()
  @IsNumber({ maxDecimalPlaces: 0 })
  september?: number;

  @IsBoolean()
  @IsEmpty()
  september_paid?: boolean;

  @IsPositive()
  @IsEmpty()
  @IsNumber({ maxDecimalPlaces: 0 })
  october?: number;

  @IsBoolean()
  @IsEmpty()
  october_paid?: boolean;

  @IsPositive()
  @IsEmpty()
  @IsNumber({ maxDecimalPlaces: 0 })
  november?: number;

  @IsBoolean()
  @IsEmpty()
  november_paid?: boolean;

  @IsPositive()
  @IsEmpty()
  @IsNumber({ maxDecimalPlaces: 0 })
  december?: number;

  @IsBoolean()
  @IsEmpty()
  december_paid?: boolean;
}
