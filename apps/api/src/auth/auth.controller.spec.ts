import { Test, TestingModule } from '@nestjs/testing';
import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { ERole } from '@repo/business/shared/enum';

import { ENTITY_USER_FIXTURE, USER_PASSWORD } from '@repo/mock/auth/fixture';

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
          cpf: ENTITY_USER_FIXTURE.cpf,
          name: ENTITY_USER_FIXTURE.name,
          email: ENTITY_USER_FIXTURE.email,
          whatsapp: ENTITY_USER_FIXTURE.whatsapp,
          password: ENTITY_USER_FIXTURE.password,
          date_of_birth: ENTITY_USER_FIXTURE.date_of_birth,
          password_confirmation: ENTITY_USER_FIXTURE.password,
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
          email: ENTITY_USER_FIXTURE.email,
          password: USER_PASSWORD,
        }),
      ).toEqual({ token: 'token', message: 'Authentication Successfully!' });
    });
  });

  describe('findOne', () => {
    it('should be able to find user', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValueOnce({
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
        deleted_at: ENTITY_USER_FIXTURE.deleted_at,
      });

      expect(
        await controller.findOne(ENTITY_USER_FIXTURE, ENTITY_USER_FIXTURE.id),
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
    it('should be able to find user', async () => {
      jest.spyOn(service, 'me').mockResolvedValueOnce({
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
        deleted_at: ENTITY_USER_FIXTURE.deleted_at,
      });

      expect(await controller.getMe(ENTITY_USER_FIXTURE)).toEqual({
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

  describe('seed', () => {
    it('should be able to seed database', async () => {
      jest.spyOn(service, 'seed').mockResolvedValueOnce({
        id: ENTITY_USER_FIXTURE.id,
        cpf: ENTITY_USER_FIXTURE.cpf,
        role: ERole.ADMIN,
        name: ENTITY_USER_FIXTURE.name,
        email: ENTITY_USER_FIXTURE.email,
        status: ENTITY_USER_FIXTURE.status,
        gender: ENTITY_USER_FIXTURE.gender,
        whatsapp: ENTITY_USER_FIXTURE.whatsapp,
        date_of_birth: ENTITY_USER_FIXTURE.date_of_birth,
        created_at: ENTITY_USER_FIXTURE.created_at,
        updated_at: ENTITY_USER_FIXTURE.updated_at,
        deleted_at: ENTITY_USER_FIXTURE.deleted_at,
      });

      expect(await controller.seed()).toEqual({
        id: ENTITY_USER_FIXTURE.id,
        cpf: ENTITY_USER_FIXTURE.cpf,
        role: ERole.ADMIN,
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

  describe('promoteUser', () => {
    it('should be able to promote user', async () => {
      jest.spyOn(service, 'promoteUser').mockResolvedValueOnce({
        user: {
          id: ENTITY_USER_FIXTURE.id,
          cpf: ENTITY_USER_FIXTURE.cpf,
          role: ERole.ADMIN,
          name: ENTITY_USER_FIXTURE.name,
          email: ENTITY_USER_FIXTURE.email,
          status: ENTITY_USER_FIXTURE.status,
          gender: ENTITY_USER_FIXTURE.gender,
          whatsapp: ENTITY_USER_FIXTURE.whatsapp,
          date_of_birth: ENTITY_USER_FIXTURE.date_of_birth,
          created_at: ENTITY_USER_FIXTURE.created_at,
          updated_at: ENTITY_USER_FIXTURE.updated_at,
          deleted_at: ENTITY_USER_FIXTURE.deleted_at,
        },
        valid: true,
        message: 'User promoted successfully!',
      });

      expect(
        await controller.promoteUser(ENTITY_USER_FIXTURE.id, {
          ...ENTITY_USER_FIXTURE,
          role: ERole.ADMIN,
        }),
      ).toEqual({
        user: {
          id: ENTITY_USER_FIXTURE.id,
          cpf: ENTITY_USER_FIXTURE.cpf,
          role: ERole.ADMIN,
          name: ENTITY_USER_FIXTURE.name,
          email: ENTITY_USER_FIXTURE.email,
          status: ENTITY_USER_FIXTURE.status,
          gender: ENTITY_USER_FIXTURE.gender,
          whatsapp: ENTITY_USER_FIXTURE.whatsapp,
          date_of_birth: ENTITY_USER_FIXTURE.date_of_birth,
          created_at: ENTITY_USER_FIXTURE.created_at,
          updated_at: ENTITY_USER_FIXTURE.updated_at,
          deleted_at: ENTITY_USER_FIXTURE.deleted_at,
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
          ENTITY_USER_FIXTURE.id,
          {
            name: 'Demi Moore',
            date_of_birth: new Date('2000-01-01'),
          },
          ENTITY_USER_FIXTURE,
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
              ENTITY_USER_FIXTURE.id,
              mockFile,
              ENTITY_USER_FIXTURE,
          ),
      ).toEqual({ message: 'File uploaded successfully!' });
    });
  })
});
