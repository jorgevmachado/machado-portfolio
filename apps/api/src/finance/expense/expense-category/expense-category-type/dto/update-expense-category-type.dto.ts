import { PartialType } from '@nestjs/mapped-types';
import { CreateExpenseCategoryTypeDto } from './create-expense-category-type.dto';

export class UpdateExpenseCategoryTypeDto extends PartialType(CreateExpenseCategoryTypeDto) {}
