import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import type { PokemonAbilityEntity } from '@repo/business/pokemon/pokemon-ability/interface';

@Entity({ name: 'pokemon_abilities' })
export class PokemonAbility implements PokemonAbilityEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false, length: 50 })
  url: string;

  @Column({ nullable: false, length: 200 })
  name: string;

  @Column({ nullable: false })
  slot: number;

  @Column({ nullable: false })
  order: number;

  @Column({ nullable: false })
  is_hidden: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at?: Date;

  constructor(ability?: PokemonAbility) {
    if (ability) {
      this.id = ability.id ?? this.id;
      this.url = ability.url ?? this.url;
      this.name = ability.name ?? this.name;
      this.slot = ability.slot ?? this.slot;
      this.order = ability.order ?? this.order;
      this.is_hidden = ability.is_hidden ?? this.is_hidden;
      this.created_at = ability.created_at ?? this.created_at;
      this.deleted_at = ability.deleted_at ?? this.deleted_at;
      this.updated_at = ability.updated_at ?? this.updated_at;
    }
  }
}
