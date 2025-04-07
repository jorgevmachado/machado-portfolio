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
import { Bill } from '../bill.entity';
import { BillCategoryEntity } from '@repo/business/finance/bill-category/interface';

@Entity({ name: 'bill_categories' })
export class BillCategory implements BillCategoryEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true, length: 200 })
  name: string;

  @OneToMany(() => Bill, (bill) => bill.category)
  @JoinTable()
  bills?: Array<Bill>;

  @Column({ nullable: false, unique: true, length: 200 })
  name_code: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;
}
