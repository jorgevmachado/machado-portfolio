import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateExpenseCategoryTypeDto {
  @IsNotEmpty()
  @MaxLength(200)
  name: string;
}
