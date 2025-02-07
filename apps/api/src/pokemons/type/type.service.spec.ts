import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import { BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE } from '@repo/mock/pokemon/fixtures/completes/index';

import { Type } from '../entities/type.entity';

import { TypeService } from './type.service';

describe('TypeService', () => {
  let service: TypeService;
  let repository: Repository<Type>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TypeService,
        { provide: getRepositoryToken(Type), useClass: Repository },
      ],
    }).compile();

    service = module.get<TypeService>(TypeService);
    repository = module.get<Repository<Type>>(getRepositoryToken(Type));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('findList(entityType)', () => {
    it('should return a list of Pokémon types from the database', async () => {
      BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE.types.forEach((type) => {
        jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
          andWhere: jest.fn(),
          getOne: jest.fn().mockReturnValueOnce(type),
        } as any);
      });

      expect(
        await service.findList(BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE.types),
      ).toEqual(BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE.types);
    });

    it('must save a list of pokemon types in the database when none exist', async () => {
      BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE.types.forEach(() => {
        jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
          andWhere: jest.fn(),
          getOne: jest.fn().mockReturnValueOnce(null),
        } as any);
      });

      BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE.types.forEach((type) => {
        jest.spyOn(repository, 'save').mockResolvedValueOnce(type);
      });

      BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE.types.forEach((type) => {
        jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
          andWhere: jest.fn(),
          getOne: jest.fn().mockReturnValueOnce(type),
        } as any);
      });

      expect(
        await service.findList(BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE.types),
      ).toEqual(BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE.types);
    });
  });
});