import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { Http } from '@repo/services/http/http';

import { PokeApi } from './pokeApi';

jest.mock('@repo/services/http/http');

describe('PokeApi', () => {
  let pokeApi: PokeApi;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    pokeApi = new PokeApi();
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('should be defined', () => {
    expect(true).toBeTruthy();
  });

  it('should call get with correct URL and parameters for getAll', async () => {
    const mockedGet = jest.spyOn(Http.prototype, 'get').mockResolvedValue({
      results: [],
      count: 0,
    });

    const offset = 20;
    const limit = 10;

    await pokeApi.getAll(offset, limit);

    expect(mockedGet).toHaveBeenCalledTimes(1);
    expect(mockedGet).toHaveBeenCalledWith('pokemon', {
      params: { offset, limit },
    });
  });

  it('should call get with correct URL for getByName', async () => {
    const mockedGet = jest.spyOn(Http.prototype, 'get').mockResolvedValue({
      id: 1,
      name: 'bulbasaur',
    });

    const name = 'bulbasaur';

    await pokeApi.getByName(name);

    expect(mockedGet).toHaveBeenCalledTimes(1);
    expect(mockedGet).toHaveBeenCalledWith(`pokemon/${name}`);
  });

  it('should call get with correct URL for getSpecieByPokemonName', async () => {
    const mockedGet = jest.spyOn(Http.prototype, 'get').mockResolvedValue({
      color: { name: 'green' },
      id: 1,
    });

    const name = 'bulbasaur';

    await pokeApi.getSpecieByPokemonName(name);

    expect(mockedGet).toHaveBeenCalledTimes(1);
    expect(mockedGet).toHaveBeenCalledWith(`pokemon-species/${name}`);
  });

  it('should call get with correct URL for getEvolutionsByOrder', async () => {
    const mockedGet = jest.spyOn(Http.prototype, 'get').mockResolvedValue({
      chain: {},
      id: 1,
    });

    const order = 1;

    await pokeApi.getEvolutionsByOrder(order);

    expect(mockedGet).toHaveBeenCalledTimes(1);
    expect(mockedGet).toHaveBeenCalledWith(`evolution-chain/${order}`);
  });

  it('should call get with correct URL for getMoveByOrder', async () => {
    const mockedGet = jest.spyOn(Http.prototype, 'get').mockResolvedValue({
      id: 1,
      name: 'thunderbolt',
    });

    const order = 2;

    await pokeApi.getMoveByOrder(order);

    expect(mockedGet).toHaveBeenCalledTimes(1);
    expect(mockedGet).toHaveBeenCalledWith(`move/${order}`);
  });
});
