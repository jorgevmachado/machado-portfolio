import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { ERole } from '@repo/business/shared/enum';

import { USER_ENTITY_FIXTURE, USER_PASSWORD } from '@repo/business/auth/fixtures/auth';

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
            seed: jest.fn(),
            signUp: jest.fn(),
            signIn: jest.fn(),
            update: jest.fn(),
            upload: jest.fn(),
            findOne: jest.fn(),
            promoteUser: jest.fn(),
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
          cpf: USER_ENTITY_FIXTURE.cpf,
          name: USER_ENTITY_FIXTURE.name,
          email: USER_ENTITY_FIXTURE.email,
          whatsapp: USER_ENTITY_FIXTURE.whatsapp,
          password: USER_ENTITY_FIXTURE.password,
          date_of_birth: USER_ENTITY_FIXTURE.date_of_birth,
          password_confirmation: USER_ENTITY_FIXTURE.password,
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
          email: USER_ENTITY_FIXTURE.email,
          password: USER_PASSWORD,
        }),
      ).toEqual({ token: 'token', message: 'Authentication Successfully!' });
    });
  });

  describe('findOne', () => {
    it('should be able to find user', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce({
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
        deleted_at: USER_ENTITY_FIXTURE.deleted_at,
      });

      expect(
        await controller.findOne(USER_ENTITY_FIXTURE, USER_ENTITY_FIXTURE.id),
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
      });
    });
  });

  describe('me', () => {
    it('should be able to find user', async () => {
      jest.spyOn(service, 'me').mockResolvedValueOnce({
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
        deleted_at: USER_ENTITY_FIXTURE.deleted_at,
      });

      expect(await controller.getMe(USER_ENTITY_FIXTURE)).toEqual({
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
      });
    });
  });

  describe('seed', () => {
    it('should be able to seed database', async () => {
      jest.spyOn(service, 'seed').mockResolvedValueOnce({
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
        deleted_at: USER_ENTITY_FIXTURE.deleted_at,
      });

      expect(await controller.seed()).toEqual({
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
      });
    });
  });

  describe('promoteUser', () => {
    it('should be able to promote user', async () => {
      jest.spyOn(service, 'promoteUser').mockResolvedValueOnce({
        user: {
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
          deleted_at: USER_ENTITY_FIXTURE.deleted_at,
        },
        valid: true,
        message: 'User promoted successfully!',
      });

      expect(
        await controller.promoteUser(USER_ENTITY_FIXTURE.id, {
          ...USER_ENTITY_FIXTURE,
          role: ERole.ADMIN,
        }),
      ).toEqual({
        user: {
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
          deleted_at: USER_ENTITY_FIXTURE.deleted_at,
        },
        valid: true,
        message: 'User promoted successfully!',
      });
    });
  });

  describe('update', () => {
    it('should be able to update user', async () => {
      jest.spyOn(service, 'update').mockResolvedValueOnce({
        message: 'Update Successfully!',
      });

      expect(
        await controller.update(
          USER_ENTITY_FIXTURE.id,
          {
            name: 'Demi Moore',
            date_of_birth: new Date('2000-01-01'),
          },
          USER_ENTITY_FIXTURE,
        ),
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
    it('should be able to upload file', async () => {
      jest.spyOn(service, 'upload').mockResolvedValueOnce({
        message: 'File uploaded successfully!',
      });
      expect(
          await controller.upload(
              USER_ENTITY_FIXTURE.id,
              mockFile,
              USER_ENTITY_FIXTURE,
          ),
      ).toEqual({ message: 'File uploaded successfully!' });
    });
  })
});
