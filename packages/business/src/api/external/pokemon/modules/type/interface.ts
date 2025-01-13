import type { PokemonExternalBasicResponse } from '../basic';

export type PokemonTypesInformationExternalResponse =
  Array<PokemonTypeInformationExternalResponse>;

export interface PokemonTypeInformationExternalResponse {
  slot: number;
  type: PokemonExternalBasicResponse;
}
