import { Router } from 'express';
import LIST_BASIC from './jsons/list.json';
import { POKEMON_EXTERNAL_BY_ID_NAME_LIST_FIXTURE } from './jsons/byId';
import { MOVES_BY_ORDER_LIST_FIXTURE } from './jsons/moveByOrder';
import { SPECIE_BY_POKEMON_NAME_OR_ID_LIST_FIXTURE } from './jsons/specieByPokemonNameOrId';
import { EVOLUTION_BY_ORDER_FIXTURE } from './jsons/evolutionByOrder';

const pokeApiRouter: Router = Router();

const baseUrl = '/external/api/v2';

pokeApiRouter.get(`${baseUrl}/pokemon`, (req, res) => {
  res.json(LIST_BASIC);
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