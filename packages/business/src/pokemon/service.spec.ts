import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { Nest } from '../api';
import { Paginate } from '../paginate';
import { EStatus, QueryParameters } from '../shared';

import { PokemonEntity } from './interface';

import { PokemonService } from './service';

describe('PokemonService', () => {
  let pokemonService: PokemonService;
  let nestMock: jest.Mocked<Nest>;

  const mockPokemonBulbasaur: PokemonEntity = {
    id: 'ac0138cd-4910-4000-8000-000000000000',
    hp: 45,
    url: 'http://localhost:9000/external/api/v2/pokemon/1/',
    name: 'bulbasaur',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png',
    speed: 45,
    moves: [],
    types: [],
    order: 1,
    status: EStatus.INCOMPLETE,
    attack: 49,
    defense: 49,
    habitat: 'grassland',
    is_baby: false,
    shape_url: 'http://localhost:9000/external/api/v2/pokemon-shape/8/',
    abilities: [],
    evolutions: [],
    created_at: new Date('2025-02-06T18:26:04.618Z'),
    updated_at: new Date('2025-02-06T18:26:04.618Z'),
    deleted_at: undefined,
    shape_name: 'quadruped',
    is_mythical: false,
    gender_rate: 1,
    is_legendary: false,
    capture_rate: 45,
    hatch_counter: 20,
    base_happiness: 50,
    special_attack: 65,
    special_defense: 65,
    evolution_chain_url:
      'http://localhost:9000/external/api/v2/evolution-chain/1/',
    evolves_from_species: undefined,
    has_gender_differences: false,
  };
  const mockPokemonIvysaur: PokemonEntity = {
    id: 'ac0138cd-4910-4000-8000-000000000000',
    hp: 60,
    url: 'http://localhost:9000/external/api/v2/pokemon/2/',
    name: 'ivysaur',
    image:
      'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/2.png',
    speed: 60,
    moves: [],
    types: [],
    order: 2,
    status: EStatus.INCOMPLETE,
    attack: 62,
    defense: 63,
    habitat: 'grassland',
    is_baby: false,
    shape_url: 'http://localhost:9000/external/api/v2/pokemon-shape/8/',
    abilities: [],
    evolutions: [],
    created_at: new Date('2025-02-06T18:26:04.618Z'),
    updated_at: new Date('2025-02-06T18:26:04.618Z'),
    deleted_at: undefined,
    shape_name: 'quadruped',
    is_mythical: false,
    gender_rate: 1,
    is_legendary: false,
    capture_rate: 45,
    hatch_counter: 20,
    base_happiness: 50,
    special_attack: 80,
    special_defense: 80,
    evolution_chain_url:
      'http://localhost:9000/external/api/v2/evolution-chain/1/',
    evolves_from_species: undefined,
    has_gender_differences: undefined,
  };
  const mockPokemonResponse: Array<PokemonEntity> = [
    mockPokemonBulbasaur,
    mockPokemonIvysaur,
  ];
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    nestMock = {
      pokemon: {
        getAll: jest.fn(),
        getOne: jest.fn(),
      },
    } as unknown as jest.Mocked<Nest>;

    pokemonService = new PokemonService(nestMock);
  });

  afterEach(() => {
    jest.resetModules();
  });

  describe('getAll', () => {
    it('should return a list of Pokémon', async () => {
      const mockParameters: QueryParameters = { limit: 10, page: 0 };

      nestMock.pokemon.getAll.mockResolvedValue(mockPokemonResponse);

      const result = await pokemonService.getAll(mockParameters);

      expect(result).toEqual(mockPokemonResponse);

      expect(nestMock.pokemon.getAll).toHaveBeenCalledWith(mockParameters);
    });

    it('should return a page of paginated Pokémon', async () => {
      const mockParameters: QueryParameters = { limit: 5, page: 0 };
      const mockResponse: Paginate<PokemonEntity> = {
        skip: 0,
        next: 0,
        prev: 0,
        total: 0,
        pages: 0,
        results: mockPokemonResponse,
        per_page: 0,
        current_page: 0,
      };

      nestMock.pokemon.getAll.mockResolvedValue(mockResponse);

      const result = await pokemonService.getAll(mockParameters);

      expect(result).toEqual(mockResponse);
      expect(nestMock.pokemon.getAll).toHaveBeenCalledWith(mockParameters);
    });
  });

  describe('get', () => {
    it('should return a specific Pokémon by the parameter', async () => {
      const mockParam = '1';

      nestMock.pokemon.getOne.mockResolvedValue(mockPokemonBulbasaur);

      const result = await pokemonService.get(mockParam);

      expect(result).toEqual(mockPokemonBulbasaur);
      expect(nestMock.pokemon.getOne).toHaveBeenCalledWith(mockParam);
    });

    it('should throw an error if the Pokémon is not found', async () => {
      const mockParam = '999';

      nestMock.pokemon.getOne.mockRejectedValue(new Error('Pokémon not found'));

      await expect(pokemonService.get(mockParam)).rejects.toThrow(
        'Pokémon not found',
      );
      expect(nestMock.pokemon.getOne).toHaveBeenCalledWith(mockParam);
    });
  });
});