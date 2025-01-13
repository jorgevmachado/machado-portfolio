import type { PokemonExternalBasicResponse } from '../basic';

export interface ExternalResponseOfEvolutionByUrl {
  chain: {
    species: PokemonExternalBasicResponse;
    evolves_to: Array<EvolvesTo>;
  };
}

interface EvolvesTo {
  species: PokemonExternalBasicResponse;
  evolves_to: Array<EvolvesTo>;
}
