import { Router } from 'express';

import { LIST_ENTITY_COMPLETE_POKEMON_FIXTURE } from '@repo/business/pokemon/fixtures/pokemon/completes/completes';

import { findAll, findOne } from '../shared';

import pokemonTypeRouter from './pokemon-type';
import pokemonMoveRouter from './pokemon-move';
import pokemonAbilityRouter from './pokemon-ability';
import { MockEntity } from '../shared/interface';

export const POKEMON_MOCK_ENTITY: MockEntity = {
  id: 'POKEMON',
  alias: 'pokemon',
  label: 'Pokemon',
  list: LIST_ENTITY_COMPLETE_POKEMON_FIXTURE,
};

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