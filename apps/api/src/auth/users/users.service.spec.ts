import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import {
  ENTITY_USER_COMPLETE_FIXTURE,
  ENTITY_USER_PASSWORD,
} from '@repo/business/auth/fixture/user';

import { User } from './user.entity';

import { UserService } from './users.service';

describe('UsersService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useClass: Repository },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should create a user ', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(null),
      } as any);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(null),
      } as any);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(null),
      } as any);

      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce(ENTITY_USER_COMPLETE_FIXTURE);

      expect(
        await service.create({
          cpf: ENTITY_USER_COMPLETE_FIXTURE.cpf,
          name: ENTITY_USER_COMPLETE_FIXTURE.name,
          email: ENTITY_USER_COMPLETE_FIXTURE.email,
          whatsapp: ENTITY_USER_COMPLETE_FIXTURE.whatsapp,
          password: ENTITY_USER_COMPLETE_FIXTURE.password,
          date_of_birth: ENTITY_USER_COMPLETE_FIXTURE.date_of_birth,
          password_confirmation: ENTITY_USER_COMPLETE_FIXTURE.password,
        }),
      ).toEqual(ENTITY_USER_COMPLETE_FIXTURE);
    });
  });

  describe('checkCredentials', () => {
    it('should return true', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(ENTITY_USER_COMPLETE_FIXTURE),
      } as any);

      expect(
        await service.checkCredentials({
          email: ENTITY_USER_COMPLETE_FIXTURE.email,
          password: ENTITY_USER_PASSWORD,
        }),
      ).toEqual(ENTITY_USER_COMPLETE_FIXTURE);
    });
  });

  describe('findOne', () => {
    it('should return user', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(ENTITY_USER_COMPLETE_FIXTURE),
      } as any);

      expect(await service.findOne(ENTITY_USER_COMPLETE_FIXTURE.id)).toEqual(
        ENTITY_USER_COMPLETE_FIXTURE,
      );
    });
  });
});
