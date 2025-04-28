import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { extractLastNumberFromUrl } from '@repo/services/number/number';

import {
  ensureAttributes,
  ensureImage,
  ensureOrder,
  ensureRelations,
  ensureSpecie,
} from './config';

import PokemonType from './pokemon-type';
import PokemonMove from './pokemon-move';
import PokemonAbility from './pokemon-ability';

jest.mock('@repo/services/number/number');

describe('Config Utilities', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.resetModules();
  });

  describe('ensureImage', () => {
    const ensureImageParams = {
      image: 'fallback.png',
      sprites: {
        front_default: 'front.png',
        other: { dream_world: { front_default: 'dream.png' } },
      },
    };
    it('should return the image from sprites.front_default if available', () => {
      const image = ensureImage(ensureImageParams);
      expect(image).toBe('front.png');
    });

    it('should return the image from sprites.other.dream_world.front_default if front_default is non-existent', () => {
      const image = ensureImage({
        ...ensureImageParams,
        sprites: {
          ...ensureImageParams.sprites,
          front_default: undefined,
        },
      });
      expect(image).toBe('dream.png');
    });

    it('should return the fallback image if no sprites are available', () => {
      const image = ensureImage({
        ...ensureImageParams,
        sprites: undefined,
      });
      expect(image).toBe('fallback.png');
    });

    it('should return the fallback image if no front_default and dreamWorld', () => {
      const image = ensureImage({
        ...ensureImageParams,
        sprites: {
          front_default: undefined,
          other: { dream_world: { front_default: undefined } },
        },
      });
      expect(image).toBe('fallback.png');
    });
  });

  describe('ensureAttributes', () => {
    it('should return converted attributes from stats', () => {
      const params = {
        stats: [
          { base_stat: 50, stat: { name: 'hp', url: 'placeholder-url' } },
          { base_stat: 60, stat: { name: 'speed', url: 'placeholder-url' } },
          { base_stat: 70, stat: { name: 'attack', url: 'placeholder-url' } },
          { base_stat: 80, stat: { name: 'defense', url: 'placeholder-url' } },
          {
            base_stat: 90,
            stat: { name: 'special-attack', url: 'placeholder-url' },
          },
          {
            base_stat: 100,
            stat: { name: 'special-defense', url: 'placeholder-url' },
          },
        ],
      };

      const attributes = ensureAttributes(params);
      expect(attributes).toEqual({
        hp: 50,
        speed: 60,
        attack: 70,
        defense: 80,
        special_attack: 90,
        special_defense: 100,
      });
    });

    it('should return attributes directly if params.stats is not available', () => {
      const params = {
        hp: 80,
        speed: 70,
        attack: 60,
        defense: 50,
        special_attack: 40,
        special_defense: 30,
      };

      const attributes = ensureAttributes(params);
      expect(attributes).toEqual(params);
    });
  });

  describe('ensureRelations', () => {
    it('should return types, moves and abilities based on pokemonByName', () => {
      const params = {
        pokemonByName: {
          types: [{ type: { name: 'fire', url: 'type-url' }, slot: 1 }],
          moves: [{ move: { name: 'ember', url: 'move-url' } }],
          abilities: [
            {
              ability: { name: 'blaze', url: 'ability-url' },
              slot: 1,
              is_hidden: false,
            },
          ],
          order: 1,
          stats: [
            { base_stat: 49, stat: { name: 'attack', url: 'stat-url' } },
            { base_stat: 49, stat: { name: 'defense', url: 'stat-url' } },
          ],
          sprites: {
            front_default: 'front.png',
            other: { dream_world: { front_default: 'dream.png' } },
          },
        },
      };

      const relations = ensureRelations(params);

      expect(relations.types).toHaveLength(1);
      expect(relations.moves).toHaveLength(1);
      expect(relations.abilities).toHaveLength(1);

      expect(relations.types?.[0]).toBeInstanceOf(PokemonType);
      expect(relations.moves?.[0]).toBeInstanceOf(PokemonMove);
      expect(relations.abilities?.[0]).toBeInstanceOf(PokemonAbility);
    });

    it('should return attributes directly if pokemonByName does not exist', () => {
      const params = {
        moves: [new PokemonMove({ name: 'move1', url: 'move-url' })],
        types: [new PokemonType({ name: 'grass', url: 'type-url' })],
        abilities: [
          new PokemonAbility({ name: 'ability1', url: 'ability-url', slot: 1 }),
        ],
      };

      const relations = ensureRelations(params);
      expect(relations).toEqual(params);
    });
  });

  describe('ensureSpecie', () => {
    it('should return species information based on specieByPokemonName', () => {
      const params = {
        specieByPokemonName: {
          habitat: { name: 'grass', url: 'habitat-url' },
          is_baby: false,
          shape: { name: 'quadruped', url: 'shape-url' },
          is_mythical: true,
          gender_rate: 4,
          is_legendary: false,
          capture_rate: 45,
          hatch_counter: 15,
          base_happiness: 70,
          evolution_chain: { url: 'evolution-chain-url' },
          has_gender_differences: false,
        },
      };

      const specie = ensureSpecie(params);

      expect(specie).toEqual({
        habitat: 'grass',
        is_baby: false,
        shape_url: 'shape-url',
        shape_name: 'quadruped',
        is_mythical: true,
        gender_rate: 4,
        is_legendary: false,
        capture_rate: 45,
        hatch_counter: 15,
        base_happiness: 70,
        evolution_chain_url: 'evolution-chain-url',
      });
    });

    it('should return default information if specieByPokemonName does not exist', () => {
      const params = {
        habitat: 'default-habitat',
        is_baby: true,
        shape_url: 'default-shape-url',
        shape_name: 'default-shape-name',
        is_mythical: false,
        gender_rate: 0,
        is_legendary: false,
        capture_rate: 255,
        hatch_counter: 20,
        base_happiness: 100,
        evolution_chain_url: 'default-evolution-chain-url',
      };

      const specie = ensureSpecie(params);

      expect(specie).toEqual(params);
    });
  });

  describe('ensureOrder', () => {
    it('should return the value of order if provided', () => {
      const result = ensureOrder(42, 'any-url');
      expect(result).toBe(42);
    });

    it('should return 0 if no order or URL is given\n', () => {
      const result = ensureOrder(undefined, undefined);
      expect(result).toBe(0);
    });

    it('should return the number extracted from the URL if order is not provided\n', () => {
      (extractLastNumberFromUrl as jest.Mock).mockReturnValue(99);

      const result = ensureOrder(undefined, 'https://example.com/99');
      expect(result).toBe(99);
      expect(extractLastNumberFromUrl).toHaveBeenCalledWith(
        'https://example.com/99',
      );
    });
  });
});