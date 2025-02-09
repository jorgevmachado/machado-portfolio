import { IsNotEmpty, MaxLength } from 'class-validator';

export class CreateSupplierCategoryDto {
    @IsNotEmpty()
    @MaxLength(200)
    name: string;

    @IsNotEmpty()
    @MaxLength(200)
    type: string;
}