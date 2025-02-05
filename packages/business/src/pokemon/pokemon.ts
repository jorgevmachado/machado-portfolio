import { Nest } from '../api';
import { Paginate } from '../paginate';
import type { QueryParameters } from '../shared';

import type { PokemonEntity } from './interface';

export class Pokemon {
  constructor(private nest: Nest) {}

  public async getAll(
    parameters: QueryParameters,
  ): Promise<Paginate<PokemonEntity> | Array<PokemonEntity>> {
    return this.nest.pokemon.getAll(parameters);
  }

  public async getOne(param: string): Promise<PokemonEntity> {
    return this.nest.pokemon.getOne(param);
  }
}
