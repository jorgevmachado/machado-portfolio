import type { IPokemon } from '../api/nest/pokemon';
import { EStatus } from '../shared';

interface PokemonConstructorParams
  extends Omit<
    IPokemon,
    'id' | 'order' | 'status' | 'created_at' | 'deleted_at' | 'updated_at'
  > {
  id?: string;
  order?: number;
  status?: IPokemon['status'];
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}

export default class Pokemon implements IPokemon {
  id: IPokemon['id'];
  hp?: IPokemon['hp'];
  url: IPokemon['url'];
  name: IPokemon['name'];
  order: IPokemon['order'];
  image?: IPokemon['image'];
  speed?: IPokemon['speed'];
  moves?: IPokemon['moves'];
  types?: IPokemon['types'];
  status: IPokemon['status'];
  attack?: IPokemon['attack'];
  defense?: IPokemon['defense'];
  habitat?: IPokemon['habitat'];
  is_baby?: IPokemon['is_baby'];
  shape_url?: IPokemon['url'];
  abilities?: IPokemon['abilities'];
  created_at: IPokemon['created_at'];
  updated_at: IPokemon['updated_at'];
  deleted_at: IPokemon['deleted_at'];
  evolutions?: IPokemon['evolutions'];
  shape_name?: IPokemon['shape_name'];
  is_mythical?: IPokemon['is_mythical'];
  gender_rate?: IPokemon['gender_rate'];
  is_legendary?: IPokemon['is_legendary'];
  capture_rate?: IPokemon['capture_rate'];
  hatch_counter?: IPokemon['hatch_counter'];
  base_happiness?: IPokemon['base_happiness'];
  special_attack?: IPokemon['special_attack'];
  special_defense?: IPokemon['special_defense'];
  evolution_chain_url?: IPokemon['evolution_chain_url'];
  evolves_from_species?: IPokemon['evolves_from_species'];
  has_gender_differences?: IPokemon['has_gender_differences'];

  constructor(pokemon?: PokemonConstructorParams) {
    if (pokemon) {
      this.id = pokemon.id ?? this.id;
      this.hp = pokemon.hp ?? this.hp;
      this.url = pokemon.url ?? this.url;
      this.name = pokemon.name ?? this.name;
      this.image = pokemon.image ?? this.image;
      this.speed = pokemon.speed ?? this.speed;
      this.order = pokemon.order ?? this.ensureOrder();
      this.status = pokemon.status ?? this.ensureStatus();
      this.attack = pokemon.attack ?? this.attack;
      this.defense = pokemon.defense ?? this.defense;
      this.habitat = pokemon.habitat ?? this.habitat;
      this.is_baby = pokemon.is_baby ?? this.is_baby;
      this.shape_url = pokemon.shape_url ?? this.shape_url;
      this.created_at = pokemon.created_at ?? this.created_at;
      this.updated_at = pokemon.updated_at ?? this.updated_at;
      this.deleted_at = pokemon.deleted_at ?? this.deleted_at;
      this.shape_name = pokemon.shape_name ?? this.shape_name;
      this.is_mythical = pokemon.is_mythical ?? this.is_mythical;
      this.gender_rate = pokemon.gender_rate ?? this.gender_rate;
      this.is_legendary = pokemon.is_legendary ?? this.is_legendary;
      this.capture_rate = pokemon.capture_rate ?? this.capture_rate;
      this.hatch_counter = pokemon.hatch_counter ?? this.hatch_counter;
      this.base_happiness = pokemon.base_happiness ?? this.base_happiness;
      this.special_attack = pokemon.special_attack ?? this.special_attack;
      this.special_defense = pokemon.special_defense ?? this.special_defense;
      this.evolution_chain_url =
        pokemon.evolution_chain_url ?? this.evolution_chain_url;
      this.evolves_from_species =
        pokemon.evolves_from_species ?? this.evolves_from_species;
      this.has_gender_differences =
        pokemon.has_gender_differences ?? this.has_gender_differences;
    }
  }

  private ensureOrder() {
    if(this.order) {
      return this.order;
    }
    return this.extractOrderFromUrl(this.url);
  }

  private extractOrderFromUrl(url?: string) {
    if (!url) {
      return 0;
    }
    const sanitizedUrl = url.endsWith('/') ? url.slice(0, -1) : url;
    const segments = sanitizedUrl.split('/');
    return Number(segments[segments.length - 1]);
  }

  private ensureStatus() {
    if(this.status) {
      return this.status;
    }
    return EStatus.INCOMPLETE;
  }
}