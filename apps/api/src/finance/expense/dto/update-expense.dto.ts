import { PartialType } from '@nestjs/mapped-types';
import { EntityExpenseDto } from './entity-expense.dto';

export class UpdateExpenseDto extends PartialType(EntityExpenseDto) {}