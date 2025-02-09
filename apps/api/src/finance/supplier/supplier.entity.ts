import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import type { Supplier as EntitySupplier } from '@repo/business/finance/interface';

import { SupplierCategory } from '../supplier-category/supplierCategory.entity';

@Entity({ name: 'suppliers' })
export class Supplier implements EntitySupplier {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true, length: 200 })
  name: string;

  @ManyToOne(
    () => SupplierCategory,
    (supplierCategory) => supplierCategory.suppliers,
    {
      nullable: false,
    },
  )
  @JoinTable()
  category: SupplierCategory;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  constructor(supplier?: Supplier) {
    if (supplier) {
      this.id = supplier?.id ?? this.id;
      this.name = supplier?.name ?? this.name;
      this.category = supplier?.category ?? this.category;
      this.created_at = supplier?.created_at ?? this.created_at;
      this.updated_at = supplier?.updated_at ?? this.updated_at;
      this.deleted_at = supplier?.deleted_at ?? this.deleted_at;
    }
  }
}