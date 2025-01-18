import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { JwtService } from '@nestjs/jwt';

import {
  ENTITY_USER_COMPLETE_FIXTURE,
  ENTITY_USER_PASSWORD,
} from '@repo/business/auth/fixture/user';

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
          cpf: ENTITY_USER_COMPLETE_FIXTURE.cpf,
          name: ENTITY_USER_COMPLETE_FIXTURE.name,
          email: ENTITY_USER_COMPLETE_FIXTURE.email,
          whatsup: ENTITY_USER_COMPLETE_FIXTURE.whatsup,
          password: ENTITY_USER_COMPLETE_FIXTURE.password,
          date_of_birth: ENTITY_USER_COMPLETE_FIXTURE.date_of_birth,
          password_confirmation: ENTITY_USER_COMPLETE_FIXTURE.password,
        }),
      ).toEqual({ message: 'Registration Completed Successfully!' });
    });
  });

  describe('signIn', () => {
    it('should be authenticate user', async () => {
      jest
        .spyOn(userService, 'checkCredentials')
        .mockResolvedValueOnce(ENTITY_USER_COMPLETE_FIXTURE);

      expect(
        await service.signIn({
          email: ENTITY_USER_COMPLETE_FIXTURE.email,
          password: ENTITY_USER_PASSWORD,
        }),
      ).toEqual({ token: 'token', message: 'Authentication Successfully!' });
    });
  });

  describe('findOne', () => {
    it('should be found a complete user', async () => {
      jest
        .spyOn(userService, 'findOne')
        .mockResolvedValueOnce(ENTITY_USER_COMPLETE_FIXTURE);

      expect(
        await service.findOne(
          ENTITY_USER_COMPLETE_FIXTURE.id,
          ENTITY_USER_COMPLETE_FIXTURE,
        ),
      ).toEqual({
        id: ENTITY_USER_COMPLETE_FIXTURE.id,
        cpf: ENTITY_USER_COMPLETE_FIXTURE.cpf,
        role: ENTITY_USER_COMPLETE_FIXTURE.role,
        name: ENTITY_USER_COMPLETE_FIXTURE.name,
        email: ENTITY_USER_COMPLETE_FIXTURE.email,
        status: ENTITY_USER_COMPLETE_FIXTURE.status,
        gender: ENTITY_USER_COMPLETE_FIXTURE.gender,
        whatsup: ENTITY_USER_COMPLETE_FIXTURE.whatsup,
        date_of_birth: ENTITY_USER_COMPLETE_FIXTURE.date_of_birth,
        created_at: ENTITY_USER_COMPLETE_FIXTURE.created_at,
        updated_at: ENTITY_USER_COMPLETE_FIXTURE.updated_at,
      });
    });
  });
});
