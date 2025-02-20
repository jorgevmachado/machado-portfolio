import Type from '@repo/business/pokemon/pokemon-type/pokemonType';

import type { MockEntity } from '../../../shared/interface';

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

export const POKEMON_TYPE_MOCK_ENTITY: MockEntity = {
  id: 'POKEMON_TYPE',
  alias: 'pokemon_types',
  label: 'Pokemon Types',
  list: LIST_TYPES_FIXTURE,
};