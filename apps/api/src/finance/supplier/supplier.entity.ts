import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import type { SupplierEntity } from '@repo/business/finance/supplier/interface';

import { Expense } from '../expense/expense.entity';

import { SupplierType } from './supplier-type/supplierType.entity';

@Entity({ name: 'suppliers' })
export class Supplier implements SupplierEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true, length: 200 })
  name: string;

  @ManyToOne(() => SupplierType, (supplierType) => supplierType.suppliers, {
    nullable: false,
  })
  @JoinTable()
  type: SupplierType;

  @OneToMany(() => Expense, (expense) => expense.group)
  @JoinTable()
  expenses?: Array<Expense>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;

  constructor(supplier?: Supplier) {
    if (supplier) {
      this.id = supplier?.id ?? this.id;
      this.name = supplier?.name ?? this.name;
      this.type = supplier?.type ?? this.type;
      this.created_at = supplier?.created_at ?? this.created_at;
      this.updated_at = supplier?.updated_at ?? this.updated_at;
      this.deleted_at = supplier?.deleted_at ?? this.deleted_at;
    }
  }
}