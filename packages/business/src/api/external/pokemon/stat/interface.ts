import type { PokemonExternalBasicResponse } from '../basic';

export type PokemonStatsInformationExternalResponse =
  Array<PokemonStatInformationExternalResponse>;

export interface PokemonStatInformationExternalResponse {
  stat: PokemonExternalBasicResponse;
  base_stat: number;
}
