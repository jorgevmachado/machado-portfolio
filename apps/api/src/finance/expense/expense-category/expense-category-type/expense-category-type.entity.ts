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

import type { ExpenseCategoryType as EntityExpenseCategoryType } from '@repo/business/finance/interface';
import { ExpenseCategory } from '../expense-category.entity';

@Entity({ name: 'expense_category_types' })
export class ExpenseCategoryType implements EntityExpenseCategoryType {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true, length: 200 })
  name: string;

  @OneToMany(() => ExpenseCategory, (expenseCategory) => expenseCategory.type)
  @JoinTable()
  categories?: Array<ExpenseCategory>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  constructor(expenseCategoryType?: ExpenseCategoryType) {
    if (expenseCategoryType) {
      this.id = expenseCategoryType.id ?? this.id;
      this.name = expenseCategoryType.name ?? this.name;
      this.created_at = expenseCategoryType.created_at ?? this.created_at;
      this.updated_at = expenseCategoryType.updated_at ?? this.updated_at;
      this.deleted_at = expenseCategoryType.deleted_at ?? this.deleted_at;
    }
  }
}
