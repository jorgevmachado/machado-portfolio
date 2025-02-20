import { Router } from 'express';

import { findAll, findOne } from '../shared';

import { POKEMON_MOCK_ENTITY } from './fixtures';

const pokemonRouter: Router = Router();

pokemonRouter.get(`/pokemon`, (req, res) =>
  findAll(req, res, POKEMON_MOCK_ENTITY),
);

pokemonRouter.get(`/pokemon/:param`, (req, res) =>
  findOne(req, res, POKEMON_MOCK_ENTITY),
);

export default pokemonRouter;