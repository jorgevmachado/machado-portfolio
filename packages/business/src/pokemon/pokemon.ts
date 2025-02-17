import { Base, EStatus } from '../shared';

import PokemonType from './pokemon-type';
import PokemonMove from './pokemon-move';
import PokemonAbility from './pokemon-ability';
import {
  EnsureAttributesParams,
  EnsureImageParams,
  EnsureRelationsParams,
  EnsureSpecieParams,
  PokemonConstructorParams, PokemonEntity,
  PokemonByNameResponse
} from './interface';

export default class Pokemon extends Base implements PokemonEntity {
  id: PokemonEntity['id'];
  hp?: PokemonEntity['hp'];
  url: PokemonEntity['url'];
  name: PokemonEntity['name'];
  order: PokemonEntity['order'];
  image?: PokemonEntity['image'];
  speed?: PokemonEntity['speed'];
  moves?: PokemonEntity['moves'];
  types?: PokemonEntity['types'];
  status: PokemonEntity['status'];
  attack?: PokemonEntity['attack'];
  defense?: PokemonEntity['defense'];
  habitat?: PokemonEntity['habitat'];
  is_baby?: PokemonEntity['is_baby'];
  shape_url?: PokemonEntity['url'];
  abilities?: PokemonEntity['abilities'];
  created_at: PokemonEntity['created_at'];
  updated_at: PokemonEntity['updated_at'];
  deleted_at: PokemonEntity['deleted_at'];
  evolutions?: PokemonEntity['evolutions'];
  shape_name?: PokemonEntity['shape_name'];
  is_mythical?: PokemonEntity['is_mythical'];
  gender_rate?: PokemonEntity['gender_rate'];
  is_legendary?: PokemonEntity['is_legendary'];
  capture_rate?: PokemonEntity['capture_rate'];
  hatch_counter?: PokemonEntity['hatch_counter'];
  base_happiness?: PokemonEntity['base_happiness'];
  special_attack?: PokemonEntity['special_attack'];
  special_defense?: PokemonEntity['special_defense'];
  evolution_chain_url?: PokemonEntity['evolution_chain_url'];
  evolves_from_species?: PokemonEntity['evolves_from_species'];
  has_gender_differences?: PokemonEntity['has_gender_differences'];

  constructor(params?: PokemonConstructorParams) {
    super();
    if (params) {
      this.id = params?.id ?? this.id;
      this.url = params?.url ?? this.url;
      this.name = params?.name ?? this.name;
      this.created_at = params?.created_at ?? this.created_at;
      this.updated_at = params?.updated_at ?? this.updated_at;
      this.deleted_at = params?.deleted_at ?? this.deleted_at;
      this.evolutions = params?.evolutions ?? this.evolutions;
      this.evolves_from_species =
        params?.evolves_from_species ?? this.evolves_from_species;
      this.has_gender_differences =
        params?.has_gender_differences ?? this.has_gender_differences;

      this.order =
        params?.order ?? this.ensureOrder(this.order, params?.url ?? this.url);
      this.ensureImage({
        image: params?.image,
        sprites: params?.pokemonByName?.sprites,
      });
      this.ensureStatus(params?.status);
      this.ensureAttributes({
        hp: params?.hp,
        speed: params?.speed,
        stats: params?.pokemonByName?.stats,
        attack: params?.attack,
        defense: params?.defense,
        special_attack: params?.special_attack,
        special_defense: params?.special_defense,
      });
      this.ensureRelations({
        moves: params?.moves,
        types: params?.types,
        abilities: params?.abilities,
        pokemonByName: params?.pokemonByName,
      });
      this.ensureSpecie({
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
        specieByPokemonName: params?.specieByPokemonName,
      });
    }
  }

  private ensureImage(params: EnsureImageParams) {
    if (params?.sprites) {
      const frontDefault = params?.sprites.front_default;
      const dreamWorld = params?.sprites.other.dream_world.front_default;
      const image = frontDefault || dreamWorld;
      this.image = image ?? this.image;
      return;
    }
    this.image = params?.image ?? this.image;
  }

  private ensureStatus(status?: PokemonEntity['status']) {
    this.status = status ?? this.status;
    if (!this.status) {
      this.status = EStatus.INCOMPLETE;
    }
  }

  private ensureAttributes(params: EnsureAttributesParams) {
    if (params?.stats) {
      const { hp, speed, attack, defense, special_attack, special_defense } =
        this.convertStatsToAttributes(params.stats);
      this.hp = hp ?? this.hp;
      this.speed = speed ?? this.speed;
      this.attack = attack ?? this.attack;
      this.defense = defense ?? this.defense;
      this.special_attack = special_attack ?? this.special_attack;
      this.special_defense = special_defense ?? this.special_defense;
      return;
    }
    this.hp = params?.hp ?? this.hp;
    this.speed = params?.speed ?? this.speed;
    this.attack = params?.attack ?? this.attack;
    this.defense = params?.defense ?? this.defense;
    this.special_attack = params?.special_attack ?? this.special_attack;
    this.special_defense = params?.special_defense ?? this.special_defense;
  }

  private convertStatsToAttributes(stats: PokemonByNameResponse['stats']) {
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
          default:
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

  private ensureRelations(params: EnsureRelationsParams) {
    if (params?.pokemonByName) {
      this.types = params.pokemonByName.types.map(
        (type) =>
          new PokemonType({
            url: type.type.url,
            name: type.type.name,
          }),
      );
      this.moves = params.pokemonByName.moves.map(
        (move) =>
          new PokemonMove({
            url: move.move.url,
            name: move.move.name,
          }),
      );
      this.abilities = params.pokemonByName.abilities.map(
        (ability) =>
          new PokemonAbility({
            url: ability?.ability?.url,
            slot: ability?.slot,
            name: ability?.ability?.name,
            is_hidden: ability?.is_hidden,
          }),
      );
      return;
    }
    this.types = params?.types ?? this.types;
    this.moves = params?.moves ?? this.moves;
    this.abilities = params?.abilities ?? this.abilities;
  }

  private ensureSpecie(params: EnsureSpecieParams) {
    if (params?.specieByPokemonName) {
      this.habitat = params?.specieByPokemonName?.habitat?.name;
      this.is_baby = params?.specieByPokemonName?.is_baby;
      this.shape_url = params?.specieByPokemonName?.shape?.url;
      this.shape_name = params?.specieByPokemonName?.shape?.name;
      this.is_mythical = params?.specieByPokemonName?.is_mythical;
      this.gender_rate = params?.specieByPokemonName?.gender_rate;
      this.is_legendary = params?.specieByPokemonName?.is_legendary;
      this.capture_rate = params?.specieByPokemonName?.capture_rate;
      this.hatch_counter = params?.specieByPokemonName?.hatch_counter;
      this.base_happiness = params?.specieByPokemonName?.base_happiness;
      this.evolution_chain_url =
        params?.specieByPokemonName?.evolution_chain?.url;
      return;
    }
    this.habitat = params?.habitat ?? this.habitat;
    this.is_baby = params?.is_baby ?? this.is_baby;
    this.shape_url = params?.shape_url ?? this.shape_url;
    this.shape_name = params?.shape_name ?? this.shape_name;
    this.is_mythical = params?.is_mythical ?? this.is_mythical;
    this.gender_rate = params?.gender_rate ?? this.gender_rate;
    this.is_legendary = params?.is_legendary ?? this.is_legendary;
    this.capture_rate = params?.capture_rate ?? this.capture_rate;
    this.hatch_counter = params?.hatch_counter ?? this.hatch_counter;
    this.base_happiness = params?.base_happiness ?? this.base_happiness;
    this.evolution_chain_url =
      params?.evolution_chain_url ?? this.evolution_chain_url;
  }
}