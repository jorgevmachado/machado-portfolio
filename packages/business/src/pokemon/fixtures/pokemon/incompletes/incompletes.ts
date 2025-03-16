import BULBASAUR_INCOMPLETE_FIXTURE from '@repo/mock-json/pokemon/incompletes/bulbasaur-incomplete.json';
import IVYSAUR_INCOMPLETE_FIXTURE from '@repo/mock-json/pokemon/incompletes/ivysaur-incomplete.json';
import VENUSAUR_INCOMPLETE_FIXTURE from '@repo/mock-json/pokemon/incompletes/venusaur-incomplete.json';

import { EStatus } from '../../../../shared';
import Pokemon from '../../../pokemon';

export const BULBASAUR_ENTITY_INCOMPLETE_POKEMON_FIXTURE: Pokemon = new Pokemon(
  {
    ...BULBASAUR_INCOMPLETE_FIXTURE,
    created_at: new Date(BULBASAUR_INCOMPLETE_FIXTURE.created_at),
    updated_at: new Date(BULBASAUR_INCOMPLETE_FIXTURE.updated_at),
    status:
      EStatus[BULBASAUR_INCOMPLETE_FIXTURE.status as keyof typeof EStatus],
  },
);

export const IVYSAUR_ENTITY_INCOMPLETE_POKEMON_FIXTURE: Pokemon = new Pokemon({
  ...IVYSAUR_INCOMPLETE_FIXTURE,
  created_at: new Date(IVYSAUR_INCOMPLETE_FIXTURE.created_at),
  updated_at: new Date(IVYSAUR_INCOMPLETE_FIXTURE.updated_at),
  status: EStatus[IVYSAUR_INCOMPLETE_FIXTURE.status as keyof typeof EStatus],
});

export const VENUSAUR_ENTITY_INCOMPLETE_POKEMON_FIXTURE: Pokemon = new Pokemon({
  ...VENUSAUR_INCOMPLETE_FIXTURE,
  created_at: new Date(VENUSAUR_INCOMPLETE_FIXTURE.created_at),
  updated_at: new Date(VENUSAUR_INCOMPLETE_FIXTURE.updated_at),
  status: EStatus[VENUSAUR_INCOMPLETE_FIXTURE.status as keyof typeof EStatus],
});

export const LIST_ENTITY_INCOMPLETE_POKEMON_FIXTURE: Array<Pokemon> = [
  BULBASAUR_ENTITY_INCOMPLETE_POKEMON_FIXTURE,
  IVYSAUR_ENTITY_INCOMPLETE_POKEMON_FIXTURE,
  VENUSAUR_ENTITY_INCOMPLETE_POKEMON_FIXTURE,
];