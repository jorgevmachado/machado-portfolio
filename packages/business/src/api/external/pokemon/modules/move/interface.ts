import type { PokemonExternalBasicResponse } from '../basic';

export type PokemonMovesInformationExternalResponse =
  Array<PokemonMoveInformationExternalResponse>;

export interface PokemonMoveInformationExternalResponse {
  move: PokemonExternalBasicResponse;
}

export interface ExternalResponseOfMoveByUrl {
  pp: number;
  type: PokemonExternalBasicResponse;
  name: string;
  power: number;
  target: PokemonExternalBasicResponse;
  priority: number;
  accuracy: number;
  effect_entries: Array<{
    effect: string;
    short_effect: string;
  }>;
  damage_class: PokemonExternalBasicResponse;
  effect_chance?: number;
  learned_by_pokemon: Array<PokemonExternalBasicResponse>;
}
