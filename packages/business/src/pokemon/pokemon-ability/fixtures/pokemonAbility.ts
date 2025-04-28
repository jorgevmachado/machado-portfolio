import OVERGROW_FIXTURE from '@repo/mock-json/pokemon/pokemon-ability/overgrow.json';
import CHLOROPHYLL_FIXTURE from '@repo/mock-json/pokemon/pokemon-ability/chlorophyll.json';

import PokemonAbility from '../pokemonAbility';

export const OVERGROW_ABILITY_FIXTURE: PokemonAbility =
  OVERGROW_FIXTURE as unknown as PokemonAbility;

export const CHLOROPHYLL_ABILITY_FIXTURE: PokemonAbility =
  CHLOROPHYLL_FIXTURE as unknown as PokemonAbility;

export const LIST_ABILITIES_FIXTURE: Array<PokemonAbility> = [
  OVERGROW_ABILITY_FIXTURE,
  CHLOROPHYLL_ABILITY_FIXTURE,
];