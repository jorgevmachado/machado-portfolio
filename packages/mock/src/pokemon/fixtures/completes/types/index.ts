import Type from '@repo/business/pokemon/pokemon-type/pokemonType';

import GRASS_FIXTURE from './grass.json';
import POISON_FIXTURE from './poison.json';

export const GRASS_TYPE_FIXTURE = new Type({
  ...GRASS_FIXTURE,
  created_at: new Date(GRASS_FIXTURE.created_at),
  updated_at: new Date(GRASS_FIXTURE.updated_at),
});

export const POISON_TYPE_FIXTURE = new Type({
  ...POISON_FIXTURE,
  created_at: new Date(POISON_FIXTURE.created_at),
  updated_at: new Date(POISON_FIXTURE.updated_at),
});

export const LIST_TYPES_FIXTURE: Array<Type> = [
  GRASS_TYPE_FIXTURE,
  POISON_TYPE_FIXTURE,
];