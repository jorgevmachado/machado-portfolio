import type { BankEntity } from '@repo/business/finance/bank/interface';
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
import { Bill } from '../bill/bill.entity';

@Entity({ name: 'banks' })
export class Bank implements BankEntity {
  @PrimaryGeneratedColumn('uuid')
  id: BankEntity['id'];

  @Column({ nullable: false, unique: true, length: 200 })
  name: string;

  @OneToMany(() => Bill, (bill) => bill.bank)
  @JoinTable()
  bills?: Array<Bill>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}