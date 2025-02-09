import { IsNotEmpty, MaxLength } from 'class-validator';
import { SupplierType } from '../../supplier-type/supplierType.entity';

export class CreateSupplierCategoryDto {
  @IsNotEmpty()
  @MaxLength(200)
  name: string;

  @IsNotEmpty()
  @MaxLength(200)
  type: string | SupplierType;
}