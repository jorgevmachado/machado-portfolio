import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import type { PokemonMoveEntity } from '@repo/business/pokemon/pokemon-move/interface';

@Entity({ name: 'pokemon_moves' })
export class PokemonMove implements PokemonMoveEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  pp: number;

  @Column({ nullable: false, length: 50 })
  url: string;

  @Column({ nullable: false })
  type: string;

  @Column({ nullable: false, length: 200 })
  name: string;

  @Column({ nullable: false })
  order: number;

  @Column({ nullable: true })
  power?: number;

  @Column({ nullable: true })
  target: string;

  @Column({ nullable: true })
  effect: string;

  @Column({ nullable: true })
  priority: number;

  @Column({ nullable: true })
  accuracy?: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;

  @Column({ nullable: true })
  short_effect: string;

  @Column({ nullable: true })
  damage_class: string;

  @Column({ nullable: true })
  effect_chance?: number;
}
