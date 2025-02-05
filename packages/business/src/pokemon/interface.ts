import type { IAbility, IPokemon, IMove, IType } from '../api/nest/pokemon';

export interface PokemonConfig {
  token?: string;
  baseUrl?: string;
}

export type PokemonEntity = IPokemon;

export type AbilityEntity = IAbility;

export type MoveEntity = IMove;

export type TypeEntity = IType;