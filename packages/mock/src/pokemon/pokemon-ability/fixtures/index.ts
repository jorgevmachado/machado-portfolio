import Ability from '@repo/business/pokemon/pokemon-ability/pokemonAbility';

import type { MockEntity } from '../../../shared/interface';

import OVERGROW_FIXTURE from './overgrow.json';
import CHLOROPHYLL_FIXTURE from './chlorophyll.json';

export const OVERGROW_ABILITY_FIXTURE = new Ability({
  ...OVERGROW_FIXTURE,
  created_at: new Date(OVERGROW_FIXTURE.created_at),
  updated_at: new Date(OVERGROW_FIXTURE.updated_at),
});

export const CHLOROPHYLL_ABILITY_FIXTURE = new Ability({
  ...CHLOROPHYLL_FIXTURE,
  created_at: new Date(CHLOROPHYLL_FIXTURE.created_at),
  updated_at: new Date(CHLOROPHYLL_FIXTURE.updated_at),
});

export const LIST_ABILITIES_FIXTURE: Array<Ability> = [
  OVERGROW_ABILITY_FIXTURE,
  CHLOROPHYLL_ABILITY_FIXTURE,
];

export const POKEMON_ABILITY_MOCK_ENTITY: MockEntity = {
  id: 'POKEMON_ABILITY',
  alias: 'pokemon_abilities',
  label: 'Pokemon Abilities',
  list: LIST_ABILITIES_FIXTURE,
};