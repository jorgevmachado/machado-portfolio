import type {
  PokemonAbilitiesInformationExternalResponse,
  PokemonAbilityInformationExternalResponse,
} from '../interface';

export const POKEMON_ABILITY_INFORMATION_EXTERNAL_RESPONSE_OVERGROW_FIXTURE: PokemonAbilityInformationExternalResponse =
  {
    slot: 1,
    ability: {
      name: 'overgrow',
      url: 'https://pokeapi.co/api/v2/ability/65/',
    },
    is_hidden: false,
  };

export const POKEMON_ABILITY_INFORMATION_EXTERNAL_RESPONSE_CHLOROPHYLL_FIXTURE: PokemonAbilityInformationExternalResponse =
  {
    slot: 3,
    ability: {
      name: 'chlorophyll',
      url: 'https://pokeapi.co/api/v2/ability/34/',
    },
    is_hidden: true,
  };

export const POKEMON_ABILITY_INFORMATION_EXTERNAL_RESPONSE_LIST_FIXTURE: PokemonAbilitiesInformationExternalResponse =
  [
    POKEMON_ABILITY_INFORMATION_EXTERNAL_RESPONSE_OVERGROW_FIXTURE,
    POKEMON_ABILITY_INFORMATION_EXTERNAL_RESPONSE_CHLOROPHYLL_FIXTURE,
  ];
