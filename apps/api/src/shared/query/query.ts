import { ObjectLiteral, Repository, SelectQueryBuilder } from 'typeorm';
import { ConflictException } from '@nestjs/common';

import { QueryParameters } from '@repo/business/shared/interface';

import type { FilterParams, SearchParams } from '../interface';

export interface QueryParams<T> {
  readonly alias: string;
  readonly filters?: Array<FilterParams>;
  readonly relations?: Array<string>;
  readonly defaultAsc?: string;
  readonly parameters?: QueryParameters;
  readonly repository: Repository<T>;
  readonly withDeleted?: boolean;
  readonly searchParams?: SearchParams;
  readonly withRelations?: boolean;
}

export class Query<T extends ObjectLiteral> {
  private query: SelectQueryBuilder<T>;
  private readonly alias: string;
  private readonly filters?: Array<FilterParams>;
  private readonly relations?: Array<string>;
  private readonly defaultAsc?: string;
  private readonly parameters?: QueryParameters;
  private readonly repository: Repository<T>;
  private readonly withDeleted?: boolean;
  private readonly searchParams?: SearchParams;
  private readonly withRelations?: boolean;

  constructor({
    alias,
    filters = [],
    relations = [],
    defaultAsc,
    parameters = {},
    repository,
    withDeleted,
    searchParams,
    withRelations,
  }: QueryParams<T>) {
    this.alias = alias;
    this.filters = filters;
    this.relations = relations;
    this.defaultAsc = defaultAsc;
    this.parameters = parameters;
    this.repository = repository;
    this.withDeleted = withDeleted;
    this.searchParams = searchParams;
    this.withRelations = withRelations;
  }

  initialize() {
    this.query = this.repository.createQueryBuilder(this.alias);
    this.insertOrderByParameterIntoQuery();
    this.insertWithDeletedParameterIntoQuery();
    this.insertRelationshipsParameterIntoQuery();
    this.insertFilterParametersAndParametersIntoQuery();
    this.insertSearchParametersIntoQuery();
    return this.query;
  }

  private insertOrderByParameterIntoQuery(): void {
    const asc = this.parameters?.asc;
    const desc = this.parameters?.desc;

    if (asc && desc) {
      throw new ConflictException('Cannot use asc and desc at the same time');
    }

    if (asc) {
      this.query.orderBy(`${this.alias}.${asc}`, 'ASC');
      return;
    }

    if (desc) {
      this.query.orderBy(`${this.alias}.${desc}`, 'DESC');
      return;
    }

    if (this.defaultAsc) {
      this.query.orderBy(`${this.alias}.${this.defaultAsc}`, 'ASC');
    }
  }

  private insertWithDeletedParameterIntoQuery(): void {
    if (this.withDeleted) {
      this.query.withDeleted();
    }
  }

  private insertRelationshipsParameterIntoQuery(): void {
    if (this.withRelations) {
      if (this.relations.length) {
        this.relations.forEach((relation) => {
          this.query.leftJoinAndSelect(`${this.alias}.${relation}`, relation);
        });
      }
    }
  }

  private insertFilterParametersAndParametersIntoQuery(): void {
    const filters = this.unifiesFiltersWithParameters();

    if (filters.length) {
      filters.forEach((filter) => {
        this.query.andWhere(
          `${this.alias}.${filter.param} ${filter.condition} :${filter.param}`,
          {
            [filter.param]: filter.value,
          },
        );
      });
    }
  }

  private unifiesFiltersWithParameters() {
    if (!this.parameters) {
      return this.filters;
    }

    const filters: Array<FilterParams> = [];

    if (this.parameters?.role) {
      filters.push({
        param: 'role',
        value: this.parameters.role.toUpperCase(),
        condition: '=',
      });
    }

    if (this.parameters?.name) {
      filters.push({
        param: 'name',
        value: `%${this.parameters.name}%`,
        condition: 'LIKE',
      });
    }

    if (this.parameters?.status) {
      filters.push({
        param: 'status',
        value: this.parameters.status.toUpperCase(),
        condition: '=',
      });
    }

    return filters.concat(
      this.filters.filter((filter) => !filters.includes(filter)),
    );
  }

  private insertSearchParametersIntoQuery(): void {
    if (this.searchParams) {
      const by = this.searchParams.by;
      const value = this.searchParams.value;
      this.query.andWhere(`${this.alias}.${by} = :${by}`, { [by]: value });
    }
  }
}
