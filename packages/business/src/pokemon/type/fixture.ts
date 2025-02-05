import {
  POKEMON_TYPE_INFORMATION_EXTERNAL_RESPONSE_GRASS_FIXTURE,
  POKEMON_TYPE_INFORMATION_EXTERNAL_RESPONSE_POISON_FIXTURE,
} from '../../api';

import type { TypeEntity } from '../interface';

export const TYPE_ENTITY_GRASS_FIXTURE: TypeEntity = {
  id: '6d343a19-39e5-42a2-9e45-55a181984635',
  url: POKEMON_TYPE_INFORMATION_EXTERNAL_RESPONSE_GRASS_FIXTURE.type.url,
  name: POKEMON_TYPE_INFORMATION_EXTERNAL_RESPONSE_GRASS_FIXTURE.type.name,
  order: 12,
  created_at: new Date('2024-12-17T03:01:22.559Z'),
  updated_at: new Date('2024-12-17T03:01:22.559Z'),
  deleted_at: null,
  text_color: '#8b4513',
  background_color: '#b9cc50',
};

export const TYPE_ENTITY_POISON_FIXTURE: TypeEntity = {
  id: '50ce0f65-1c10-4ca4-8904-d2079ddb2001',
  url: POKEMON_TYPE_INFORMATION_EXTERNAL_RESPONSE_POISON_FIXTURE.type.url,
  name: POKEMON_TYPE_INFORMATION_EXTERNAL_RESPONSE_POISON_FIXTURE.type.name,
  order: 4,
  created_at: new Date('2024-12-17T03:01:22.577Z'),
  updated_at: new Date('2024-12-17T03:01:22.577Z'),
  deleted_at: null,
  text_color: '#f5f5f5',
  background_color: '#8b008b',
};

export const TYPE_ENTITY_LIST_FIXTURE: Array<TypeEntity> = [
  TYPE_ENTITY_GRASS_FIXTURE,
  TYPE_ENTITY_POISON_FIXTURE,
];
