import { IsDate, IsEmpty, IsEnum, MaxDate, MaxLength } from 'class-validator';

import { Transform } from 'class-transformer';

import { EGender, ERole, EStatus } from '@repo/business/shared/enum';

export class UpdateAuthDto {
  @IsEmpty()
  @IsEnum(ERole)
  role?: ERole;

  @IsEmpty()
  @MaxLength(200)
  name?: string;

  @IsEmpty()
  @IsEnum(EGender)
  gender?: EGender;

  @IsEmpty()
  @IsEnum(EStatus)
  status?: EStatus;

  @IsEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate()
  @MaxDate(new Date(new Date().setFullYear(new Date().getFullYear() - 18)), {
    message: 'You must be over 18 years old',
  })
  date_of_birth?: Date;
}