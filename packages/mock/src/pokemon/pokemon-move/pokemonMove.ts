import { Router } from 'express';

import { findAll, findOne } from '../../shared';

import { POKEMON_MOVE_MOCK_ENTITY } from './fixtures';

const pokemonMoveRouter: Router = Router();

pokemonMoveRouter.get('/list/move', (req, res) =>
  findAll(req, res, POKEMON_MOVE_MOCK_ENTITY),
);

pokemonMoveRouter.get('/:param/move', (req, res) =>
  findOne(req, res, POKEMON_MOVE_MOCK_ENTITY),
);

export default pokemonMoveRouter;