import type { PokemonExternalBasicResponse } from '../basic';

export interface ExternalResponseOfPokemonSpecieByPokemonName {
  shape: PokemonExternalBasicResponse;
  habitat: PokemonExternalBasicResponse;
  is_baby: boolean;
  gender_rate: number;
  is_mythical: boolean;
  capture_rate: number;
  is_legendary: boolean;
  hatch_counter: number;
  base_happiness: number;
  evolution_chain: Pick<PokemonExternalBasicResponse, 'url'>;
  evolves_from_species?: PokemonExternalBasicResponse;
  has_gender_differences: boolean;
}
