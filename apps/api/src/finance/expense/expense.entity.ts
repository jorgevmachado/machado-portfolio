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

import { User } from '../../auth/users/user.entity';

import { Supplier } from '../supplier/supplier.entity';

import { ExpenseGroup } from './expense-group/expense-group.entity';
import { ExpenseCategory } from './expense-category/expense-category.entity';

@Entity({ name: 'expenses' })
export class Expense implements ExpenseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  year?: number;

  @ManyToOne(() => User, (user) => user.expenses, {
    nullable: false,
  })
  @JoinTable()
  user: User;

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

  @ManyToOne(() => ExpenseGroup, (expenseGroup) => expenseGroup.expenses, {
    nullable: false,
  })
  @JoinTable()
  group: ExpenseGroup;

  @Column({ nullable: false })
  active?: boolean;

  @ManyToOne(() => Supplier, (supplier) => supplier.expenses, {
    nullable: false,
  })
  @JoinTable()
  supplier: Supplier;

  @ManyToOne(
    () => ExpenseCategory,
    (expenseCategory) => expenseCategory.expenses,
    {
      nullable: false,
    },
  )
  @JoinTable()
  category: ExpenseCategory;

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

  constructor(expense?: Expense) {
    if (expense) {
      this.id = expense?.id ?? this.id;
      this.user = expense?.user ?? this.user;
      this.year = expense?.year ?? this.year;
      this.type = expense?.type ?? this.type;
      this.paid = expense?.paid ?? this.paid;
      this.value = expense?.value ?? this.value;
      this.total = expense?.total ?? this.total;
      this.month = expense?.month ?? this.month;
      this.group = expense?.group ?? this.group;
      this.active = expense?.active ?? this.active;
      this.supplier = expense?.supplier ?? this.supplier;
      this.category = expense?.category ?? this.category;
      this.total_paid = expense?.total_paid ?? this.total_paid;
      this.january = expense?.january ?? this.january;
      this.february = expense?.february ?? this.february;
      this.march = expense?.march ?? this.march;
      this.april = expense?.april ?? this.april;
      this.may = expense?.may ?? this.may;
      this.june = expense?.june ?? this.june;
      this.july = expense?.july ?? this.july;
      this.august = expense?.august ?? this.august;
      this.september = expense?.september ?? this.september;
      this.october = expense?.october ?? this.october;
      this.november = expense?.november ?? this.november;
      this.december = expense?.december ?? this.december;
      this.january_paid = expense?.january_paid ?? this.january_paid;
      this.february_paid = expense?.february_paid ?? this.february_paid;
      this.march_paid = expense?.march_paid ?? this.march_paid;
      this.april_paid = expense?.april_paid ?? this.april_paid;
      this.may_paid = expense?.may_paid ?? this.may_paid;
      this.june_paid = expense?.june_paid ?? this.june_paid;
      this.july_paid = expense?.july_paid ?? this.july_paid;
      this.august_paid = expense?.august_paid ?? this.august_paid;
      this.september_paid = expense?.september_paid ?? this.september_paid;
      this.october_paid = expense?.october_paid ?? this.october_paid;
      this.november_paid = expense?.november_paid ?? this.november_paid;
      this.december_paid = expense?.december_paid ?? this.december_paid;
      this.created_at = expense?.created_at ?? this.created_at;
      this.updated_at = expense?.updated_at ?? this.updated_at;
      this.deleted_at = expense?.deleted_at ?? this.deleted_at;
      this.description = expense?.description ?? this.description;
      this.instalment_number =
        expense?.instalment_number ?? this.instalment_number;
    }
  }
}