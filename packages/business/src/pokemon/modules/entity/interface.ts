import { EStatus } from '../../../shared';

import type { AbilityEntity } from '../ability';
import type { MoveEntity } from '../move';
import type { TypeEntity } from '../type';

export interface BaseEntity {
  id: string;
  url: string;
  name: string;
  order: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export interface PokemonEntity extends BaseEntity {
  hp?: number;
  image?: string;
  speed?: number;
  moves?: Array<MoveEntity>;
  types?: Array<TypeEntity>;
  status: EStatus;
  attack?: number;
  defense?: number;
  habitat?: string;
  is_baby?: boolean;
  shape_url?: string;
  abilities?: Array<AbilityEntity>;
  evolutions?: Array<PokemonEntity>;
  created_at: Date;
  deleted_at: Date;
  updated_at: Date;
  shape_name?: string;
  is_mythical?: boolean;
  gender_rate?: number;
  is_legendary?: boolean;
  capture_rate?: number;
  hatch_counter?: number;
  base_happiness?: number;
  special_attack?: number;
  special_defense?: number;
  evolution_chain_url?: string;
  evolves_from_species?: string;
  has_gender_differences?: boolean;
}
