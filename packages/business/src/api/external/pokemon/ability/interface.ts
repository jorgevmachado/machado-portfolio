import type { PokemonExternalBasicResponse } from '../basic';

export type PokemonAbilitiesInformationExternalResponse =
  Array<PokemonAbilityInformationExternalResponse>;

export interface PokemonAbilityInformationExternalResponse {
  slot: number;
  ability: PokemonExternalBasicResponse;
  is_hidden: boolean;
}
