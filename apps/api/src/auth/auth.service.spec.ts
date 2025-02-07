import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { JwtService } from '@nestjs/jwt';

import { ENTITY_USER_FIXTURE, USER_PASSWORD } from '@repo/mock/auth/fixture';

import { UserService } from './users/users.service';

import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;
  let userService: UserService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UserService,
          useValue: {
            create: jest.fn(),
            findOne: jest.fn(),
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
          cpf: ENTITY_USER_FIXTURE.cpf,
          name: ENTITY_USER_FIXTURE.name,
          email: ENTITY_USER_FIXTURE.email,
          whatsapp: ENTITY_USER_FIXTURE.whatsapp,
          password: USER_PASSWORD,
          date_of_birth: ENTITY_USER_FIXTURE.date_of_birth,
          password_confirmation: USER_PASSWORD,
        }),
      ).toEqual({ message: 'Registration Completed Successfully!' });
    });
  });

  describe('signIn', () => {
    it('should be authenticate user', async () => {
      jest
        .spyOn(userService, 'checkCredentials')
        .mockResolvedValueOnce(ENTITY_USER_FIXTURE);

      expect(
        await service.signIn({
          email: ENTITY_USER_FIXTURE.email,
          password: USER_PASSWORD,
        }),
      ).toEqual({ token: 'token', message: 'Authentication Successfully!' });
    });
  });

  describe('findOne', () => {
    it('should be found a complete user', async () => {
      jest
        .spyOn(userService, 'findOne')
        .mockResolvedValueOnce(ENTITY_USER_FIXTURE);

      expect(
        await service.findOne(ENTITY_USER_FIXTURE.id, ENTITY_USER_FIXTURE),
      ).toEqual({
        id: ENTITY_USER_FIXTURE.id,
        cpf: ENTITY_USER_FIXTURE.cpf,
        role: ENTITY_USER_FIXTURE.role,
        name: ENTITY_USER_FIXTURE.name,
        email: ENTITY_USER_FIXTURE.email,
        status: ENTITY_USER_FIXTURE.status,
        gender: ENTITY_USER_FIXTURE.gender,
        whatsapp: ENTITY_USER_FIXTURE.whatsapp,
        date_of_birth: ENTITY_USER_FIXTURE.date_of_birth,
        created_at: ENTITY_USER_FIXTURE.created_at,
        updated_at: ENTITY_USER_FIXTURE.updated_at,
      });
    });
  });

  describe('me', () => {
    it('should be found a complete user', async () => {
      expect(await service.me(ENTITY_USER_FIXTURE)).toEqual({
        id: ENTITY_USER_FIXTURE.id,
        cpf: ENTITY_USER_FIXTURE.cpf,
        role: ENTITY_USER_FIXTURE.role,
        name: ENTITY_USER_FIXTURE.name,
        email: ENTITY_USER_FIXTURE.email,
        status: ENTITY_USER_FIXTURE.status,
        gender: ENTITY_USER_FIXTURE.gender,
        whatsapp: ENTITY_USER_FIXTURE.whatsapp,
        date_of_birth: ENTITY_USER_FIXTURE.date_of_birth,
        created_at: ENTITY_USER_FIXTURE.created_at,
        updated_at: ENTITY_USER_FIXTURE.updated_at,
      });
    });
  });
});
