import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateBankDto {
  @IsNotEmpty()
  @MaxLength(200)
  name: string;
}