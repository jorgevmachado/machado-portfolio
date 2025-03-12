import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { Pokemon } from './pokemon';
import { PokemonType } from './pokemon-type';
import { PokemonMove } from './pokemon-move';
import { PokemonAbility } from './pokemon-ability';

jest.mock('./pokemon-type');
jest.mock('./pokemon-move');
jest.mock('./pokemon-ability');

describe('Pokemon', () => {
  const mockBaseUrl = 'http://mock-base-url.com';
  const mockHeaders = { Authorization: 'Bearer test-token' };
  const mockConfig = { baseUrl: mockBaseUrl, headers: mockHeaders };

  let pokemon: Pokemon;

  beforeEach(() => {
    jest.clearAllMocks();
    pokemon = new Pokemon(mockConfig);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('pokemonAbilityModule', () => {
    it('should initialize PokemonAbility module', () => {
      expect(PokemonAbility).toHaveBeenCalledTimes(1);
      expect(PokemonAbility).toHaveBeenCalledWith(mockConfig);
    });

    it('should return the instance of PokemonAbility via ability getter', () => {
      const abilityModule = pokemon.ability;
      expect(abilityModule).toBeInstanceOf(PokemonAbility);
      expect(PokemonAbility).toHaveBeenCalledTimes(1);
    });
  });

  describe('pokemonMoveModule', () => {
    it('should initialize PokemonMove module', () => {
      expect(PokemonMove).toHaveBeenCalledTimes(1);
      expect(PokemonMove).toHaveBeenCalledWith(mockConfig);
    });

    it('should return the instance of PokemonMove via move getter', () => {
      const moveModule = pokemon.move;
      expect(moveModule).toBeInstanceOf(PokemonMove);
      expect(PokemonMove).toHaveBeenCalledTimes(1);
    });
  });

  describe('pokemonTypeModule', () => {
    it('should initialize PokemonType module', () => {
      expect(PokemonType).toHaveBeenCalledTimes(1);
      expect(PokemonType).toHaveBeenCalledWith(mockConfig);
    });

    it('should return the instance of PokemonType via type getter', () => {
      const typeModule = pokemon.type;

      expect(typeModule).toBeInstanceOf(PokemonType);
      expect(PokemonType).toHaveBeenCalledTimes(1);
    });
  });
});
