import { Router } from 'express';

import { findAll, findOne } from '../../shared';

import { POKEMON_ABILITY_MOCK_ENTITY } from './fixtures';

const pokemonAbilityRouter: Router = Router();

pokemonAbilityRouter.get('/pokemon/list/ability', (req, res) =>
  findAll(req, res, POKEMON_ABILITY_MOCK_ENTITY),
);

pokemonAbilityRouter.get('/pokemon/:param/ability', (req, res) =>
  findOne(req, res, POKEMON_ABILITY_MOCK_ENTITY),
);

export default pokemonAbilityRouter;