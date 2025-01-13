import { IResponsePokemonSpecie } from '../interface';

export const RESPONSE_GET_SPECIE_BY_NAME_BULBASAUR_FIXTURE: IResponsePokemonSpecie =
  {
    shape: {
      url: 'https://pokeapi.co/api/v2/pokemon-shape/8/',
      name: 'quadruped',
    },
    habitat: {
      url: 'https://pokeapi.co/api/v2/pokemon-habitat/3/',
      name: 'grassland',
    },
    is_baby: false,
    gender_rate: 1,
    is_mythical: false,
    capture_rate: 45,
    is_legendary: false,
    hatch_counter: 20,
    base_happiness: 50,
    evolution_chain: {
      url: 'https://pokeapi.co/api/v2/evolution-chain/1/',
    },
    evolves_from_species: undefined,
    has_gender_differences: false,
  };
