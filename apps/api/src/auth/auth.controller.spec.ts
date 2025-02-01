import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import {
  ENTITY_USER_COMPLETE_FIXTURE,
  ENTITY_USER_PASSWORD,
} from '@repo/business/auth/fixture/user';

import { AuthService } from './auth.service';

import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            me: jest.fn(),
            signUp: jest.fn(),
            signIn: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('signUp', () => {
    it('should be able to register user', async () => {
      jest.spyOn(service, 'signUp').mockResolvedValueOnce({
        message: 'Registration Completed Successfully!',
      });

      expect(
        await controller.signUp({
          cpf: ENTITY_USER_COMPLETE_FIXTURE.cpf,
          name: ENTITY_USER_COMPLETE_FIXTURE.name,
          email: ENTITY_USER_COMPLETE_FIXTURE.email,
          whatsapp: ENTITY_USER_COMPLETE_FIXTURE.whatsapp,
          password: ENTITY_USER_COMPLETE_FIXTURE.password,
          date_of_birth: ENTITY_USER_COMPLETE_FIXTURE.date_of_birth,
          password_confirmation: ENTITY_USER_COMPLETE_FIXTURE.password,
        }),
      ).toEqual({ message: 'Registration Completed Successfully!' });
    });
  });

  describe('signIn', () => {
    it('should be logged in', async () => {
      jest.spyOn(service, 'signIn').mockResolvedValueOnce({
        token: 'token',
        message: 'Authentication Successfully!',
      });

      expect(
        await controller.signIn({
          email: ENTITY_USER_COMPLETE_FIXTURE.email,
          password: ENTITY_USER_PASSWORD,
        }),
      ).toEqual({ token: 'token', message: 'Authentication Successfully!' });
    });
  });

  describe('findOne', () => {
    it('should be able to find user', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce({
        id: ENTITY_USER_COMPLETE_FIXTURE.id,
        cpf: ENTITY_USER_COMPLETE_FIXTURE.cpf,
        role: ENTITY_USER_COMPLETE_FIXTURE.role,
        name: ENTITY_USER_COMPLETE_FIXTURE.name,
        email: ENTITY_USER_COMPLETE_FIXTURE.email,
        status: ENTITY_USER_COMPLETE_FIXTURE.status,
        gender: ENTITY_USER_COMPLETE_FIXTURE.gender,
        whatsapp: ENTITY_USER_COMPLETE_FIXTURE.whatsapp,
        date_of_birth: ENTITY_USER_COMPLETE_FIXTURE.date_of_birth,
        created_at: ENTITY_USER_COMPLETE_FIXTURE.created_at,
        updated_at: ENTITY_USER_COMPLETE_FIXTURE.updated_at,
        deleted_at: ENTITY_USER_COMPLETE_FIXTURE.deleted_at,
      });

      expect(
        await controller.findOne(
          ENTITY_USER_COMPLETE_FIXTURE,
          ENTITY_USER_COMPLETE_FIXTURE.id,
        ),
      ).toEqual({
        id: ENTITY_USER_COMPLETE_FIXTURE.id,
        cpf: ENTITY_USER_COMPLETE_FIXTURE.cpf,
        role: ENTITY_USER_COMPLETE_FIXTURE.role,
        name: ENTITY_USER_COMPLETE_FIXTURE.name,
        email: ENTITY_USER_COMPLETE_FIXTURE.email,
        status: ENTITY_USER_COMPLETE_FIXTURE.status,
        gender: ENTITY_USER_COMPLETE_FIXTURE.gender,
        whatsapp: ENTITY_USER_COMPLETE_FIXTURE.whatsapp,
        date_of_birth: ENTITY_USER_COMPLETE_FIXTURE.date_of_birth,
        created_at: ENTITY_USER_COMPLETE_FIXTURE.created_at,
        updated_at: ENTITY_USER_COMPLETE_FIXTURE.updated_at,
      });
    });
  });

  describe('me', () => {
    it('should be able to find user', async () => {
      jest.spyOn(service, 'me').mockResolvedValueOnce({
        id: ENTITY_USER_COMPLETE_FIXTURE.id,
        cpf: ENTITY_USER_COMPLETE_FIXTURE.cpf,
        role: ENTITY_USER_COMPLETE_FIXTURE.role,
        name: ENTITY_USER_COMPLETE_FIXTURE.name,
        email: ENTITY_USER_COMPLETE_FIXTURE.email,
        status: ENTITY_USER_COMPLETE_FIXTURE.status,
        gender: ENTITY_USER_COMPLETE_FIXTURE.gender,
        whatsapp: ENTITY_USER_COMPLETE_FIXTURE.whatsapp,
        date_of_birth: ENTITY_USER_COMPLETE_FIXTURE.date_of_birth,
        created_at: ENTITY_USER_COMPLETE_FIXTURE.created_at,
        updated_at: ENTITY_USER_COMPLETE_FIXTURE.updated_at,
        deleted_at: ENTITY_USER_COMPLETE_FIXTURE.deleted_at,
      });

      expect(await controller.getMe(ENTITY_USER_COMPLETE_FIXTURE)).toEqual({
        id: ENTITY_USER_COMPLETE_FIXTURE.id,
        cpf: ENTITY_USER_COMPLETE_FIXTURE.cpf,
        role: ENTITY_USER_COMPLETE_FIXTURE.role,
        name: ENTITY_USER_COMPLETE_FIXTURE.name,
        email: ENTITY_USER_COMPLETE_FIXTURE.email,
        status: ENTITY_USER_COMPLETE_FIXTURE.status,
        gender: ENTITY_USER_COMPLETE_FIXTURE.gender,
        whatsapp: ENTITY_USER_COMPLETE_FIXTURE.whatsapp,
        date_of_birth: ENTITY_USER_COMPLETE_FIXTURE.date_of_birth,
        created_at: ENTITY_USER_COMPLETE_FIXTURE.created_at,
        updated_at: ENTITY_USER_COMPLETE_FIXTURE.updated_at,
      });
    });
  });
});
