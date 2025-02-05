import type {
  PokemonExternalBasicResponse,
  PokemonExternalPaginate,
} from './interface';

export const POKEMON_EXTERNAL_BASIC_RESPONSE_BULBASAUR_FIXTURE: PokemonExternalBasicResponse =
  {
    url: 'https://pokeapi.co/api/v2/pokemon/1/',
    name: 'bulbasaur',
  };

export const POKEMON_EXTERNAL_BASIC_RESPONSE_IVYSAUR_FIXTURE: PokemonExternalBasicResponse =
  {
    url: 'https://pokeapi.co/api/v2/pokemon/2/',
    name: 'ivysaur',
  };

export const POKEMON_EXTERNAL_BASIC_RESPONSE_VENUSAUR_FIXTURE: PokemonExternalBasicResponse =
  {
    url: 'https://pokeapi.co/api/v2/pokemon/3/',
    name: 'venusaur',
  };

export const POKEMON_EXTERNAL_BASIC_RESPONSE_LIST_FIXTURE: Array<PokemonExternalBasicResponse> =
  [
    POKEMON_EXTERNAL_BASIC_RESPONSE_BULBASAUR_FIXTURE,
    POKEMON_EXTERNAL_BASIC_RESPONSE_IVYSAUR_FIXTURE,
    POKEMON_EXTERNAL_BASIC_RESPONSE_VENUSAUR_FIXTURE,
  ];

export const POKEMON_EXTERNAL_BASIC_RESPONSE_PAGINATE_FIXTURE: PokemonExternalPaginate =
  {
    count: 1302,
    next: null,
    previous: null,
    results: POKEMON_EXTERNAL_BASIC_RESPONSE_LIST_FIXTURE,
  };
