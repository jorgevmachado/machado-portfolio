import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { EStatus } from '@repo/business/shared/enum';

import type {
  AbilityEntity,
  MoveEntity,
  PokemonEntity,
  TypeEntity,
} from '@repo/business/pokemon/interface';

import { Ability } from './ability.entity';
import { Move } from './move.entity';
import { Type } from './type.entity';

@Entity({ name: 'pokemons' })
export class Pokemon implements PokemonEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  hp?: number;

  @Column({ nullable: false, length: 50 })
  url: string;

  @Column({ nullable: false, length: 200 })
  name: string;

  @Column({ nullable: true, length: 200 })
  image?: string;

  @Column({ nullable: true })
  speed?: number;

  @ManyToMany(() => Move, { nullable: true })
  @JoinTable()
  moves?: Array<MoveEntity>;

  @Column({ nullable: false })
  order: number;

  @ManyToMany(() => Type, { nullable: true })
  @JoinTable()
  types?: Array<TypeEntity>;

  @Column({ nullable: false, default: EStatus.INCOMPLETE })
  status: EStatus;

  @Column({ nullable: true })
  attack?: number;

  @Column({ nullable: true })
  defense?: number;

  @Column({ nullable: true, length: 50 })
  habitat?: string;

  @Column({ nullable: true })
  is_baby?: boolean;

  @Column({ nullable: true, length: 200 })
  shape_url?: string;

  @ManyToMany(() => Ability, { nullable: true })
  @JoinTable()
  abilities?: Array<AbilityEntity>;

  @ManyToMany(() => Pokemon, { nullable: true })
  @JoinTable()
  evolutions?: Array<PokemonEntity>;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deleted_at: Date;

  @Column({ nullable: true, length: 200 })
  shape_name?: string;

  @Column({ nullable: true })
  is_mythical?: boolean;

  @Column({ nullable: true })
  gender_rate?: number;

  @Column({ nullable: true })
  is_legendary?: boolean;

  @Column({ nullable: true })
  capture_rate?: number;

  @Column({ nullable: true })
  hatch_counter?: number;

  @Column({ nullable: true })
  base_happiness?: number;

  @Column({ nullable: true })
  special_attack?: number;

  @Column({ nullable: true })
  special_defense?: number;

  @Column({ nullable: true, length: 200 })
  evolution_chain_url?: string;

  @Column({ nullable: true, length: 200 })
  evolves_from_species?: string;

  @Column({ nullable: true })
  has_gender_differences?: boolean;

  constructor(pokemon?: Pokemon) {
    if (pokemon) {
      this.id = pokemon.id ?? this.id;
      this.hp = pokemon.hp ?? this.hp;
      this.url = pokemon.url ?? this.url;
      this.name = pokemon.name ?? this.name;
      this.image = pokemon.image ?? this.image;
      this.speed = pokemon.speed ?? this.speed;
      this.order = pokemon.order ?? this.order;
      this.status = pokemon.status ?? this.status;
      this.attack = pokemon.attack ?? this.attack;
      this.defense = pokemon.defense ?? this.defense;
      this.habitat = pokemon.habitat ?? this.habitat;
      this.is_baby = pokemon.is_baby ?? this.is_baby;
      this.shape_url = pokemon.shape_url ?? this.shape_url;
      this.created_at = pokemon.created_at ?? this.created_at;
      this.updated_at = pokemon.updated_at ?? this.updated_at;
      this.deleted_at = pokemon.deleted_at ?? this.deleted_at;
      this.shape_name = pokemon.shape_name ?? this.shape_name;
      this.is_mythical = pokemon.is_mythical ?? this.is_mythical;
      this.gender_rate = pokemon.gender_rate ?? this.gender_rate;
      this.is_legendary = pokemon.is_legendary ?? this.is_legendary;
      this.capture_rate = pokemon.capture_rate ?? this.capture_rate;
      this.hatch_counter = pokemon.hatch_counter ?? this.hatch_counter;
      this.base_happiness = pokemon.base_happiness ?? this.base_happiness;
      this.special_attack = pokemon.special_attack ?? this.special_attack;
      this.special_defense = pokemon.special_defense ?? this.special_defense;
      this.evolution_chain_url =
        pokemon.evolution_chain_url ?? this.evolution_chain_url;
      this.evolves_from_species =
        pokemon.evolves_from_species ?? this.evolves_from_species;
      this.has_gender_differences =
        pokemon.has_gender_differences ?? this.has_gender_differences;
    }
  }
}
