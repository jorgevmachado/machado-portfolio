import { Http } from '@repo/services/http/http';

import type { QueryParameters } from '../../shared';
import { Paginate } from '../../paginate';

import type { INestBaseResponse, INestModuleConfig } from './interface';

interface NestModuleAbstractConstructorPrams {
  pathUrl: string;
  subPathUrl?: string;
  nestModuleConfig: INestModuleConfig;
}

interface ConvertSubPathUrlParams {
  pathUrl: string;
  isParam?: boolean;
  subPathUrl?: string;
  conectorPath?: string;
}

export abstract class NestModuleAbstract<T, CP, UP> extends Http {
  protected readonly pathUrl: string;
  protected readonly subPathUrl?: string;
  protected readonly nestModuleConfig: INestModuleConfig;
  protected constructor({ pathUrl, subPathUrl, nestModuleConfig }: NestModuleAbstractConstructorPrams) {
    const { baseUrl, headers } = nestModuleConfig;
    super(baseUrl, { headers });
    this.pathUrl = pathUrl;
    this.subPathUrl = subPathUrl;
    this.nestModuleConfig = nestModuleConfig;
  }

  public async getAll(
    parameters: QueryParameters,
  ): Promise<Paginate<T> | Array<T>> {
    const path = this.convertSubPathUrl({
      pathUrl: this.pathUrl,
      subPathUrl: this.subPathUrl,
      conectorPath: 'list'
    });
    return this.get(path, { params: parameters });
  }

  public async getOne(param: string): Promise<T> {
    const path = this.convertSubPathUrl({
      pathUrl: this.pathUrl,
      isParam: true,
      subPathUrl: this.subPathUrl,
      conectorPath: param
    });
    return this.get(`${path}`);
  }

  public async delete(param: string): Promise<INestBaseResponse> {
    const path = this.convertSubPathUrl({
      pathUrl: this.pathUrl,
      isParam: true,
      subPathUrl: this.subPathUrl,
      conectorPath: param
    });
    return this.remove(`${path}`);
  }

  public async create(params: CP): Promise<T> {
    const path = this.convertSubPathUrl({
      pathUrl: this.pathUrl,
      subPathUrl: this.subPathUrl,
    });
    return this.post(path, { body: params });
  }

  public async update(param: string, params: UP): Promise<T> {
    const path = this.convertSubPathUrl({
      pathUrl: this.pathUrl,
      isParam: true,
      subPathUrl: this.subPathUrl,
      conectorPath: param
    });
    return this.path(`${path}`, { body: params });
  }

  private convertSubPathUrl({ pathUrl, isParam , subPathUrl, conectorPath } : ConvertSubPathUrlParams): string {
    if (!subPathUrl) {
      const currentParam = conectorPath ? `/${conectorPath}` : '';
      return isParam ? `${pathUrl}${currentParam}` : pathUrl;
    }
    if(!conectorPath) {
      return `${pathUrl}/${subPathUrl}`;
    }
    return `${pathUrl}/${conectorPath}/${subPathUrl}`;
  }
}