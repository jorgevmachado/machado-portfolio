import { Router } from 'express';

import { findAll, findOne } from '../../shared';

import { LIST_ABILITIES_FIXTURE } from './fixtures';

const pokemonAbilityRouter: Router = Router();

pokemonAbilityRouter.get('/pokemon/list/ability', (req, res) =>
  findAll(req, res, LIST_ABILITIES_FIXTURE),
);

pokemonAbilityRouter.get('/pokemon/:param/ability', (req, res) =>
  findOne(req, res, LIST_ABILITIES_FIXTURE, 'pokemon_abilities'),
);

export default pokemonAbilityRouter;