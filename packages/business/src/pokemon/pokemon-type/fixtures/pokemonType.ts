import PokemonType from '../pokemonType';

import GRASS_FIXTURE from './grass.json';
import POISON_FIXTURE from './poison.json';

export const GRASS_TYPE_FIXTURE: PokemonType =
  GRASS_FIXTURE as unknown as PokemonType;

export const POISON_TYPE_FIXTURE: PokemonType =
  POISON_FIXTURE as unknown as PokemonType;

export const LIST_TYPES_FIXTURE: Array<PokemonType> = [
  GRASS_TYPE_FIXTURE,
  POISON_TYPE_FIXTURE,
];
