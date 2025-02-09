import { IsNotEmpty, MaxLength } from 'class-validator';
import { SupplierCategory } from '../supplier-category/supplierCategory.entity';

export class CreateSupplierDto {
  @IsNotEmpty()
  @MaxLength(200)
  name: string;

  @IsNotEmpty()
  @MaxLength(200)
  category: string | SupplierCategory;
}