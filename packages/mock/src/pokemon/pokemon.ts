import { Router } from 'express';

import { findAll, findOne } from '../shared';

import { LIST_ENTITY_COMPLETE_POKEMON_FIXTURE } from './fixtures';

const pokemonRouter: Router = Router();

pokemonRouter.get(`/pokemon`, (req, res) =>
  findAll(req, res, LIST_ENTITY_COMPLETE_POKEMON_FIXTURE),
);

pokemonRouter.get(`/pokemon/:param`, (req, res) =>
  findOne(req, res, LIST_ENTITY_COMPLETE_POKEMON_FIXTURE, 'pokemon'),
);

export default pokemonRouter;