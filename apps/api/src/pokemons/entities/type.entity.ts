import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import type { TypeEntity } from '@repo/business/pokemon/modules/type/interface';

@Entity({ name: 'types' })
export class Type implements TypeEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, length: 50 })
  url: string;

  @Column({ nullable: false, length: 200 })
  name: string;

  @Column({ nullable: false })
  order: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  text_color: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  background_color: string;

  constructor(type?: Type) {
    if (type) {
      this.id = type?.id ?? this.id;
      this.url = type.url ?? this.url;
      this.name = type.name ?? this.name;
      this.order = type.order ?? this.order;
      this.created_at = type.created_at ?? this.created_at;
      this.updated_at = type.updated_at ?? this.updated_at;
      this.deleted_at = type.deleted_at ?? this.deleted_at;
      this.text_color = type.text_color ?? this.text_color;
      this.background_color = type.background_color ?? this.background_color;
    }
  }
}
