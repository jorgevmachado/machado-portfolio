import { Router } from 'express';

import { LIST_MOVE_FIXTURE } from '@repo/business/pokemon/pokemon-move/fixtures/pokemonMove';

import { findAll, findOne } from '../../shared';
import type { MockEntity } from '../../shared/interface';

export const POKEMON_MOVE_MOCK_ENTITY: MockEntity = {
  id: 'POKEMON_MOVE',
  alias: 'pokemon_moves',
  label: 'Pokemon Moves',
  list: LIST_MOVE_FIXTURE,
};

const pokemonMoveRouter: Router = Router();

pokemonMoveRouter.get('/list/move', (req, res) =>
  findAll(req, res, POKEMON_MOVE_MOCK_ENTITY),
);

pokemonMoveRouter.get('/:param/move', (req, res) =>
  findOne(req, res, POKEMON_MOVE_MOCK_ENTITY),
);

export default pokemonMoveRouter;