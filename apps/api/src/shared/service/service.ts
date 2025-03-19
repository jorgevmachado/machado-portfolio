import { Repository } from 'typeorm';
import { ConflictException, NotFoundException } from '@nestjs/common';

import { Paginate } from '@repo/business/paginate/paginate';
import { PaginateParameters } from '@repo/business/paginate/interface';

import {
  BasicEntity,
  FindByParams,
  FindOneByOrder,
  FindOneByParams,
  ListParams,
} from '../interface';
import { Base } from '../base';
import { Query } from '../query';
import { isUUID } from '@repo/services/string/string';
import {
  GetRelationParams,
  SeedEntitiesParams,
  SeedEntityParams,
} from './interface';

type ExecuteSeedParams<T> = {
  label: string;
  seedMethod: () => Promise<Array<T | void>>;
};

export abstract class Service<T extends BasicEntity> extends Base {
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

  async findBy({
    withThrow,
    relations,
    searchParams,
    withDeleted,
    withRelations = true,
  }: FindByParams) {
    const query = new Query<T>({
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
      relations,
      withThrow,
      withDeleted,
      withRelations,
    });
  }

  async save(data: T): Promise<void | T> {
    return this.repository
      .save(data)
      .then()
      .catch((error) => {
        throw this.error(error);
      });
  }

  async remove(param: string, withDeleted: boolean = false) {
    const result = await this.findOne({
      value: param,
      relations: this.relations,
      withDeleted,
    });
    await this.repository.softRemove(result);
    return { message: 'Successfully removed' };
  }

  async treatEntityParam<T>(value?: string | T, label?: string) {
    this.validateParam<T>(value, label);
    if (this.paramIsEntity<T>(value)) {
      return value;
    }
    const entity = await this.findOne({ value, withThrow: false });
    this.validateParam<T>(entity as unknown as string | T, label);
    return entity;
  }

  async treatEntitiesParams<T>(values?: Array<string | T>, label?: string) {
    if (!values || values.length === 0) {
      return [];
    }
    return values?.map((value) => this.treatEntityParam<T>(value, label));
  }

  async seedEntities({
    by,
    key,
    seeds,
    label,
    withReturnSeed = true,
    createdEntityFn,
  }: SeedEntitiesParams<T>) {
    this.validateListMock<T>({ key, list: seeds, label });
    console.info(`# => Start ${label.toLowerCase()} seeding`);
    const existingEntities = await this.repository.find({ withDeleted: true });
    const existingEntitiesBy = new Set(
      existingEntities.map((entity) => entity[by]),
    );

    const entitiesToCreate = seeds.filter(
      (entity) => !existingEntitiesBy.has(entity[by]),
    );

    if (entitiesToCreate.length === 0) {
      console.info(`# => No new ${label.toLowerCase()} to seed`);
      return existingEntities;
    }
    const createdEntities = (
      await Promise.all(
        entitiesToCreate.map(async (entity) => {
          const newEntity = await createdEntityFn(entity);
          return this.save(newEntity as T);
        }),
      )
    ).filter((entity) => !!entity);
    console.info(
      `# => Seeded ${createdEntities.length} new ${label.toLowerCase()}`,
    );
    const seed = [...existingEntities, ...createdEntities];
    if (!withReturnSeed) {
      return { message: `Seeding ${label} Completed Successfully!` };
    }
    return seed;
  }

  async seedEntity({ by, label, seed, createdEntityFn }: SeedEntityParams<T>) {
    console.info(`# => Start ${label.toLowerCase()} seeding`);
    const currentSeed = await this.findOne({
      value: seed[by],
      withThrow: false,
    });
    if (currentSeed) {
      console.info(`# => No new ${label.toLowerCase()} to seed`);
      return currentSeed;
    }
    return await createdEntityFn(seed as T);
  }

  async executeSeed<T>({
    label,
    seedMethod,
  }: ExecuteSeedParams<T>): Promise<Array<T>> {
    console.info(`# => Seeding ${label}`);
    const items = await seedMethod();
    const validItems = this.filterValidItems<T>(items);
    console.info(`# => ${validItems.length} ${label} seeded successfully`);
    return validItems;
  }

  filterValidItems<T>(items: Array<T | void>): Array<T> {
    return items.filter((item): item is T => item !== undefined);
  }

  getRelation<T extends { id: string; name?: string }>({
    key,
    list,
    param,
    relation,
  }: GetRelationParams<T>) {
    const item = list?.find((item) => item[key] === param);
    if (!item) {
      throw this.error(
        new ConflictException(
          `The selected ${relation} does not exist, try another one or create one.`,
        ),
      );
    }
    return item;
  }
}
