import {
  IEvolutionByOrderResponse,
  type IPokemonByNameResponse,
  type ISpecieByPokemonNameResponse,
} from '../api';
import type { IAbility, IMove, IPokemon, IType } from '../api/nest/pokemon';

export interface PokemonConstructorParams
  extends Omit<
    IPokemon,
    'id' | 'order' | 'status' | 'created_at' | 'deleted_at' | 'updated_at'
  > {
  id?: string;
  order?: number;
  status?: IPokemon['status'];
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  pokemonByName?: IPokemonByNameResponse;
  specieByPokemonName?: ISpecieByPokemonNameResponse;
}

export interface EnsureImageParams {
  image: string;
  sprites: IPokemonByNameResponse['sprites'];
}

export interface EnsureAttributesParams {
  hp?: IPokemon['hp'];
  stats?: IPokemonByNameResponse['stats'];
  speed?: IPokemon['speed'];
  attack?: IPokemon['attack'];
  defense?: IPokemon['defense'];
  special_attack?: IPokemon['special_attack'];
  special_defense?: IPokemon['special_defense'];
}

export interface EnsureRelationsParams {
  moves?: Array<IMove>;
  types?: Array<IType>;
  abilities?: Array<IAbility>;
  pokemonByName?: IPokemonByNameResponse;
}

export interface EnsureSpecieParams {
  habitat?: IPokemon['habitat'];
  is_baby?: IPokemon['is_baby'];
  shape_url?: IPokemon['url'];
  shape_name?: IPokemon['shape_name'];
  is_mythical?: IPokemon['is_mythical'];
  gender_rate?: IPokemon['gender_rate'];
  is_legendary?: IPokemon['is_legendary'];
  capture_rate?: IPokemon['capture_rate'];
  hatch_counter?: IPokemon['hatch_counter'];
  base_happiness?: IPokemon['base_happiness'];
  evolution_chain_url?: IPokemon['evolution_chain_url'];
  specieByPokemonName?: ISpecieByPokemonNameResponse;
}

export type PokemonEntity = IPokemon;

export type PokemonByNameResponse = IPokemonByNameResponse;

export type EvolutionByOrderResponse = IEvolutionByOrderResponse;