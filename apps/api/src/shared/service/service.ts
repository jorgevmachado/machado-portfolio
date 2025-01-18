import { ObjectLiteral, Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';

import { Paginate } from '@repo/business/paginate/paginate';
import { PaginateParameters } from '@repo/business/paginate/interface';

import { FindOneParams, FindParams, ListParams } from '../interface';
import { Base } from '../base';
import { Query } from '../query';

export abstract class Service<T extends ObjectLiteral> extends Base {
  protected constructor(
    protected readonly alias: string,
    protected readonly relations: Array<string>,
    protected readonly repository: Repository<T>,
  ) {
    super();
  }

  async list({
    filters = [],
    parameters,
    defaultAsc,
    withDeleted = false,
    withRelations = true,
  }: ListParams): Promise<Array<T> | PaginateParameters<T>> {
    const query = new Query<T>({
      alias: this.alias,
      filters,
      relations: this.relations,
      defaultAsc,
      parameters,
      repository: this.repository,
      withDeleted,
      withRelations,
    }).initialize();

    if (!parameters?.limit || !parameters?.page) {
      return await query.getMany();
    }

    const [results, total] = await query.getManyAndCount();

    return new Paginate(parameters.page, parameters.limit, total, results);
  }

  async findOneByOrder<R>({
    order,
    complete = true,
    withThrow = true,
    response,
    completingData,
  }: FindOneParams<T, R>): Promise<T> {
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

  async findBy({
    withThrow,
    searchParams,
    withDeleted,
    withRelations,
  }: FindParams) {
    const query = new Query<T>({
      alias: this.alias,
      relations: this.relations,
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

  async save(data: T): Promise<void> {
    return this.repository
      .save(data)
      .then()
      .catch((error) => this.error(error));
  }
}
