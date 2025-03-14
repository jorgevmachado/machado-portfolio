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

import type { ExpenseEntity } from '@repo/business/finance/expense/interface';
import { EExpenseType, EMonth } from '@repo/business/finance/enum';

import { DecimalTransformer } from '../../shared';

import { Supplier } from '../supplier/supplier.entity';
import { Bill } from '../bill/bill.entity';

@Entity({ name: 'expenses' })
export class Expense implements ExpenseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  year?: number;

  @ManyToOne(() => Bill, (bill) => bill.expenses, {
    nullable: true,
  })
  @JoinTable()
  bill?: Bill;

  @Column({
    nullable: false,
    type: 'enum',
    enum: EExpenseType,
  })
  type: EExpenseType;

  @Column({ nullable: false })
  paid?: boolean;

  value?: number;

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
    transformer: new DecimalTransformer(),
  })
  total?: number;

  month?: EMonth;

  @Column({ nullable: false })
  active?: boolean;

  @ManyToOne(() => Supplier, (supplier) => supplier.expenses, {
    nullable: false,
  })
  @JoinTable()
  supplier: Supplier;

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
    transformer: new DecimalTransformer(),
  })
  total_paid?: number;

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
    transformer: new DecimalTransformer(),
  })
  january?: number;

  @Column({ nullable: false })
  january_paid?: boolean;

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
    transformer: new DecimalTransformer(),
  })
  february?: number;

  @Column({ nullable: false })
  february_paid?: boolean;

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
    transformer: new DecimalTransformer(),
  })
  march?: number;

  @Column({ nullable: false })
  march_paid?: boolean;

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
    transformer: new DecimalTransformer(),
  })
  april?: number;

  @Column({ nullable: false })
  april_paid?: boolean;

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
    transformer: new DecimalTransformer(),
  })
  may?: number;

  @Column({ nullable: false })
  may_paid?: boolean;

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
    transformer: new DecimalTransformer(),
  })
  june?: number;

  @Column({ nullable: false })
  june_paid?: boolean;

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
    transformer: new DecimalTransformer(),
  })
  july?: number;

  @Column({ nullable: false })
  july_paid?: boolean;

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
    transformer: new DecimalTransformer(),
  })
  august?: number;

  @Column({ nullable: false })
  august_paid?: boolean;

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
    transformer: new DecimalTransformer(),
  })
  september?: number;

  @Column({ nullable: false })
  september_paid?: boolean;

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
    transformer: new DecimalTransformer(),
  })
  october?: number;

  @Column({ nullable: false })
  october_paid?: boolean;

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
    transformer: new DecimalTransformer(),
  })
  november?: number;

  @Column({ nullable: false })
  november_paid?: boolean;

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
    transformer: new DecimalTransformer(),
  })
  december?: number;

  @Column({ nullable: false })
  december_paid?: boolean;

  @Column({ nullable: true })
  description?: string;

  @Column({ nullable: false })
  instalment_number?: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}