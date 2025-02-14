import { EStatus } from '../../../shared';
import type { INestBaseEntity } from '../interface';
import type { IAbility } from './pokemon-ability';
import type { IMove } from './pokemon-move';
import type { IType } from './pokemon-type';

export interface IBase extends INestBaseEntity {
  url: string;
  name: string;
  order: number;
}

export interface IPokemon extends IBase {
  hp?: number;
  image?: string;
  speed?: number;
  moves?: Array<IMove>;
  types?: Array<IType>;
  status: EStatus;
  attack?: number;
  defense?: number;
  habitat?: string;
  is_baby?: boolean;
  shape_url?: string;
  abilities?: Array<IAbility>;
  evolutions?: Array<IPokemon>;
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

export * from './pokemon-ability/interface';
export * from './pokemon-move/interface';
export * from './pokemon-type/interface';