import { Test, TestingModule } from '@nestjs/testing';
import {
  BadRequestException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import fs from 'fs';

import { EGender, ERole, EStatus } from '@repo/business/shared/enum';

import {
  USER_ENTITY_FIXTURE,
  USER_FIXTURE,
  USER_PASSWORD,
} from '@repo/business/auth/fixtures/auth';

import { User } from './user.entity';

import { UserService } from './users.service';
import { UpdateAuthDto } from '../dto/update-auth.dto';

jest.mock('fs');

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

      jest.spyOn(repository, 'save').mockResolvedValueOnce(USER_FIXTURE);

      expect(
        await service.create({
          cpf: USER_ENTITY_FIXTURE.cpf,
          name: USER_ENTITY_FIXTURE.name,
          email: USER_ENTITY_FIXTURE.email,
          whatsapp: USER_ENTITY_FIXTURE.whatsapp,
          password: USER_PASSWORD,
          date_of_birth: USER_ENTITY_FIXTURE.date_of_birth,
          password_confirmation: USER_PASSWORD,
        }),
      ).toEqual(USER_FIXTURE);
    });

    it('should return error a user already exist ', async () => {
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
        getOne: jest.fn().mockReturnValueOnce(USER_FIXTURE),
      } as any);

      await expect(
        service.create({
          cpf: USER_ENTITY_FIXTURE.cpf,
          name: USER_ENTITY_FIXTURE.name,
          email: USER_ENTITY_FIXTURE.email,
          whatsapp: USER_ENTITY_FIXTURE.whatsapp,
          password: USER_PASSWORD,
          date_of_birth: USER_ENTITY_FIXTURE.date_of_birth,
          password_confirmation: USER_PASSWORD,
        }),
      ).rejects.toThrow(BadRequestException);
    });
  });

  describe('checkCredentials', () => {
    it('should return true', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        withDeleted: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(USER_ENTITY_FIXTURE),
      } as any);

      expect(
        await service.checkCredentials({
          email: USER_FIXTURE.email,
          password: USER_PASSWORD,
        }),
      ).toEqual(USER_ENTITY_FIXTURE);
    });

    it('should return false because the user is inactive', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        withDeleted: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce({
          ...USER_ENTITY_FIXTURE,
          status: EStatus.INACTIVE,
        }),
      } as any);

      await expect(
        service.checkCredentials({
          email: USER_FIXTURE.email,
          password: USER_PASSWORD,
        }),
      ).rejects.toThrow(UnprocessableEntityException);
    });

    it('should return false because the credentials is incorrectly', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        withDeleted: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(USER_ENTITY_FIXTURE),
      } as any);

      await expect(
        service.checkCredentials({
          email: USER_FIXTURE.email,
          password: '@Password2',
        }),
      ).rejects.toThrow(UnprocessableEntityException);
    });
  });

  describe('findOne', () => {
    it('should return user', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(USER_ENTITY_FIXTURE),
      } as any);

      expect(await service.findOne({ value: USER_ENTITY_FIXTURE.id })).toEqual(
        USER_ENTITY_FIXTURE,
      );
    });
  });

  describe('update', () => {
    it('should update user with all fields', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(USER_FIXTURE),
      } as any);

      const updateAuthDto: UpdateAuthDto = {
        name: 'Demi Moore',
        role: ERole.ADMIN,
        gender: EGender.FEMALE,
        status: EStatus.COMPLETE,
        date_of_birth: new Date('2000-01-01'),
      };

      const expected = {
        ...USER_FIXTURE,
        ...updateAuthDto,
      };

      jest.spyOn(repository, 'save').mockResolvedValueOnce(expected);

      expect(await service.update(USER_FIXTURE.id, updateAuthDto)).toEqual(
        expected,
      );
    });

    it('It should return the user without changes.', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(USER_FIXTURE),
      } as any);

      expect(
        await service.update(USER_FIXTURE.id, {
          name: undefined,
          role: undefined,
          gender: undefined,
          status: undefined,
          date_of_birth: undefined,
        }),
      ).toEqual(USER_FIXTURE);
    });
  });

  describe('seed', () => {
    const seedEntityUser = USER_ENTITY_FIXTURE;
    it('should seed the database when exist in database', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        leftJoinAndSelect: jest.fn(),
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(seedEntityUser),
      } as any);

      expect(await service.seed()).toEqual(seedEntityUser);
    });

    it('should seed the database when not exist in database', async () => {
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

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(null),
      } as any);

      jest.spyOn(repository, 'save').mockResolvedValueOnce(seedEntityUser);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(seedEntityUser),
      } as any);

      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce({ ...seedEntityUser, role: ERole.ADMIN });

      expect(await service.seed()).toEqual({
        ...seedEntityUser,
        role: ERole.ADMIN,
      });
    });
  });

  describe('promoteUser', () => {
    const promoteEntityUser = USER_ENTITY_FIXTURE;
    it('should promote user', async () => {
      jest
        .spyOn(repository, 'save')
        .mockResolvedValueOnce({ ...promoteEntityUser, role: ERole.ADMIN });

      expect(
        await service.promoteUser({
          ...promoteEntityUser,
          role: ERole.USER,
        }),
      ).toEqual({
        user: {
          ...promoteEntityUser,
          role: ERole.ADMIN,
        },
        valid: true,
        message: 'User promoted successfully!',
      });
    });

    it('should return the message that the user is already an admin', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce({
          ...promoteEntityUser,
          role: ERole.ADMIN,
        }),
      } as any);

      expect(await service.promoteUser(promoteEntityUser)).toEqual({
        user: {
          ...promoteEntityUser,
          role: ERole.ADMIN,
        },
        valid: false,
        message: 'The User is already admin.',
      });
    });
  });

  describe('upload', () => {
    const mockFile: Express.Multer.File = {
      fieldname: 'file',
      originalname: 'test-image.jpeg',
      encoding: '7bit',
      mimetype: 'image/jpeg',
      size: 1024,
      buffer: Buffer.from('mock file content'),
      destination: 'uploads/',
      filename: 'test-image.jpeg',
      path: 'uploads/test-image.jpeg',
      stream: undefined,
    };
    it('should return the path of the file with default file structure', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(USER_ENTITY_FIXTURE),
      } as any);

      jest.spyOn(fs, 'existsSync').mockReturnValue(false);

      jest.spyOn(service as any, 'save').mockResolvedValue({
        ...USER_ENTITY_FIXTURE,
        picture: `http://localhost:3001/uploads/${USER_ENTITY_FIXTURE.email}.jpeg`,
      });

      expect(await service.upload(USER_ENTITY_FIXTURE.id, mockFile)).toEqual({
        ...USER_ENTITY_FIXTURE,
        picture: `http://localhost:3001/uploads/${USER_ENTITY_FIXTURE.email}.jpeg`,
      });
    });
  });
});