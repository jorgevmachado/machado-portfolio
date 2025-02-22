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

import type { ExpenseCategoryEntity } from '@repo/business/finance/expense-category/interface';

import { Expense } from '../expense.entity';

import { ExpenseCategoryType } from './expense-category-type/expense-category-type.entity';

@Entity({ name: 'expense_categories' })
export class ExpenseCategory implements ExpenseCategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(
    () => ExpenseCategoryType,
    (expenseCategoryType) => expenseCategoryType.categories,
    {
      nullable: false,
    },
  )
  @JoinTable()
  type: ExpenseCategoryType;

  @OneToMany(() => Expense, (expense) => expense.group)
  @JoinTable()
  expenses?: Array<Expense>;

  @Column({ nullable: false, unique: true, length: 200 })
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
