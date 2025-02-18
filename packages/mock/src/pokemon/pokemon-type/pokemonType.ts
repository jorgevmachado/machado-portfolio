import { Router } from 'express';

import { findAll, findOne } from '../../shared';

import { LIST_TYPES_FIXTURE } from './fixtures';

const pokemonTypeRouter: Router = Router();

pokemonTypeRouter.get('/pokemon/list/type', (req, res) =>
  findAll(req, res, LIST_TYPES_FIXTURE),
);

pokemonTypeRouter.get('/pokemon/:param/type', (req, res) =>
  findOne(req, res, LIST_TYPES_FIXTURE, 'pokemon_types'),
);

export default pokemonTypeRouter;