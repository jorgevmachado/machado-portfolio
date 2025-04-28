import { Router } from 'express';

import { LIST_ABILITIES_FIXTURE } from '@repo/business/pokemon/pokemon-ability/fixtures/pokemonAbility';

import { findAll, findOne } from '../../shared';
import type { MockEntity } from '../../shared/interface';

export const POKEMON_ABILITY_MOCK_ENTITY: MockEntity = {
  id: 'POKEMON_ABILITY',
  alias: 'pokemon_abilities',
  label: 'Pokemon Abilities',
  list: LIST_ABILITIES_FIXTURE,
};

const pokemonAbilityRouter: Router = Router();

pokemonAbilityRouter.get('/list/ability', (req, res) =>
  findAll(req, res, POKEMON_ABILITY_MOCK_ENTITY),
);

pokemonAbilityRouter.get('/:param/ability', (req, res) =>
  findOne(req, res, POKEMON_ABILITY_MOCK_ENTITY),
);

export default pokemonAbilityRouter;