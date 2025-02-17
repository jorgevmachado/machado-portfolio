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

import type { ExpenseGroupEntity } from '@repo/business/finance/expense-group/interface';

import { Expense } from '../expense.entity';

@Entity({ name: 'expense_groups' })
export class ExpenseGroup implements ExpenseGroupEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true, length: 200 })
  name: string;

  @OneToMany(() => Expense, (expense) => expense.group)
  @JoinTable()
  expenses?: Array<Expense>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
