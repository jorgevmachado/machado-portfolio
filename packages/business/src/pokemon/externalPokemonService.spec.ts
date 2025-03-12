import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { ExternalPokemonService } from './externalPokemonService';
import { ISpecieByPokemonNameResponse, PokeApi } from '../api';
import { extractLastNumberFromUrl } from '@repo/services/number/number';
import Pokemon from './pokemon';
import PokemonMove from './pokemon-move';
import { EStatus } from '../shared';

jest.mock('../api');
jest.mock('@repo/services/number/number');

describe('ExternalPokemonService', () => {
  let service: ExternalPokemonService;
  let mockPokeApi: jest.Mocked<PokeApi>;

  const mockPokemonType = {
    id: 'f73f900d-1e0e-4a39-be7a-509746164ae9',
    url: 'https://pokeapi.co/api/v2/type/12/',
    name: 'grass',
    order: 12,
    created_at: new Date('2025-02-07T19:00:23.486Z'),
    updated_at: new Date('2025-02-07T19:00:23.486Z'),
    deleted_at: undefined,
    text_color: '#8b4513',
    background_color: '#b9cc50',
  };
  const mockPokemonMove = {
    id: 'bf22639d-0c2c-400a-bd2c-61fa3c398493',
    pp: 20,
    url: 'http://localhost:9000/external/api/v2/type/20/',
    type: 'normal',
    name: 'razor-wind',
    order: 20,
    power: 15,
    target: 'all-opponents',
    effect: 'Inflicts regular damage.',
    priority: 0,
    accuracy: 100,
    created_at: new Date('2025-02-07T19:00:23.303Z'),
    updated_at: new Date('2025-02-07T19:00:23.303Z'),
    deleted_at: undefined,
    short_effect: 'Requires a turn to charge before attacking.',
    damage_class: 'physical',
    effect_chance: undefined,
  };
  const mockPokemonAbility = {
    id: '01ade48b-573f-41fe-9d33-34a3cb4c0b9c',
    url: 'https://pokeapi.co/api/v2/ability/34/',
    name: 'chlorophyll',
    slot: 3,
    order: 34,
    is_hidden: true,
    created_at: new Date('2025-02-07T19:00:23.496Z'),
    updated_at: new Date('2025-02-07T19:00:23.496Z'),
    deleted_at: undefined,
  };
  const mockPokemon = {
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
    status: EStatus.COMPLETE,
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

  beforeEach(() => {
    mockPokeApi = new PokeApi() as jest.Mocked<PokeApi>;
    service = new ExternalPokemonService();
    (service as any).pokeApi = mockPokeApi;

    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('buildList', () => {
    it('should return a list of Pokemon using the API data', async () => {
      const mockResponse = {
        count: 1304,
        next: 'http://localhost:9000/external/api/v2/pokemon?offset=1302&limit=2',
        previous: undefined,
        results: [
          { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
          {
            name: mockPokemon.name,
            url: 'https://pokeapi.co/api/v2/pokemon/1/',
          },
        ],
      };

      mockPokeApi.getAll.mockResolvedValue(mockResponse);

      const list = await service.buildList({ offset: 0, limit: 2 });

      expect(mockPokeApi.getAll).toHaveBeenCalledWith(0, 2);
      expect(list).toHaveLength(2);
      expect(list[0]).toBeInstanceOf(Pokemon);
      expect(list[0]?.name).toBe('pikachu');
      expect(list[1]?.name).toBe(mockPokemon.name);
    });

    it('should return an empty list if the API returns no results', async () => {
      mockPokeApi.getAll.mockResolvedValue({
        count: 0,
        next: undefined,
        previous: undefined,
        results: [],
      });

      const list = await service.buildList({ offset: 0, limit: 2 });

      expect(mockPokeApi.getAll).toHaveBeenCalledWith(0, 2);
      expect(list).toEqual([]);
    });
  });

  describe('completeOne', () => {
    it('should complete a Pokémon data with information from the API', async () => {
      const mockPokemonByNameResponse = {
        order: 25,
        types: [
          {
            slot: 1,
            type: { name: mockPokemonType.name, url: mockPokemonType.url },
          },
        ],
        moves: [
          { move: { name: mockPokemonMove.name, url: mockPokemonMove.url } },
        ],
        stats: [
          {
            base_stat: 35,
            stat: { name: 'speed', url: 'https://pokeapi.co/api/v2/stat/6/' },
          },
        ],
        sprites: {
          front_default: 'https://example.com/front_default.png',
          other: {
            dream_world: {
              front_default: 'https://example.com/dream_world.png',
            },
          },
        },
        abilities: [
          {
            slot: mockPokemonAbility.slot,
            ability: {
              name: mockPokemonAbility.name,
              url: mockPokemonAbility.url,
            },
            is_hidden: mockPokemonAbility.is_hidden,
          },
        ],
      };
      const mockSpecieByPokemonNameResponse: ISpecieByPokemonNameResponse = {
        shape: { name: mockPokemon.shape_name, url: mockPokemon.shape_url },
        habitat: {
          name: mockPokemon.habitat,
          url: 'https://pokeapi.co/api/v2/pokemon-habitat/5/',
        },
        is_baby: mockPokemon.is_baby,
        gender_rate: mockPokemon.gender_rate,
        is_mythical: mockPokemon.is_mythical,
        capture_rate: mockPokemon.capture_rate,
        is_legendary: mockPokemon.is_legendary,
        hatch_counter: mockPokemon.hatch_counter,
        base_happiness: mockPokemon.base_happiness,
        evolution_chain: { url: mockPokemon.evolution_chain_url },
        evolves_from_species: mockPokemon.evolves_from_species,
        has_gender_differences: mockPokemon.has_gender_differences,
      };

      mockPokeApi.getByName.mockResolvedValue(mockPokemonByNameResponse);
      mockPokeApi.getSpecieByPokemonName.mockResolvedValue(
        mockSpecieByPokemonNameResponse,
      );

      const completePokemon = await service.completeOne(mockPokemon);

      expect(mockPokeApi.getByName).toHaveBeenCalledWith(mockPokemon.name);
      expect(mockPokeApi.getSpecieByPokemonName).toHaveBeenCalledWith(
        mockPokemon.name,
      );
      expect(completePokemon).toBeInstanceOf(Pokemon);
      expect(completePokemon.name).toBe(mockPokemon.name);
    });
  });

  describe('buildMove', () => {
    it('should return a PokemonMove object with additional data\n', async () => {
      const mockMoveData = {
        pp: mockPokemonMove.pp,
        type: {
          name: mockPokemonMove.type,
          url: mockPokemonMove.url,
        },
        name: mockPokemonMove.name,
        power: mockPokemonMove.power,
        target: {
          name: mockPokemonMove.target,
          url: 'http://localhost:9000/external/api/v2/move-target/11/',
        },
        priority: mockPokemonMove.priority,
        accuracy: mockPokemonMove.accuracy,
        damage_class: {
          name: mockPokemonMove.damage_class,
          url: 'http://localhost:9000/external/api/v2/move-damage-class/3/',
        },
        effect_chance: mockPokemonMove.effect_chance,
        effect_entries: [
          {
            effect: mockPokemonMove.effect,
            short_effect: mockPokemonMove.short_effect,
          },
        ],
        learned_by_pokemon: [
          {
            name: mockPokemon.name,
            url: 'http://localhost:9000/external/api/v2/pokemon/1/',
          },
        ],
      };

      mockPokeApi.getMoveByOrder.mockResolvedValue(mockMoveData);

      const move = await service.buildMove(mockPokemonMove);

      expect(mockPokeApi.getMoveByOrder).toHaveBeenCalledWith(20);
      expect(move).toBeInstanceOf(PokemonMove);
      expect(move.name).toBe(mockPokemonMove.name);
    });
  });

  describe('getEvolutions', () => {
    it('should return a list of evolution names based on the URL', async () => {
      const mockUrl = 'https://pokeapi.co/api/v2/evolution-chain/1/';
      const mockOrder = 1;
      const mockEvolutionData = {
        chain: {
          species: {
            name: mockPokemon.name,
            url: 'http://localhost:9000/external/api/v2/pokemon-species/1/',
          },
          evolves_to: [
            {
              species: {
                name: 'ivysaur',
                url: 'http://localhost:9000/external/api/v2/pokemon-species/2/',
              },
              evolves_to: [
                {
                  species: {
                    name: 'venusaur',
                    url: 'http://localhost:9000/external/api/v2/pokemon-species/3/',
                  },
                  evolves_to: [],
                },
              ],
            },
          ],
        },
      };

      (extractLastNumberFromUrl as jest.Mock).mockReturnValue(mockOrder);
      mockPokeApi.getEvolutionsByOrder.mockResolvedValue(mockEvolutionData);

      const evolutions = await service.getEvolutions(mockUrl);

      expect(extractLastNumberFromUrl).toHaveBeenCalledWith(mockUrl);
      expect(mockPokeApi.getEvolutionsByOrder).toHaveBeenCalledWith(mockOrder);
      expect(evolutions).toEqual([mockPokemon.name, 'ivysaur', 'venusaur']);
    });

    it('should return an empty list if evolution has no string', async () => {
      const mockUrl = 'https://pokeapi.co/api/v2/evolution-chain/1/';
      const mockOrder = 1;

      (extractLastNumberFromUrl as jest.Mock).mockReturnValue(mockOrder);
      mockPokeApi.getEvolutionsByOrder.mockResolvedValue({
        chain: {
          species: {
            name: mockPokemon.name,
            url: 'http://localhost:9000/external/api/v2/pokemon-species/1/',
          },
          evolves_to: [],
        },
      });

      const evolutions = await service.getEvolutions(mockUrl);

      expect(extractLastNumberFromUrl).toHaveBeenCalledWith(mockUrl);
      expect(mockPokeApi.getEvolutionsByOrder).toHaveBeenCalledWith(mockOrder);
      expect(evolutions).toEqual([mockPokemon.name]);
    });
  });

  describe('getNamesNextEvolution', () => {
    it('should return names of all evolutions in array', () => {
      const evolvesTo = [
        {
          species: {
            name: 'ivysaur',
            url: 'http://localhost:9000/external/api/v2/pokemon-species/2/',
          },
          evolves_to: [
            {
              species: {
                name: 'venusaur',
                url: 'http://localhost:9000/external/api/v2/pokemon-species/3/',
              },
              evolves_to: [],
            },
          ],
        },
      ];

      const names = (service as any).getNamesNextEvolution(evolvesTo);

      expect(names).toEqual(['ivysaur', 'venusaur']);
    });

    it('should return an empty list if there are no evolutions', () => {
      const names = (service as any).getNamesNextEvolution([]);

      expect(names).toEqual([]);
    });
  });
});
