import { EStatus } from '@repo/business/shared/enum';
import Pokemon from '@repo/business/pokemon/pokemon';

import { MockEntity } from '../../../shared/interface';

import { LIST_MOVE_FIXTURE } from '../../pokemon-move';
import { LIST_ABILITIES_FIXTURE } from '../../pokemon-ability';
import { LIST_TYPES_FIXTURE } from '../../pokemon-type';

import {
  IVYSAUR_ENTITY_INCOMPLETE_POKEMON_FIXTURE,
  VENUSAUR_ENTITY_INCOMPLETE_POKEMON_FIXTURE,
} from '../incompletes';

import BULBASAUR_COMPLETE_FIXTURE from './bulbasaur-complete.json';
import IVYSAUR_COMPLETE_FIXTURE from './ivysaur-complete.json';
import VENUSAUR_COMPLETE_FIXTURE from './venusaur-complete.json';

const BULBASAUR_COMPLETE_POKEMON_FIXTURE: Pokemon = new Pokemon({
  ...BULBASAUR_COMPLETE_FIXTURE,
  status: EStatus[BULBASAUR_COMPLETE_FIXTURE.status as keyof typeof EStatus],
  types: LIST_TYPES_FIXTURE,
  moves: LIST_MOVE_FIXTURE,
  abilities: LIST_ABILITIES_FIXTURE,
  created_at: new Date(BULBASAUR_COMPLETE_FIXTURE.created_at),
  updated_at: new Date(BULBASAUR_COMPLETE_FIXTURE.updated_at),
});

export const BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE: Pokemon = new Pokemon({
  ...BULBASAUR_COMPLETE_POKEMON_FIXTURE,
  evolutions: [
    BULBASAUR_COMPLETE_POKEMON_FIXTURE,
    IVYSAUR_ENTITY_INCOMPLETE_POKEMON_FIXTURE,
    VENUSAUR_ENTITY_INCOMPLETE_POKEMON_FIXTURE,
  ],
});

export const IVYSAUR_ENTITY_COMPLETE_POKEMON_FIXTURE: Pokemon = new Pokemon({
  ...IVYSAUR_COMPLETE_FIXTURE,
  status: EStatus[IVYSAUR_COMPLETE_FIXTURE.status as keyof typeof EStatus],
  types: LIST_TYPES_FIXTURE,
  moves: LIST_MOVE_FIXTURE.filter((move) => move.name !== 'razor-wind'),
  abilities: LIST_ABILITIES_FIXTURE,
  created_at: new Date(IVYSAUR_COMPLETE_FIXTURE.created_at),
  updated_at: new Date(IVYSAUR_COMPLETE_FIXTURE.updated_at),
  evolutions: [
    BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE,
    IVYSAUR_ENTITY_INCOMPLETE_POKEMON_FIXTURE,
    VENUSAUR_ENTITY_INCOMPLETE_POKEMON_FIXTURE,
  ],
});

export const VENUSAUR_ENTITY_COMPLETE_POKEMON_FIXTURE: Pokemon = new Pokemon({
  ...VENUSAUR_COMPLETE_FIXTURE,
  status: EStatus[VENUSAUR_COMPLETE_FIXTURE.status as keyof typeof EStatus],
  types: LIST_TYPES_FIXTURE,
  moves: LIST_MOVE_FIXTURE.filter((move) => move.name !== 'razor-wind'),
  abilities: LIST_ABILITIES_FIXTURE,
  created_at: new Date(VENUSAUR_COMPLETE_FIXTURE.created_at),
  updated_at: new Date(VENUSAUR_COMPLETE_FIXTURE.updated_at),
  evolutions: [
    BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE,
    IVYSAUR_ENTITY_INCOMPLETE_POKEMON_FIXTURE,
    VENUSAUR_ENTITY_INCOMPLETE_POKEMON_FIXTURE,
  ],
});

export const LIST_ENTITY_COMPLETE_POKEMON_FIXTURE: Array<Pokemon> = [
  BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE,
  IVYSAUR_ENTITY_COMPLETE_POKEMON_FIXTURE,
  VENUSAUR_ENTITY_COMPLETE_POKEMON_FIXTURE,
];

export const POKEMON_MOCK_ENTITY: MockEntity = {
  id: 'POKEMON',
  alias: 'pokemon',
  label: 'Pokemon',
  list: LIST_ENTITY_COMPLETE_POKEMON_FIXTURE
};