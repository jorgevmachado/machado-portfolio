import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateSupplierTypeDto {
  @IsNotEmpty()
  @MaxLength(200)
  name: string;
}