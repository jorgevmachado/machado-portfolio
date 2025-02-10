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

import type { ExpenseCategory as EntityExpenseCategory } from '@repo/business/finance/interface';

import { Expense } from '../expense.entity';

import { ExpenseCategoryType } from './expense-category-type/expense-category-type.entity';

@Entity({ name: 'expense_categories' })
export class ExpenseCategory implements EntityExpenseCategory {
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
  expenses!: Array<Expense>;

  @Column({ nullable: false, unique: true, length: 200 })
  name: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  constructor(expenseCategory?: ExpenseCategory) {
    if(expenseCategory) {
      this.id = expenseCategory.id ?? this.id;
      this.name = expenseCategory.name ?? this.name;
      this.type = expenseCategory.type ?? this.type;
      this.created_at = expenseCategory.created_at ?? this.created_at;
      this.updated_at = expenseCategory.updated_at ?? this.updated_at;
      this.deleted_at = expenseCategory.deleted_at ?? this.deleted_at;
    }
  }
}
