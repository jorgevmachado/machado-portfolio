import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateExpenseDto {
    @IsNotEmpty()
    @MaxLength(200)
    name: string;
}
