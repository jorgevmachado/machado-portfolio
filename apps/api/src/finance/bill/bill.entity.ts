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

import type { BillEntity } from '@repo/business/finance/bill/interface';

import { EBillType } from '@repo/business/finance/enum';

import { DecimalTransformer } from '../../shared';

import { Bank } from '../bank/bank.entity';
import { Expense } from './expense/expense.entity';

import { Finance } from '../finance.entity';
import { BillCategory } from './bill-category/bill-category.entity';

@Entity({ name: 'bills' })
export class Bill implements BillEntity {
  @PrimaryGeneratedColumn('uuid')
  id: BillEntity['id'];

  @Column({ nullable: false })
  year?: number;

  @ManyToOne(() => Bank, (bank) => bank.bills, {
    nullable: false,
  })
  @JoinTable()
  bank: Bank;

  @Column({
    nullable: false,
    type: 'enum',
    enum: EBillType,
  })
  type: EBillType;

  @Column({ nullable: false, unique: true, length: 200 })
  name: string;

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
    transformer: new DecimalTransformer(),
  })
  total?: number;

  @ManyToOne(() => Finance, (finance) => finance.bills, {
    nullable: false,
  })
  @JoinTable()
  finance: Finance;

  @Column({ nullable: false, default: false })
  all_paid?: boolean;

  @Column({
    nullable: false,
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
    transformer: new DecimalTransformer(),
  })
  total_paid?: number;

  @OneToMany(() => Expense, (expense) => expense.bill, { nullable: true })
  @JoinTable()
  expenses?: Array<Expense>;

  @ManyToOne(() => BillCategory, (billCategory) => billCategory.bills, {
    nullable: false,
  })
  @JoinTable()
  category: BillCategory;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}