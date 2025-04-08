import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { EGender, ERole, EStatus } from '@repo/business/shared/enum';
import type { UserEntity } from '@repo/business/auth/interface';

import { Finance } from '../../finance/finance.entity';

@Entity({ name: 'users' })
export class User implements UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, unique: true, length: 11 })
  cpf: string;

  @Column({ nullable: false, type: 'enum', enum: ERole, default: ERole.USER })
  role: ERole;

  @Column({ nullable: false })
  salt?: string;

  @Column({ nullable: false, length: 200 })
  name: string;

  @Column({ nullable: false, unique: true, length: 200 })
  email: string;

  @Column({ nullable: false })
  gender: EGender;

  @Column({
    nullable: false,
    type: 'enum',
    enum: EStatus,
    default: EStatus.INCOMPLETE,
  })
  status: EStatus;

  @Column({ nullable: false, unique: true, length: 11 })
  whatsapp: string;

  @Column({ nullable: true })
  picture?: string;

  @Column({ nullable: false })
  password?: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;

  @Column({ nullable: false })
  date_of_birth: Date;

  @Column({ nullable: true, length: 64 })
  recover_token?: string;

  @Column({ nullable: true, length: 64 })
  confirmation_token?: string;

  @OneToOne(() => Finance, (finance) => finance.user, { nullable: true })
  @JoinColumn()
  finance?: Finance;

  constructor(user?: User) {
    if (user) {
      this.id = user.id ?? this.id;
      this.cpf = user.cpf ?? this.cpf;
      this.role = user.role ?? this.role;
      this.salt = user.salt ?? this.salt;
      this.name = user.name ?? this.name;
      this.email = user.email ?? this.email;
      this.gender = user.gender ?? this.gender;
      this.status = user.status ?? this.status;
      this.whatsapp = user.whatsapp ?? this.whatsapp;
      this.picture = user.picture ?? this.picture;
      this.password = user.password ?? this.password;
      this.created_at = user.created_at ?? this.created_at;
      this.updated_at = user.updated_at ?? this.updated_at;
      this.deleted_at = user.deleted_at ?? this.deleted_at;
      this.date_of_birth = user.date_of_birth ?? this.date_of_birth;
      this.recover_token = user.recover_token ?? this.recover_token;
      this.confirmation_token =
        user.confirmation_token ?? this.confirmation_token;
    }
  }
}
