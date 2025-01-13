export interface IResponsePokemon {
  url: string;
  name: string;
  order?: number;
}

export interface IResponsePokemonName {
  name: string;
  order: number;
  types: Array<IResponseType>;
  moves: Array<IResponseMove>;
  stats: Array<IResponseStat>;
  sprites: IResponsePokemonNameSprites;
  abilities: Array<IResponseAbility>;
}

export interface IResponseType {
  slot: number;
  type: Pick<IResponsePokemon, 'url' | 'name'>;
}

export interface IResponseMove {
  move: Pick<IResponsePokemon, 'url' | 'name'>;
}

export interface IResponseStat {
  stat: Pick<IResponsePokemon, 'url' | 'name'>;
  base_stat: number;
}

export interface IResponsePokemonNameSprites {
  other: {
    dream_world: IResponseSpritesUrl;
  };
  front_default: string;
}

interface IResponseSpritesUrl {
  back_gray?: string;
  front_gray?: string;
  back_shiny?: string;
  front_shiny?: string;
  back_female?: string;
  front_female?: string;
  back_default?: string;
  front_default?: string;
  back_transparent?: string;
  front_transparent?: string;
  back_shiny_female?: string;
  front_shiny_female?: string;
  back_shiny_transparent?: string;
  front_shiny_transparent?: string;
}

export interface IResponseAbility {
  slot: number;
  ability: Pick<IResponsePokemon, 'url' | 'name'>;
  is_hidden: boolean;
}

export interface IResponsePokemonSpecie {
  shape: Pick<IResponsePokemon, 'url' | 'name'>;
  habitat: Pick<IResponsePokemon, 'url' | 'name'>;
  is_baby: boolean;
  gender_rate: number;
  is_mythical: boolean;
  capture_rate: number;
  is_legendary: boolean;
  hatch_counter: number;
  base_happiness: number;
  evolution_chain: Pick<IResponsePokemon, 'url'>;
  evolves_from_species?: Pick<IResponsePokemon, 'url' | 'name'>;
  has_gender_differences: boolean;
}

export interface IResponsePokemonEvolution {
  chain: {
    species: Pick<IResponsePokemon, 'url' | 'name'>;
    evolves_to: Array<IResponseEvolvesTo>;
  };
}

interface IResponseEvolvesTo {
  species: Pick<IResponsePokemon, 'url' | 'name'>;
  evolves_to: Array<IResponseEvolvesTo>;
}

export interface IResponsePokemonMove {
  pp: number;
  type: Pick<IResponsePokemon, 'url' | 'name'>;
  name: string;
  power: number;
  target: Pick<IResponsePokemon, 'url' | 'name'>;
  priority: number;
  accuracy: number;
  effect_entries: Array<{
    effect: string;
    short_effect: string;
  }>;
  damage_class: Pick<IResponsePokemon, 'url' | 'name'>;
  effect_chance?: number;
  learned_by_pokemon: Array<Pick<IResponsePokemon, 'url' | 'name'>>;
}
