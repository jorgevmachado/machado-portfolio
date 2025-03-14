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

import { ExpenseCategory } from '../expense-category.entity';
import type { ExpenseCategoryTypeEntity } from '@repo/business/finance/expense-category-type/interface';

@Entity({ name: 'expense_category_types' })
export class ExpenseCategoryType implements ExpenseCategoryTypeEntity {
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
  deleted_at?: Date;
}
