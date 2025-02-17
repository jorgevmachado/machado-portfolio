import { EStatus } from '../shared';
import type { PokemonConstructorParams, PokemonEntity } from './interface';
import {
  ensureAttributes,
  ensureImage,
  ensureOrder,
  ensureRelations,
  ensureSpecie,
} from './config';

export default class Pokemon implements PokemonEntity {
  id: PokemonEntity['id'];
  hp?: PokemonEntity['hp'];
  url: PokemonEntity['url'];
  name: PokemonEntity['name'];
  order: PokemonEntity['order'];
  image?: PokemonEntity['image'];
  speed?: PokemonEntity['speed'];
  moves?: PokemonEntity['moves'];
  types?: PokemonEntity['types'];
  status: PokemonEntity['status'] = EStatus.INCOMPLETE;
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
        params?.order ?? ensureOrder(this.order, params?.url ?? this.url);
      this.image = ensureImage({
        image: params?.image ?? this.image,
        sprites: params?.pokemonByName?.sprites,
      });
      this.status = params?.status ?? this.status;
      const { hp, speed, attack, defense, special_attack, special_defense } =
        ensureAttributes({
          hp: params?.hp ?? this.hp,
          speed: params?.speed ?? this.speed,
          stats: params?.pokemonByName?.stats,
          attack: params?.attack ?? this.attack,
          defense: params?.defense ?? this.defense,
          special_attack: params?.special_attack ?? this.special_attack,
          special_defense: params?.special_defense ?? this.special_defense,
        });
      this.hp = hp;
      this.speed = speed;
      this.attack = attack;
      this.defense = defense;
      this.special_attack = special_attack;
      this.special_defense = special_defense;

      const { types, moves, abilities } = ensureRelations({
        types: params?.types ?? this.types,
        moves: params?.moves ?? this.moves,
        abilities: params?.abilities ?? this.abilities,
        pokemonByName: params?.pokemonByName,
      });
      this.types = types;
      this.moves = moves;
      this.abilities = abilities;

      const {
        habitat,
        is_baby,
        shape_url,
        shape_name,
        is_mythical,
        gender_rate,
        is_legendary,
        capture_rate,
        hatch_counter,
        base_happiness,
        evolution_chain_url,
      } = ensureSpecie({
        habitat: params?.habitat ?? this.habitat,
        is_baby: params?.is_baby ?? this.is_baby,
        shape_url: params?.shape_url ?? this.shape_url,
        shape_name: params?.shape_name ?? this.shape_name,
        is_mythical: params?.is_mythical ?? this.is_mythical,
        gender_rate: params?.gender_rate ?? this.gender_rate,
        is_legendary: params?.is_legendary ?? this.is_legendary,
        capture_rate: params?.capture_rate ?? this.capture_rate,
        hatch_counter: params?.hatch_counter ?? this.hatch_counter,
        base_happiness: params?.base_happiness ?? this.base_happiness,
        evolution_chain_url:
          params?.evolution_chain_url ?? this.evolution_chain_url,
        specieByPokemonName: params?.specieByPokemonName,
      });
      this.habitat = habitat;
      this.is_baby = is_baby;
      this.shape_url = shape_url;
      this.shape_name = shape_name;
      this.is_mythical = is_mythical;
      this.gender_rate = gender_rate;
      this.is_legendary = is_legendary;
      this.capture_rate = capture_rate;
      this.hatch_counter = hatch_counter;
      this.base_happiness = base_happiness;
      this.evolution_chain_url = evolution_chain_url;
    }
  }
}