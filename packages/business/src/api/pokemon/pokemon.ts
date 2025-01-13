import { Http } from '@repo/services/http/http';

import { ResponsePaginate } from '../interface';

import type {
  IResponsePokemon,
  IResponsePokemonEvolution,
  IResponsePokemonMove,
  IResponsePokemonName,
  IResponsePokemonSpecie,
} from './interface';

export class PokemonApi extends Http {
  constructor() {
    super('https://pokeapi.co/api/v2', {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  async getAll(
    offset: number,
    limit: number,
  ): Promise<ResponsePaginate<IResponsePokemon>> {
    return this.get('pokemon', { params: { offset, limit } });
  }

  async getByName(name: string): Promise<IResponsePokemonName> {
    return this.get(`pokemon/${name}`);
  }

  async getSpeciesByName(name: string): Promise<IResponsePokemonSpecie> {
    return this.get(`pokemon-species/${name}`);
  }

  async getEvolutionsByOrder(
    order: number,
  ): Promise<IResponsePokemonEvolution> {
    return this.get(`evolution-chain/${order}`);
  }

  async getMoveByOrder(order: number): Promise<IResponsePokemonMove> {
    return this.get(`move/${order}`);
  }
}
