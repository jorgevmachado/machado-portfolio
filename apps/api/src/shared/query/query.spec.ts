import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { ConflictException } from '@nestjs/common';

import { ERole, EStatus } from '@repo/business/shared/enum';

import { Query } from './query';

describe('Query', () => {
  let repositoryMock: Repository<any>;
  let selectQueryBuilderMock: SelectQueryBuilder<any>;

  beforeEach(() => {
    jest.clearAllMocks();
    selectQueryBuilderMock = {
      orderBy: jest.fn().mockReturnThis(),
      withDeleted: jest.fn().mockReturnThis(),
      leftJoinAndSelect: jest.fn().mockReturnThis(),
      andWhere: jest.fn().mockReturnThis(),
    } as any;

    repositoryMock = {
      createQueryBuilder: jest.fn(() => selectQueryBuilderMock),
    } as any;
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('initialize', () => {
    it('should initialize the query properly', () => {
      const query = new Query({
        alias: 'test',
        repository: repositoryMock,
      });

      const result = query.initialize();

      expect(repositoryMock.createQueryBuilder).toHaveBeenCalledWith('test');
      expect(result).toEqual(selectQueryBuilderMock);
    });
  });

  describe('insertOrderByParameterIntoQuery', () => {
    it('should add ASC order by parameter', () => {
      const query = new Query({
        alias: 'test',
        parameters: { asc: 'name' },
        repository: repositoryMock,
      });

      query['initialize']();
      query['insertOrderByParameterIntoQuery']();

      expect(selectQueryBuilderMock.orderBy).toHaveBeenCalledWith(
        'test.name',
        'ASC',
      );
    });

    it('should add DESC order by parameter', () => {
      const query = new Query({
        alias: 'test',
        parameters: { desc: 'name' },
        repository: repositoryMock,
      });

      query['initialize']();
      query['insertOrderByParameterIntoQuery']();

      expect(selectQueryBuilderMock.orderBy).toHaveBeenCalledWith(
        'test.name',
        'DESC',
      );
    });

    it('should add default ASC order when no parameters are provided', () => {
      const query = new Query({
        alias: 'test',
        defaultAsc: 'createdAt',
        repository: repositoryMock,
      });

      query['initialize']();
      query['insertOrderByParameterIntoQuery']();

      expect(selectQueryBuilderMock.orderBy).toHaveBeenCalledWith(
        'test.createdAt',
        'ASC',
      );
    });

    it('should throw ConflictException when both ASC and DESC are provided', () => {
      const query = new Query({
        alias: 'test',
        parameters: { asc: 'name', desc: 'createdAt' },
        repository: repositoryMock,
      });

      expect(() => query['insertOrderByParameterIntoQuery']()).toThrowError(
        new ConflictException('Cannot use asc and desc at the same time'),
      );
    });
  });

  describe('insertWithDeletedParameterIntoQuery', () => {
    it('should enable withDeleted when the parameter withDeleted is true', () => {
      const query = new Query({
        alias: 'test',
        withDeleted: true,
        repository: repositoryMock,
      });

      query['initialize']();
      query['insertWithDeletedParameterIntoQuery']();

      expect(selectQueryBuilderMock.withDeleted).toHaveBeenCalled();
    });

    it('should not call withDeleted when the parameter is false', () => {
      const query = new Query({
        alias: 'test',
        withDeleted: false,
        repository: repositoryMock,
      });

      query['initialize']();
      query['insertWithDeletedParameterIntoQuery']();

      expect(selectQueryBuilderMock.withDeleted).not.toHaveBeenCalled();
    });
  });

  describe('insertRelationshipsParameterIntoQuery', () => {
    it('should add relationships correctly', () => {
      const query = new Query({
        alias: 'test',
        withRelations: true,
        relations: ['relation1', 'relation2'],
        repository: repositoryMock,
      });

      query['initialize']();
      query['insertRelationshipsParameterIntoQuery']();

      expect(selectQueryBuilderMock.leftJoinAndSelect).toHaveBeenCalledWith(
        'test.relation1',
        'relation1',
      );
      expect(selectQueryBuilderMock.leftJoinAndSelect).toHaveBeenCalledWith(
        'test.relation2',
        'relation2',
      );
    });

    it('should not add relationships if withRelations is false', () => {
      const query = new Query({
        alias: 'test',
        withRelations: false,
        relations: ['relation1', 'relation2'],
        repository: repositoryMock,
      });

      query['initialize']();
      query['insertRelationshipsParameterIntoQuery']();

      expect(selectQueryBuilderMock.leftJoinAndSelect).not.toHaveBeenCalled();
    });
  });

  describe('insertFilterParametersAndParametersIntoQuery', () => {
    it('should add filters to the query', () => {
      const query = new Query({
        alias: 'test',
        filters: [{ param: 'name', value: 'test', condition: '=' }],
        repository: repositoryMock,
      });

      query['initialize']();
      query['insertFilterParametersAndParametersIntoQuery']();

      expect(selectQueryBuilderMock.andWhere).toHaveBeenCalledWith(
        'test.name = :name',
        { name: 'test' },
      );
    });
  });

  describe('unifiesFiltersWithParameters', () => {
    it('should return only the provided filters when parameters are undefined', () => {
      const query = new Query({
        alias: 'test',
        filters: [{ param: 'status', value: 'active', condition: '=' }],
        parameters: undefined,
        repository: repositoryMock,
      });

      const result = query['unifiesFiltersWithParameters']();
      expect(result).toEqual([
        { param: 'status', value: 'active', condition: '=' },
      ]);
    });

    it('should add filters for role, name, and status from parameters', () => {
      const query = new Query({
        alias: 'test',
        parameters: {
          year: '2025',
          role: ERole.ADMIN,
          name: 'Test User',
          status: EStatus.ACTIVE,
        },
        repository: repositoryMock,
      });

      const result = query['unifiesFiltersWithParameters']();

      expect(result).toEqual(
        expect.arrayContaining([
          { param: 'year', value: '2025', condition: '=' },
          { param: 'role', value: 'admin', condition: '=' },
          { param: 'name', value: 'test user', condition: 'LIKE' },
          { param: 'status', value: 'active', condition: '=' },
        ]),
      );
    });

    it('should combine pre-existing filters with filters from parameters', () => {
      const query = new Query({
        alias: 'test',
        filters: [
          { param: 'creation_date', value: '2023-01-01', condition: '>=' },
        ],
        parameters: {
          name: 'Some Name',
        },
        repository: repositoryMock,
      });

      const result = query['unifiesFiltersWithParameters']();

      expect(result).toEqual(
        expect.arrayContaining([
          { param: 'creation_date', value: '2023-01-01', condition: '>=' },
          { param: 'name', value: 'some name', condition: 'LIKE' },
        ]),
      );
    });

    it('should return only the provided filters when parameters are undefined', () => {
      const query = new Query({
        alias: 'test',
        filters: [{ param: 'status', value: 'active', condition: '=' }],
        parameters: undefined,
        repository: repositoryMock,
      });

      const result = query['unifiesFiltersWithParameters']();

      expect(result).toEqual([
        { param: 'status', value: 'active', condition: '=' },
      ]);
    });
  });

  describe('insertSearchParametersIntoQuery', () => {
    it('should not add any conditions when searchParams is undefined', () => {
      const query = new Query({
        alias: 'test',
        repository: repositoryMock,
      });

      query['initialize']();
      query['insertSearchParametersIntoQuery']();

      expect(selectQueryBuilderMock.andWhere).not.toHaveBeenCalled();
    });

    it('should add a simple condition when searchParams is provided with default condition', () => {
      const query = new Query({
        alias: 'test',
        repository: repositoryMock,
        searchParams: {
          by: 'name',
          value: 'John',
        },
      });

      query['initialize']();
      query['insertSearchParametersIntoQuery']();

      expect(selectQueryBuilderMock.andWhere).toHaveBeenCalledWith(
        'test.name = :name',
        { name: 'John' },
      );
    });

    it('should use LIKE condition correctly when searchParams condition is LIKE', () => {
      const query = new Query({
        alias: 'test',
        repository: repositoryMock,
        searchParams: {
          by: 'name',
          value: 'John',
          condition: 'LIKE',
        },
      });

      query['initialize']();
      query['insertSearchParametersIntoQuery']();

      expect(selectQueryBuilderMock.andWhere).toHaveBeenCalledWith(
        'LOWER(test.name) LIKE :name',
        { name: '%John%' },
      );
    });

    it('should call setWhereParam with correct parameters when searchParams is provided', () => {
      const query = new Query({
        alias: 'test',
        repository: repositoryMock,
        searchParams: {
          by: 'email',
          value: 'example@example.com',
          condition: '=',
        },
      });

      const setWhereParamSpy = jest.spyOn(query as any, 'setWhereParam');
      query['initialize']();
      query['insertSearchParametersIntoQuery']();

      expect(setWhereParamSpy).toHaveBeenCalledWith({
        by: 'email',
        condition: '=',
        value: 'example@example.com',
      });
    });
  });

  describe('setWhereParam', () => {
    it('should set parameters correctly with default condition', () => {
      const query = new Query({
        alias: 'test',
        repository: repositoryMock,
      });

      const result = query['setWhereParam']({
        by: 'status',
        condition: '=',
        value: 'active',
      });

      expect(result).toEqual({
        column: 'test.status = :status',
        searchValue: { status: 'active' },
      });
    });

    it('should set parameters correctly with LIKE condition', () => {
      const query = new Query({
        alias: 'test',
        repository: repositoryMock,
      });

      const result = query['setWhereParam']({
        by: 'name',
        condition: 'LIKE',
        value: 'John',
      });

      expect(result).toEqual({
        column: 'LOWER(test.name) LIKE :name',
        searchValue: { name: '%John%' },
      });
    });

    it('should set parameters correctly with custom alias', () => {
      const query = new Query({
        alias: 'myAlias',
        repository: repositoryMock,
      });

      const result = query['setWhereParam']({
        by: 'email',
        condition: '=',
        value: 'example@example.com',
      });

      expect(result).toEqual({
        column: 'myAlias.email = :email',
        searchValue: { email: 'example@example.com' },
      });
    });
  });
});
