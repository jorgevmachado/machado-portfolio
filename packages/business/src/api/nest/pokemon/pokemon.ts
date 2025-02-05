import { Http } from '@repo/services/http/http';
import type { QueryParameters } from '../../../shared';
import { Paginate } from '../../../paginate';
import type { IPokemon } from './interface';

export class Pokemon extends Http {
  constructor(baseUrl: string, headers: Record<string, string>) {
    super(baseUrl, { headers });
  }

  public async getAll(
    parameters: QueryParameters,
  ): Promise<Paginate<IPokemon> | Array<IPokemon>> {
    return this.get('pokemon', { params: parameters });
  }

  public async getOne(param: string): Promise<IPokemon> {
    return this.get(`pokemon/${param}`);
  }
}