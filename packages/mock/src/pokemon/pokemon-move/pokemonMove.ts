import { Router } from 'express';

import { findAll, findOne } from '../../shared';

import { LIST_MOVE_FIXTURE } from './fixtures';

const pokemonMoveRouter: Router = Router();

pokemonMoveRouter.get('/pokemon/list/move', (req, res) =>
  findAll(req, res, LIST_MOVE_FIXTURE),
);

pokemonMoveRouter.get('/pokemon/:param/move', (req, res) =>
  findOne(req, res, LIST_MOVE_FIXTURE, 'pokemon_moves'),
);

export default pokemonMoveRouter;