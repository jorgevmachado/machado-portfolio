import { PartialType } from '@nestjs/mapped-types';
import { CreateSupplierTypeDto } from './create-supplier-type.dto';

export class UpdateSupplierTypeDto extends PartialType(CreateSupplierTypeDto) {}
