import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { QueryParameters } from '@repo/business/shared/interface';

import { NestModuleAbstract } from '../../nestModuleAbstract';

import { PokemonMove } from './pokemonMove';

jest.mock('../../nestModuleAbstract');

describe('PokemonMove', () => {
  const mockBaseUrl = 'http://mock-base-url.com';
  const mockHeaders = { Authorization: 'Bearer test-token' };
  const mockConfig = { baseUrl: mockBaseUrl, headers: mockHeaders };

  let pokemonMove: PokemonMove;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    pokemonMove = new PokemonMove(mockConfig);
  });

  afterEach(() => {
    jest.resetModules();
  });

  describe('constructor', () => {
    it('should initialize with the correct path and config pokemonMove', () => {
      expect(NestModuleAbstract).toHaveBeenCalledTimes(1);
      expect(NestModuleAbstract).toHaveBeenCalledWith({
        pathUrl: 'pokemon',
        subPathUrl: 'move',
        nestModuleConfig: mockConfig,
      });
    });

    it('should call inherited methods from NestModuleAbstract about pokemonMove', async () => {
      const mockGetAll = jest
        .spyOn(NestModuleAbstract.prototype, 'getAll')
        .mockResolvedValue([]);

      const queryParams: QueryParameters = { name: 'test' };
      const result = await pokemonMove.getAll(queryParams);

      expect(mockGetAll).toHaveBeenCalledTimes(1);
      expect(mockGetAll).toHaveBeenCalledWith(queryParams);
      expect(result).toEqual([]);
    });
  });
});