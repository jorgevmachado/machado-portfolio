import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import PokemonAbility from './pokemonAbility';
import { ensureOrder } from '../config';
import { OVERGROW_ABILITY_FIXTURE } from './fixtures';

jest.mock('../config', () => ({
  ensureOrder: jest.fn(
    (order, url) => order || (url ? `order-for-${url}` : 'default-order'),
  ),
}));

describe('PokemonAbility', () => {
  const pokemonAbilityEntity = OVERGROW_ABILITY_FIXTURE;
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('should correctly instantiate with all provided parameters', () => {
    const abilityParams = {
      ...pokemonAbilityEntity,
      deleted_at: undefined,
    };

    const ability = new PokemonAbility(abilityParams);

    expect(ability.id).toBe(abilityParams.id);
    expect(ability.url).toBe(abilityParams.url);
    expect(ability.slot).toBe(abilityParams.slot);
    expect(ability.name).toBe(abilityParams.name);
    expect(ability.order).toBe(abilityParams.order);
    expect(ability.is_hidden).toBe(abilityParams.is_hidden);
    expect(ability.created_at).toEqual(abilityParams.created_at);
    expect(ability.updated_at).toEqual(abilityParams.updated_at);
    expect(ability.deleted_at).toBe(abilityParams.deleted_at);
  });

  it('should use default values for missing parameters', () => {
    const abilityParams = {
      url: pokemonAbilityEntity.url,
      name: pokemonAbilityEntity.name,
    };

    const ability = new PokemonAbility(abilityParams);

    expect(ability.id).toBeUndefined();
    expect(ability.url).toBe(abilityParams.url);
    expect(ability.slot).toBeUndefined();
    expect(ability.name).toBe(abilityParams.name);
    expect(ability.order).toBe(`order-for-${abilityParams.url}`);
    expect(ability.is_hidden).toBeUndefined();
    expect(ability.created_at).toBeUndefined();
    expect(ability.updated_at).toBeUndefined();
    expect(ability.deleted_at).toBeUndefined();
  });

  it('should call ensureOrder when order is not provided', () => {
    const abilityParams = {
      url: pokemonAbilityEntity.url,
      name: pokemonAbilityEntity.name,
    };

    const ability = new PokemonAbility(abilityParams);

    expect(ensureOrder).toHaveBeenCalledTimes(1);
    expect(ensureOrder).toHaveBeenCalledWith(undefined, abilityParams.url);
    expect(ability.order).toBe(`order-for-${abilityParams.url}`);
  });

  it('should handle null or undefined values for optional fields', () => {
    const abilityParams = {
      url: pokemonAbilityEntity.url,
      name: pokemonAbilityEntity.name,
      created_at: undefined,
    };

    const ability = new PokemonAbility(abilityParams);

    expect(ability.url).toBe(abilityParams.url);
    expect(ability.name).toBe(abilityParams.name);
    expect(ability.created_at).toBeUndefined();
    expect(ability.updated_at).toBeUndefined();
    expect(ability.deleted_at).toBeUndefined();
  });
});