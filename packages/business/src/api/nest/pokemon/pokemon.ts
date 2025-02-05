import { Http } from '@repo/services/http/http';
import type { QueryParameters } from '../../../shared';
import { Paginate } from '../../../paginate';
import type { PokemonEntity } from '../../../pokemon/modules';

export class Pokemon extends Http {
  constructor(baseUrl: string, headers: Record<string, string>) {
    super(baseUrl, { headers });
  }

  public async getAll(
    parameters: QueryParameters,
  ): Promise<Paginate<PokemonEntity> | Array<PokemonEntity>> {
    return this.get('pokemon', { params: parameters });
  }

  public async getOne(param: string): Promise<PokemonEntity> {
    return this.get(`pokemon/${param}`);
  }
}