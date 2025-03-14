import PokemonAbility from '../pokemonAbility';

import OVERGROW_FIXTURE from './overgrow.json';
import CHLOROPHYLL_FIXTURE from './chlorophyll.json';

export const OVERGROW_ABILITY_FIXTURE: PokemonAbility =
  OVERGROW_FIXTURE as unknown as PokemonAbility;

export const CHLOROPHYLL_ABILITY_FIXTURE: PokemonAbility =
  CHLOROPHYLL_FIXTURE as unknown as PokemonAbility;

export const LIST_ABILITIES_FIXTURE: Array<PokemonAbility> = [
  OVERGROW_ABILITY_FIXTURE,
  CHLOROPHYLL_ABILITY_FIXTURE,
];