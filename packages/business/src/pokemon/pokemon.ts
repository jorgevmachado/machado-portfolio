import { Nest } from '../api';
import { Paginate } from '../paginate';
import { QueryParameters } from '../shared';

import { PokemonEntity } from './modules';

export class Pokemon {
  constructor(private nest: Nest) {}

  public async getAll(
    parameters: QueryParameters,
  ): Promise<Paginate<PokemonEntity> | Array<PokemonEntity>> {
    return this.nest.getAllPokemons(parameters);
  }

  public async getOne(param: string): Promise<PokemonEntity> {
    return this.nest.getPokemon(param);
  }
}
