import { Nest } from '../api';
import { Paginate } from '../paginate';
import type { QueryParameters } from '../shared';
import type { PokemonEntity } from './interface';

export class PokemonService {
  constructor(private nest: Nest) {}

  public async getAll(
    parameters: QueryParameters,
  ): Promise<Array<PokemonEntity> | Paginate<PokemonEntity>> {
    return this.nest.pokemon.getAll(parameters);
  }

  public async get(param: string): Promise<PokemonEntity> {
    return this.nest.pokemon.getOne(param);
  }
}