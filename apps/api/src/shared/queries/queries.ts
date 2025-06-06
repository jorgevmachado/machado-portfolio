import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

import { isUUID } from '@repo/services/string/string';

import { PaginateParameters } from '@repo/business/paginate/interface';
import { Paginate } from '@repo/business/paginate/paginate';

import type { BasicEntity } from '../interface';

import { Query } from '../query';

import type {
  FindByParams,
  FindOneByOrder,
  FindOneByParams,
  ListParams,
} from './interface';

export class Queries<T extends BasicEntity> {
  constructor(
    protected readonly alias: string,
    protected readonly relations: Array<string>,
    protected readonly repository: Repository<T>,
  ) {}

  async findBy({
    filters = [],
    withThrow,
    relations,
    searchParams,
    withDeleted,
    withRelations = true,
  }: FindByParams) {
    const query = new Query<T>({
      filters,
      alias: this.alias,
      relations: relations ?? this.relations,
      repository: this.repository,
      withDeleted,
      searchParams,
      withRelations,
    }).initialize();

    const result = await query.getOne();

    if (!result && withThrow) {
      throw new NotFoundException(`${this.alias} not found`);
    }

    return result;
  }

  async findOne({
    value,
    filters = [],
    relations,
    withThrow = true,
    withDeleted = false,
    withRelations = true,
  }: FindOneByParams) {
    const valueIsUUID = isUUID(value);
    return await this.findBy({
      searchParams: {
        by: valueIsUUID ? 'id' : 'name',
        value: value?.toLowerCase(),
        condition: valueIsUUID ? '=' : 'LIKE',
      },
      filters,
      relations,
      withThrow,
      withDeleted,
      withRelations,
    });
  }

  async list({
    filters = [],
    relations,
    parameters,
    defaultAsc,
    withDeleted = false,
    withRelations = true,
  }: ListParams): Promise<Array<T> | PaginateParameters<T>> {
    const { page, limit } = parameters;
    const query = new Query<T>({
      alias: this.alias,
      filters,
      relations:  relations ?? this.relations,
      defaultAsc,
      parameters,
      repository: this.repository,
      withDeleted,
      withRelations,
    }).initialize();

    if (!limit || !page) {
      return await query.getMany();
    }
    const currentPage = page <= 0 ? 1 : page;
    const [results, total] = await query
        .skip((currentPage - 1) * limit)
        .take(limit)
        .getManyAndCount();

    return new Paginate(Number(page), Number(limit), Number(total), results);
  }

  async findOneByOrder<R>({
    order,
    complete = true,
    withThrow = true,
    response,
    completingData,
  }: FindOneByOrder<T, R>): Promise<T> {
    const result = await this.findBy({
      searchParams: {
        by: 'order',
        value: order,
      },
      withThrow,
    });

    if (!complete || !completingData) {
      return result;
    }

    return completingData(result, response);
  }
}