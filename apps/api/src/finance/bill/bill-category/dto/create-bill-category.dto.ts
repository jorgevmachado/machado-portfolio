import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateBillCategoryDto {
  @IsNotEmpty()
  @MaxLength(200)
  name: string;
}
