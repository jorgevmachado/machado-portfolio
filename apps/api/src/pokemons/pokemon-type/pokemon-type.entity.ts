import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import type { PokemonTypeEntity } from '@repo/business/pokemon/pokemon-type/interface';

@Entity({ name: 'pokemon_types' })
export class PokemonType implements PokemonTypeEntity {
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
  deleted_at?: Date;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  text_color: string;

  @Column({ nullable: false, type: 'varchar', length: 200 })
  background_color: string;
}
