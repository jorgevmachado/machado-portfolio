import { Http } from '@repo/services/http/http';

import type { QueryParameters } from '../../shared';
import { Paginate } from '../../paginate';

import type { INestBaseResponse, INestModuleConfig } from './interface';

export abstract class NestModuleAbstract<T, CP, UP> extends Http {
  protected constructor(
    protected readonly pathUrl: string,
    protected readonly nestModuleConfig: INestModuleConfig,
  ) {
    const { baseUrl, headers } = nestModuleConfig;
    super(baseUrl, { headers });
  }

  public async getAll(
    parameters: QueryParameters,
  ): Promise<Paginate<T> | Array<T>> {
    return this.get(this.pathUrl, { params: parameters });
  }

  public async getOne(param: string): Promise<T> {
    return this.get(`${this.pathUrl}/${param}`);
  }

  public async delete(param: string): Promise<INestBaseResponse> {
    return this.remove(`${this.pathUrl}/${param}`);
  }

  public async create(params: CP): Promise<INestBaseResponse> {
    return this.post(this.pathUrl,  { body: params });
  }

  public async update(param: string, params: UP): Promise<INestBaseResponse> {
    return this.path(`${this.pathUrl}/${param}`, { body: params })
  }
}