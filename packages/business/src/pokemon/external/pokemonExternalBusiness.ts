import { EStatus } from '../../shared';

import { PokemonExternalApi } from '../../api';

import type {
  PokemonSpritesInformationExternalResponse,
  PokemonStatsInformationExternalResponse,
} from '../../api';

import type { ExternalResponseOfEvolutionByUrl } from '../../api';

import type { PokemonStatsAttributes } from './attributes';

import { Ability } from '../ability';
import { Move } from '../move';
import { Type } from '../type';
import type { MoveEntity, PokemonEntity } from '../interface';

export class PokemonExternalBusiness {
  limit: number = 1302;

  private pokemonExternalApi: PokemonExternalApi;

  constructor() {
    this.pokemonExternalApi = new PokemonExternalApi();
  }

  async getAll(
    offset: number = 0,
    limit: number = this.limit,
  ): Promise<Array<PokemonEntity>> {
    return this.pokemonExternalApi.getAll(offset, limit).then((response) =>
      response.results.map((pokemon) => ({
        id: undefined,
        url: pokemon.url,
        name: pokemon.name,
        order: this.generateOrder(pokemon.url, 'pokemon'),
        status: EStatus.INCOMPLETE,
        created_at: undefined,
        deleted_at: undefined,
        updated_at: undefined,
      })),
    );
  }

  async getOne(entity: PokemonEntity): Promise<PokemonEntity> {
    return await Promise.all([
      await this.pokemonExternalApi.getByName(entity.name),
      await this.pokemonExternalApi.getSpecieByPokemonName(entity.name),
    ])
      .then(([pokemonByName, specieByPokemonName]) => {
        const attributes = this.convertsStatsToAttributes(pokemonByName.stats);
        entity.hp = attributes?.hp;
        entity.image = this.generateImageBySprites(pokemonByName.sprites);
        entity.types = pokemonByName?.types?.map(
          (type) => new Type(type, this.generateOrder(type?.type?.url, 'type')),
        );
        entity.moves = pokemonByName?.moves?.map(
          (move) => new Move(move, this.generateOrder(move?.move?.url, 'move')),
        );
        entity.speed = attributes?.speed;
        entity.attack = attributes?.attack;
        entity.defense = attributes?.defense;
        entity.habitat = specieByPokemonName?.habitat?.name;
        entity.is_baby = specieByPokemonName?.is_baby;
        entity.shape_url = specieByPokemonName?.shape?.url;
        entity.abilities = pokemonByName?.abilities?.map(
          (ability) =>
            new Ability(
              ability,
              this.generateOrder(ability?.ability?.url, 'ability'),
            ),
        );
        entity.shape_name = specieByPokemonName?.shape?.name;
        entity.is_mythical = specieByPokemonName?.is_mythical;
        entity.gender_rate = specieByPokemonName?.gender_rate;
        entity.is_legendary = specieByPokemonName?.is_legendary;
        entity.capture_rate = specieByPokemonName?.capture_rate;
        entity.hatch_counter = specieByPokemonName?.hatch_counter;
        entity.base_happiness = specieByPokemonName?.base_happiness;
        entity.special_attack = attributes?.special_attack;
        entity.special_defense = attributes?.special_defense;
        entity.evolution_chain_url = specieByPokemonName?.evolution_chain?.url;
        return entity;
      })
      .catch((error) => error);
  }

  private generateOrder(url: string, param: string): number {
    const urlDefault = `${this.pokemonExternalApi.url}/${param}/`;
    return Number(url.replace(urlDefault, '').replace('/', ''));
  }

  private convertsStatsToAttributes(
    stats: PokemonStatsInformationExternalResponse,
  ): PokemonStatsAttributes {
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

  private generateImageBySprites(
    sprites: PokemonSpritesInformationExternalResponse,
  ): string {
    const frontDefault = sprites.front_default;
    const dreamWorld = sprites.other.dream_world.front_default;
    return frontDefault || dreamWorld;
  }

  async getMove(move: MoveEntity): Promise<MoveEntity> {
    return this.pokemonExternalApi
      .getMoveByOrder(move.order)
      .then((response) => {
        const effect_entries = response?.effect_entries[0];
        move.pp = response?.pp;
        move.type = response?.type?.name;
        move.power = response?.power;
        move.effect = effect_entries?.effect;
        move.target = response?.target?.name;
        move.priority = response?.priority;
        move.accuracy = response?.accuracy;
        move.short_effect = effect_entries?.short_effect;
        move.damage_class = response?.damage_class?.name;
        move.effect_chance = response?.effect_chance;
        return move;
      })
      .catch((error) => error);
  }

  async getEvolutions(url: string): Promise<Array<string>> {
    const order = this.generateOrder(
      url,
      `${this.pokemonExternalApi.url}/evolution-chain/`,
    );
    return this.pokemonExternalApi
      .getEvolutionsByOrder(order)
      .then((response) => [
        response?.chain?.species?.name,
        ...this.nextEvolution(response.chain.evolves_to),
      ]);
  }

  private nextEvolution(
    evolves: ExternalResponseOfEvolutionByUrl['chain']['evolves_to'],
  ) {
    return evolves
      .map((item) =>
        [item.species.name].concat(...this.nextEvolution(item.evolves_to)),
      )
      .reduce((arr, curr) => [...arr, ...curr], []);
  }
}
