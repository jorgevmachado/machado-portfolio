import type {
  PokemonStatInformationExternalResponse,
  PokemonStatsInformationExternalResponse,
} from './interface';

export const POKEMON_STAT_INFORMATION_EXTERNAL_RESPONSE_HP_FIXTURE: PokemonStatInformationExternalResponse =
  {
    stat: {
      name: 'hp',
      url: 'https://pokeapi.co/api/v2/stat/1/',
    },
    base_stat: 45,
  };
export const POKEMON_STAT_INFORMATION_EXTERNAL_RESPONSE_ATTACK_FIXTURE: PokemonStatInformationExternalResponse =
  {
    stat: {
      name: 'attack',
      url: 'https://pokeapi.co/api/v2/stat/2/',
    },
    base_stat: 49,
  };
export const POKEMON_STAT_INFORMATION_EXTERNAL_RESPONSE_DEFENSE_FIXTURE: PokemonStatInformationExternalResponse =
  {
    stat: {
      name: 'defense',
      url: 'https://pokeapi.co/api/v2/stat/3/',
    },
    base_stat: 49,
  };
export const POKEMON_STAT_INFORMATION_EXTERNAL_RESPONSE_SPECIAL_ATTACK_FIXTURE: PokemonStatInformationExternalResponse =
  {
    stat: {
      name: 'special-attack',
      url: 'https://pokeapi.co/api/v2/stat/4/',
    },
    base_stat: 65,
  };
export const POKEMON_STAT_INFORMATION_EXTERNAL_RESPONSE_SPECIAL_DEFENSE_FIXTURE: PokemonStatInformationExternalResponse =
  {
    stat: {
      name: 'special-defense',
      url: 'https://pokeapi.co/api/v2/stat/5/',
    },
    base_stat: 65,
  };
export const POKEMON_STAT_INFORMATION_EXTERNAL_RESPONSE_SPEED_FIXTURE: PokemonStatInformationExternalResponse =
  {
    stat: {
      name: 'speed',
      url: 'https://pokeapi.co/api/v2/stat/6/',
    },
    base_stat: 45,
  };

export const POKEMON_STAT_INFORMATION_EXTERNAL_RESPONSE_LIST_FIXTURE: PokemonStatsInformationExternalResponse =
  [
    POKEMON_STAT_INFORMATION_EXTERNAL_RESPONSE_HP_FIXTURE,
    POKEMON_STAT_INFORMATION_EXTERNAL_RESPONSE_ATTACK_FIXTURE,
    POKEMON_STAT_INFORMATION_EXTERNAL_RESPONSE_DEFENSE_FIXTURE,
    POKEMON_STAT_INFORMATION_EXTERNAL_RESPONSE_SPECIAL_ATTACK_FIXTURE,
    POKEMON_STAT_INFORMATION_EXTERNAL_RESPONSE_SPECIAL_DEFENSE_FIXTURE,
    POKEMON_STAT_INFORMATION_EXTERNAL_RESPONSE_SPEED_FIXTURE,
  ];
