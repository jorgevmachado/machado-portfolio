import { Router } from 'express';

import { findAll, findOne } from '../../shared';

import { POKEMON_TYPE_MOCK_ENTITY } from './fixtures';

const pokemonTypeRouter: Router = Router();

pokemonTypeRouter.get('/list/type', (req, res) =>
  findAll(req, res, POKEMON_TYPE_MOCK_ENTITY),
);

pokemonTypeRouter.get('/:param/type', (req, res) =>
  findOne(req, res, POKEMON_TYPE_MOCK_ENTITY),
);

export default pokemonTypeRouter;