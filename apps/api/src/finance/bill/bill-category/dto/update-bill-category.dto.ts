import { PartialType } from '@nestjs/mapped-types';
import { CreateBillCategoryDto } from './create-bill-category.dto';

export class UpdateBillCategoryDto extends PartialType(CreateBillCategoryDto) {}
