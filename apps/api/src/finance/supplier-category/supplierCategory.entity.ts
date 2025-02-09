import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity, JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import type { SupplierCategory as EntitySupplierCategory } from '@repo/business/finance/interface';

import { SupplierType } from '../supplier-type/supplierType.entity';
import { Supplier } from '../supplier/supplier.entity';

@Entity({ name: 'supplier_categories' })
export class SupplierCategory implements EntitySupplierCategory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, length: 200 })
  name: string;

  @ManyToOne(() => SupplierType, (supplierType) => supplierType.categories, {
    nullable: false,
  })
  @JoinTable()
  type: SupplierType;

  @OneToMany(() => Supplier, (supplier) => supplier.category)
  @JoinTable()
  suppliers!: Array<Supplier>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  constructor(supplierCategory?: SupplierCategory) {
    if (supplierCategory) {
      this.id = supplierCategory?.id ?? this.id;
      this.name = supplierCategory?.name ?? this.name;
      this.type = supplierCategory?.type ?? this.type;
      this.created_at = supplierCategory?.created_at ?? this.created_at;
      this.updated_at = supplierCategory?.updated_at ?? this.updated_at;
      this.deleted_at = supplierCategory?.deleted_at ?? this.deleted_at;
    }
  }
}