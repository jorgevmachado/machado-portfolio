import { PartialType } from '@nestjs/mapped-types';
import { CreateExpenseCategoryDto } from './create-expense-category.dto';

export class UpdateExpenseCategoryDto extends PartialType(CreateExpenseCategoryDto) {}
