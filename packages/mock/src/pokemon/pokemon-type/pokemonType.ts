import { Router } from 'express';

import { LIST_TYPES_FIXTURE } from '@repo/business/pokemon/pokemon-type/fixtures/pokemonType';

import { findAll, findOne } from '../../shared';

import type { MockEntity } from '../../shared/interface';

const pokemonTypeRouter: Router = Router();

export const POKEMON_TYPE_MOCK_ENTITY: MockEntity = {
  id: 'POKEMON_TYPE',
  alias: 'pokemon_types',
  label: 'Pokemon Types',
  list: LIST_TYPES_FIXTURE,
};

pokemonTypeRouter.get('/list/type', (req, res) =>
  findAll(req, res, POKEMON_TYPE_MOCK_ENTITY),
);

pokemonTypeRouter.get('/:param/type', (req, res) =>
  findOne(req, res, POKEMON_TYPE_MOCK_ENTITY),
);

export default pokemonTypeRouter;