import type {
  PokemonTypeInformationExternalResponse,
  PokemonTypesInformationExternalResponse,
} from './interface';

export const POKEMON_TYPE_INFORMATION_EXTERNAL_RESPONSE_GRASS_FIXTURE: PokemonTypeInformationExternalResponse =
  {
    slot: 1,
    type: {
      url: 'https://pokeapi.co/api/v2/type/12/',
      name: 'grass',
    },
  };

export const POKEMON_TYPE_INFORMATION_EXTERNAL_RESPONSE_POISON_FIXTURE: PokemonTypeInformationExternalResponse =
  {
    slot: 2,
    type: {
      name: 'poison',
      url: 'https://pokeapi.co/api/v2/type/4/',
    },
  };

export const POKEMON_TYPE_INFORMATION_EXTERNAL_RESPONSE_LIST_FIXTURE: PokemonTypesInformationExternalResponse =
  [
    POKEMON_TYPE_INFORMATION_EXTERNAL_RESPONSE_GRASS_FIXTURE,
    POKEMON_TYPE_INFORMATION_EXTERNAL_RESPONSE_POISON_FIXTURE,
  ];
