import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { JwtService } from '@nestjs/jwt';

import AuthBusiness from '@repo/business/auth/business';

import { USER_ENTITY_FIXTURE, USER_PASSWORD } from '@repo/business/auth/fixtures/auth';

import { UserService } from './users/users.service';

import { AuthService } from './auth.service';
import { EGender, ERole } from '@repo/business/shared/enum';
import {UpdateAuthDto} from "./dto/update-auth.dto";

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        AuthBusiness,
        {
          provide: UserService,
          useValue: {
            seed: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
            upload: jest.fn(),
            findOne: jest.fn(),
            promoteUser: jest.fn(),
            checkCredentials: jest.fn(),
          },
        },
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValueOnce('token'),
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    userService = module.get(UserService);
    jwtService = module.get(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userService).toBeDefined();
    expect(jwtService).toBeDefined();
  });

  describe('signUp', () => {
    it('should be registered user', async () => {
      expect(
        await service.signUp({
          cpf: USER_ENTITY_FIXTURE.cpf,
          name: USER_ENTITY_FIXTURE.name,
          email: USER_ENTITY_FIXTURE.email,
          whatsapp: USER_ENTITY_FIXTURE.whatsapp,
          password: USER_PASSWORD,
          date_of_birth: USER_ENTITY_FIXTURE.date_of_birth,
          password_confirmation: USER_PASSWORD,
        }),
      ).toEqual({ message: 'Registration Completed Successfully!' });
    });
  });

  describe('signIn', () => {
    it('should be authenticate user', async () => {
      jest
        .spyOn(userService, 'checkCredentials')
        .mockResolvedValueOnce(USER_ENTITY_FIXTURE);

      expect(
        await service.signIn({
          email: USER_ENTITY_FIXTURE.email,
          password: USER_PASSWORD,
        }),
      ).toEqual({ token: 'token', message: 'Authentication Successfully!' });
    });
  });

  describe('findOne', () => {
    it('should be found a complete user', async () => {

      jest
        .spyOn(userService, 'findOne')
        .mockResolvedValueOnce(USER_ENTITY_FIXTURE);

      expect(
        await service.findOne(USER_ENTITY_FIXTURE.id, USER_ENTITY_FIXTURE),
      ).toEqual({
        id: USER_ENTITY_FIXTURE.id,
        cpf: USER_ENTITY_FIXTURE.cpf,
        role: USER_ENTITY_FIXTURE.role,
        name: USER_ENTITY_FIXTURE.name,
        email: USER_ENTITY_FIXTURE.email,
        status: USER_ENTITY_FIXTURE.status,
        gender: USER_ENTITY_FIXTURE.gender,
        whatsapp: USER_ENTITY_FIXTURE.whatsapp,
        date_of_birth: USER_ENTITY_FIXTURE.date_of_birth,
        created_at: USER_ENTITY_FIXTURE.created_at,
        updated_at: USER_ENTITY_FIXTURE.updated_at,
        finance: USER_ENTITY_FIXTURE.finance,
      });
    });
  });

  describe('me', () => {
    it('should be found a complete user', async () => {
      jest
          .spyOn(userService, 'findOne')
          .mockResolvedValueOnce(USER_ENTITY_FIXTURE);
      expect(await service.me(USER_ENTITY_FIXTURE)).toEqual({
        id: USER_ENTITY_FIXTURE.id,
        cpf: USER_ENTITY_FIXTURE.cpf,
        role: USER_ENTITY_FIXTURE.role,
        name: USER_ENTITY_FIXTURE.name,
        email: USER_ENTITY_FIXTURE.email,
        status: USER_ENTITY_FIXTURE.status,
        gender: USER_ENTITY_FIXTURE.gender,
        whatsapp: USER_ENTITY_FIXTURE.whatsapp,
        date_of_birth: USER_ENTITY_FIXTURE.date_of_birth,
        created_at: USER_ENTITY_FIXTURE.created_at,
        updated_at: USER_ENTITY_FIXTURE.updated_at,
        finance: USER_ENTITY_FIXTURE.finance,
      });
    });
  });

  describe('seed', () => {
    it('should be seed data', async () => {
      jest
        .spyOn(userService, 'findOne')
        .mockResolvedValueOnce(USER_ENTITY_FIXTURE);

      jest
        .spyOn(userService, 'seed')
        .mockResolvedValueOnce({ ...USER_ENTITY_FIXTURE, role: ERole.ADMIN });

      expect(await service.seed()).toEqual({
        id: USER_ENTITY_FIXTURE.id,
        cpf: USER_ENTITY_FIXTURE.cpf,
        role: ERole.ADMIN,
        name: USER_ENTITY_FIXTURE.name,
        email: USER_ENTITY_FIXTURE.email,
        status: USER_ENTITY_FIXTURE.status,
        gender: USER_ENTITY_FIXTURE.gender,
        whatsapp: USER_ENTITY_FIXTURE.whatsapp,
        date_of_birth: USER_ENTITY_FIXTURE.date_of_birth,
        created_at: USER_ENTITY_FIXTURE.created_at,
        updated_at: USER_ENTITY_FIXTURE.updated_at,
        finance: USER_ENTITY_FIXTURE.finance,
      });
    });
  });

  describe('promoteUser', () => {
    it('should promote user with success', async () => {
      jest
        .spyOn(userService, 'findOne')
        .mockResolvedValueOnce({ ...USER_ENTITY_FIXTURE, role: ERole.USER });

      jest.spyOn(userService, 'promoteUser').mockResolvedValueOnce({
        user: { ...USER_ENTITY_FIXTURE, role: ERole.ADMIN },
        valid: true,
        message: 'User promoted successfully!',
      });

      expect(
        await service.promoteUser(USER_ENTITY_FIXTURE.id, {
          ...USER_ENTITY_FIXTURE,
          role: ERole.ADMIN,
        }),
      ).toEqual({
        user: { ...USER_ENTITY_FIXTURE, role: ERole.ADMIN },
        valid: true,
        message: 'User promoted successfully!',
      });
    });
  });

  describe('update', () => {
    it('should update only name and gender user with success', async () => {
      const updateAuthDto: UpdateAuthDto = {
        name: 'Demi Moore',
        role: undefined,
        status: undefined,
        gender: EGender.FEMALE,
      }
      jest
        .spyOn(userService, 'findOne')
        .mockResolvedValueOnce(USER_ENTITY_FIXTURE);

      jest.spyOn(userService, 'update').mockResolvedValueOnce({
        ...USER_ENTITY_FIXTURE,
        name: updateAuthDto.name,
        gender: updateAuthDto.gender,
      });

      expect(
        await service.update(updateAuthDto, USER_ENTITY_FIXTURE),
      ).toEqual({ message: 'Update Successfully!' });
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
    it('should upload file with success', async () => {
      jest
        .spyOn(userService, 'findOne')
        .mockResolvedValueOnce(USER_ENTITY_FIXTURE);

      jest.spyOn(userService, 'upload').mockResolvedValueOnce({
        ...USER_ENTITY_FIXTURE,
        picture: `http://localhost:3001/uploads/${USER_ENTITY_FIXTURE.email}.jpeg`
      });

      expect(
        await service.upload(mockFile, USER_ENTITY_FIXTURE),
      ).toEqual({ message: 'File uploaded successfully!' });
    });
  });
});
