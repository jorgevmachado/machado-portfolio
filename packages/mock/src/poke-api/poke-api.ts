import { Router } from 'express';
import { POKEMON_LIST_BASIC_JSON } from '@repo/business/pokemon/fixtures/poke-api/index';
import { POKEMON_EXTERNAL_BY_ID_NAME_LIST_FIXTURE } from '@repo/business/pokemon/fixtures/poke-api/byId/byId';
import { MOVES_BY_ORDER_LIST_FIXTURE } from '@repo/business/pokemon/fixtures/poke-api/moveByOrder/moveByOrder';
import { SPECIE_BY_POKEMON_NAME_OR_ID_LIST_FIXTURE } from '@repo/business/pokemon/fixtures/poke-api/specieByPokemonNameOrId/specieByPokemonNameOrId';
import { EVOLUTION_BY_ORDER_FIXTURE } from '@repo/business/pokemon/fixtures/poke-api//evolutionByOrder/evolutionByOrder';

const pokeApiRouter: Router = Router();

const baseUrl = '/external/api/v2';

pokeApiRouter.get(`${baseUrl}/pokemon`, (req, res) => {
  res.json(POKEMON_LIST_BASIC_JSON);
});

pokeApiRouter.get(`${baseUrl}/pokemon/:param`, (req, res) => {
  const { param } = req.params;
  const paramNumber = Number(param);
  const filter = {
    key: isNaN(paramNumber) ? 'name' : 'id',
    value: isNaN(paramNumber) ? param : paramNumber,
  };

  const pokemon = POKEMON_EXTERNAL_BY_ID_NAME_LIST_FIXTURE.find(
    (pokemon) => pokemon[filter.key] === filter.value,
  );
  if (!pokemon) {
    res.status(404).json('Not Found');
    return;
  }
  res.json(pokemon);
});

pokeApiRouter.get(`${baseUrl}/move/:order`, (req, res) => {
  const { order } = req.params;
  const orderNumber = Number(order);

  if (isNaN(orderNumber)) {
    res.status(404).json('Not Found');
    return;
  }

  const move = MOVES_BY_ORDER_LIST_FIXTURE.find(
    (move) => move.id === orderNumber,
  );
  if (!move) {
    res.status(404).json('Not Found');
    return;
  }
  res.json(move);
});

pokeApiRouter.get(`${baseUrl}/pokemon-species/:param`, (req, res) => {
  const { param } = req.params;
  const paramNumber = Number(param);
  const filter = {
    key: isNaN(paramNumber) ? 'name' : 'id',
    value: isNaN(paramNumber) ? param : paramNumber,
  };

  const pokemon = SPECIE_BY_POKEMON_NAME_OR_ID_LIST_FIXTURE.find(
    (pokemon) => pokemon[filter.key] === filter.value,
  );
  if (!pokemon) {
    res.status(404).json('Not Found');
    return;
  }
  res.json(pokemon);
});

pokeApiRouter.get(`${baseUrl}/evolution-chain/:order`, (req, res) => {
  const { order } = req.params;
  const orderNumber = Number(order);

  if (isNaN(orderNumber)) {
    res.status(404).json('Not Found');
    return;
  }

  const move = EVOLUTION_BY_ORDER_FIXTURE.find(
    (move) => move.id === orderNumber,
  );
  if (!move) {
    res.status(404).json('Not Found');
    return;
  }
  res.json(move);
});

export default pokeApiRouter;