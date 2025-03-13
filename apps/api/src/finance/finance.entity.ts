import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import type { FinanceEntity } from '@repo/business/finance/interface';

import { User } from '../auth/users/user.entity';
import { Bill } from './bill/bill.entity';

@Entity({ name: 'finances' })
export class Finance implements FinanceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToOne(() => User, (user) => user.finance)
  user: User;

  @OneToMany(() => Bill, (bill) => bill.finance)
  @JoinTable()
  bills?: Array<Bill>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}