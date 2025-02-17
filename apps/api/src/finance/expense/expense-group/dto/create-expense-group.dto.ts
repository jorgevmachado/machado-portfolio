import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateExpenseGroupDto {
  @IsNotEmpty()
  @MaxLength(200)
  name: string;
}
