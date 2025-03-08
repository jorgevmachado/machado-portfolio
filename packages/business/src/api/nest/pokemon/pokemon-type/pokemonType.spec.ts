import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { QueryParameters } from '@repo/business/shared/interface';

import { NestModuleAbstract } from '../../nestModuleAbstract';

import { PokemonType } from './pokemonType';

jest.mock('../../nestModuleAbstract');

describe('PokemonType', () => {
    const mockBaseUrl = 'http://mock-base-url.com';
    const mockHeaders = { Authorization: 'Bearer test-token' };
    const mockConfig = { baseUrl: mockBaseUrl, headers: mockHeaders };

    let pokemonType: PokemonType;

    beforeEach(() => {
        jest.clearAllMocks();
        pokemonType = new PokemonType(mockConfig);
    });

    describe('constructor', () => {
        it('should initialize with the correct path and config pokemonType', () => {
            expect(NestModuleAbstract).toHaveBeenCalledTimes(1);
            expect(NestModuleAbstract).toHaveBeenCalledWith({
                pathUrl: 'pokemon',
                subPathUrl: 'type',
                nestModuleConfig: mockConfig,
            });
        });

        it('should call inherited methods from NestModuleAbstract about pokemonType', async () => {
            const mockGetAll = jest
                .spyOn(NestModuleAbstract.prototype, 'getAll')
                .mockResolvedValue([]);

            const queryParams: QueryParameters = { name: 'test' };
            const result = await pokemonType.getAll(queryParams);

            expect(mockGetAll).toHaveBeenCalledTimes(1);
            expect(mockGetAll).toHaveBeenCalledWith(queryParams);
            expect(result).toEqual([]);
        });
    });
});