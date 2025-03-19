import { Repository } from 'typeorm';

import type { PaginateParameters } from '@repo/business/paginate/interface';

import type { BasicEntity } from '../interface';
import { Base } from '../base';
import { Seeder } from '../seeder';
import { Validate } from '../validate';
import { type FindOneByParams, type ListParams, Queries } from '../queries';

export abstract class Service<T extends BasicEntity> extends Base {
  private readonly seederModule: Seeder<T>;
  private readonly queriesModule: Queries<T>;
  private readonly validateModule: Validate;
  protected constructor(
    protected readonly alias: string,
    protected readonly relations: Array<string>,
    protected readonly repository: Repository<T>,
  ) {
    super();
    this.seederModule = new Seeder<T>(alias, relations, repository);
    this.queriesModule = new Queries<T>(alias, relations, repository);
    this.validateModule = new Validate();
  }

  get seeder(): Seeder<T> {
    return this.seederModule;
  }

  get validate(): Validate {
    return this.validateModule;
  }

  get queries(): Queries<T> {
    return this.queriesModule;
  }

  async save(data: T): Promise<void | T> {
    return this.repository
      .save(data)
      .then()
      .catch((error) => {
        throw this.error(error);
      });
  }

  async findAll(
    listParams: ListParams,
  ): Promise<Array<T> | PaginateParameters<T>> {
    return await this.queries.list(listParams);
  }

  async findOne(findOneByParams: FindOneByParams) {
    return await this.queries.findOne(findOneByParams);
  }

  async remove(param: string, withDeleted: boolean = false) {
    const result = await this.queries.findOne({
      value: param,
      relations: this.relations,
      withDeleted,
    });
    await this.repository.softRemove(result);
    return { message: 'Successfully removed' };
  }

  async treatEntityParam<T>(value?: string | T, label?: string) {
    this.validate.param<T>(value, label);
    if (this.validate.paramIsEntity<T>(value)) {
      return value;
    }
    const entity = await this.queries.findOne({ value, withThrow: false });
    this.validate.param<T>(entity as unknown as string | T, label);
    return entity;
  }

  async treatEntitiesParams<T>(values?: Array<string | T>, label?: string) {
    if (!values || values.length === 0) {
      return [];
    }
    return values?.map((value) => this.treatEntityParam<T>(value, label));
  }
}
