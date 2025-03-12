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

import { PokemonAbility } from './pokemonAbility';

jest.mock('../../nestModuleAbstract');

describe('PokemonAbility', () => {
  const mockBaseUrl = 'http://mock-base-url.com';
  const mockHeaders = { Authorization: 'Bearer test-token' };
  const mockConfig = { baseUrl: mockBaseUrl, headers: mockHeaders };

  let pokemonAbility: PokemonAbility;

  beforeEach(() => {
    jest.clearAllMocks();
    pokemonAbility = new PokemonAbility(mockConfig);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('constructor', () => {
    it('should initialize with the correct path and config pokemonAbility', () => {
      expect(NestModuleAbstract).toHaveBeenCalledTimes(1);
      expect(NestModuleAbstract).toHaveBeenCalledWith({
        pathUrl: 'pokemon',
        subPathUrl: 'ability',
        nestModuleConfig: mockConfig,
      });
    });

    it('should call inherited methods from NestModuleAbstract about pokemonAbility', async () => {
      const mockGetAll = jest
        .spyOn(NestModuleAbstract.prototype, 'getAll')
        .mockResolvedValue([]);

      const queryParams: QueryParameters = { name: 'test' };
      const result = await pokemonAbility.getAll(queryParams);

      expect(mockGetAll).toHaveBeenCalledTimes(1);
      expect(mockGetAll).toHaveBeenCalledWith(queryParams);
      expect(result).toEqual([]);
    });
  });
});
