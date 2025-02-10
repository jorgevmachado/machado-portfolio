import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import type { SupplierType as EntitySupplierType } from '@repo/business/finance/interface';

import { Supplier } from '../supplier.entity';

@Entity({ name: 'supplier_types' })
export class SupplierType implements EntitySupplierType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true, length: 200 })
  name: string;

  @OneToMany(() => Supplier, (supplier) => supplier.type)
  @JoinTable()
  suppliers!: Array<Supplier>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  constructor(supplierType?: SupplierType) {
    if (supplierType) {
      this.id = supplierType?.id ?? this.id;
      this.name = supplierType?.name ?? this.name;
      this.created_at = supplierType?.created_at ?? this.created_at;
      this.updated_at = supplierType?.updated_at ?? this.updated_at;
      this.deleted_at = supplierType?.deleted_at ?? this.deleted_at;
    }
  }
}