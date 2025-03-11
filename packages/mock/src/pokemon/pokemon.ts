import { Router } from 'express';

import { findAll, findOne } from '../shared';

import { POKEMON_MOCK_ENTITY } from './fixtures';

import pokemonTypeRouter from './pokemon-type';
import pokemonMoveRouter from './pokemon-move';
import pokemonAbilityRouter from './pokemon-ability';

const pokemonRouter: Router = Router();

pokemonRouter.use(`/pokemon`, pokemonTypeRouter);
pokemonRouter.use(`/pokemon`, pokemonMoveRouter);
pokemonRouter.use(`/pokemon`, pokemonAbilityRouter);

pokemonRouter.get(`/pokemon`, (req, res) =>
  findAll(req, res, POKEMON_MOCK_ENTITY),
);

pokemonRouter.get(`/pokemon/:param`, (req, res) =>
  findOne(req, res, POKEMON_MOCK_ENTITY),
);

export default pokemonRouter;