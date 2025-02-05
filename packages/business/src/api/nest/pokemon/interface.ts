import { EStatus } from '../../../shared';

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

interface IBase {
  id: string;
  url: string;
  name: string;
  order: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}

export interface IAbility extends IBase {
    slot: number;
    is_hidden: boolean;
}

export interface IMove extends IBase {
  pp: number;
  type: string;
  power?: number;
  target: string;
  effect: string;
  priority: number;
  accuracy?: number;
  short_effect: string;
  damage_class: string;
  effect_chance?: number;
}

export interface IType extends IBase {
  text_color: string;
  background_color: string;
}