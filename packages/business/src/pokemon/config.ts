import { extractLastNumberFromUrl } from '@repo/services/number/number';

import {
  EnsureAttributesParams,
  EnsureImageParams,
  EnsureRelationsParams,
  EnsureSpecieParams,
  PokemonByNameResponse,
} from './interface';
import PokemonType from './pokemon-type';
import PokemonMove from './pokemon-move';
import PokemonAbility from './pokemon-ability';

export function ensureImage(params: EnsureImageParams): string {
  if (params?.sprites) {
    const frontDefault = params?.sprites.front_default;
    const dreamWorld = params?.sprites.other.dream_world.front_default;
    const image = frontDefault || dreamWorld;
    return image ?? params.image;
  }
  return params.image;
}

export function ensureAttributes(
  params: EnsureAttributesParams,
): Omit<EnsureAttributesParams, 'stats'> {
  if (params?.stats) {
    return convertStatsToAttributes(params.stats);
  }

  return {
    hp: params.hp,
    speed: params.speed,
    attack: params.attack,
    defense: params.defense,
    special_attack: params.special_attack,
    special_defense: params.special_defense,
  };
}

function convertStatsToAttributes(
  stats: PokemonByNameResponse['stats'],
): Omit<EnsureAttributesParams, 'stats'> {
  return stats.reduce(
    (acc, stat) => {
      switch (stat.stat.name) {
        case 'hp':
          acc.hp = stat.base_stat;
          break;
        case 'speed':
          acc.speed = stat.base_stat;
          break;
        case 'attack':
          acc.attack = stat.base_stat;
          break;
        case 'defense':
          acc.defense = stat.base_stat;
          break;
        case 'special-attack':
          acc.special_attack = stat.base_stat;
          break;
        case 'special-defense':
          acc.special_defense = stat.base_stat;
          break;
      }
      return acc;
    },
    {
      hp: 0,
      speed: 0,
      attack: 0,
      defense: 0,
      special_attack: 0,
      special_defense: 0,
    },
  );
}

export function ensureRelations(
  params: EnsureRelationsParams,
): Omit<EnsureRelationsParams, 'pokemonByName'> {
  if (params?.pokemonByName) {
    const types = params.pokemonByName.types.map(
      (type) =>
        new PokemonType({
          url: type.type.url,
          name: type.type.name,
        }),
    );
    const moves = params.pokemonByName.moves.map(
      (move) =>
        new PokemonMove({
          url: move.move.url,
          name: move.move.name,
        }),
    );
    const abilities = params.pokemonByName.abilities.map(
      (ability) =>
        new PokemonAbility({
          url: ability?.ability?.url,
          slot: ability?.slot,
          name: ability?.ability?.name,
          is_hidden: ability?.is_hidden,
        }),
    );
    return {
      types,
      moves,
      abilities,
    };
  }
  return {
    moves: params?.moves,
    types: params?.types,
    abilities: params?.abilities,
  };
}

export function ensureSpecie(
  params: EnsureSpecieParams,
): Omit<EnsureSpecieParams, 'specieByPokemonName'> {
  if (params?.specieByPokemonName) {
    return {
      habitat: params?.specieByPokemonName.habitat?.name,
      is_baby: params?.specieByPokemonName?.is_baby,
      shape_url: params?.specieByPokemonName?.shape?.url,
      shape_name: params?.specieByPokemonName?.shape?.name,
      is_mythical: params?.specieByPokemonName?.is_mythical,
      gender_rate: params?.specieByPokemonName?.gender_rate,
      is_legendary: params?.specieByPokemonName.is_legendary,
      capture_rate: params?.specieByPokemonName?.capture_rate,
      hatch_counter: params?.specieByPokemonName?.hatch_counter,
      base_happiness: params?.specieByPokemonName?.base_happiness,
      evolution_chain_url: params?.specieByPokemonName?.evolution_chain?.url,
    };
  }
  return {
    habitat: params?.habitat,
    is_baby: params?.is_baby,
    shape_url: params?.shape_url,
    shape_name: params?.shape_name,
    is_mythical: params?.is_mythical,
    gender_rate: params?.gender_rate,
    is_legendary: params?.is_legendary,
    capture_rate: params?.capture_rate,
    hatch_counter: params?.hatch_counter,
    base_happiness: params?.base_happiness,
    evolution_chain_url: params?.evolution_chain_url,
  };
}

export function ensureOrder(order?: number, url?: string): number {
  if (order) {
    return order;
  }
  if (!url) {
    return 0;
  }
  return extractLastNumberFromUrl(url);
}