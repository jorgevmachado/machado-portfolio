import { afterEach, beforeEach, describe, expect, it, jest } from '@jest/globals';

import { transformDateStringInDate } from '@repo/services/entities/entities';

import { Nest } from '../api';

import { AuthService } from './service';

import type { SignInParams, SignUpParams, UpdateParams, UserEntity } from './interface';
import { USER_ENTITY_FIXTURE } from './fixtures';


describe('AuthService', () => {
  let authService: AuthService;
  let mockNest: jest.Mocked<Nest>;

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.resetModules();
  });

  const mockUser: UserEntity = USER_ENTITY_FIXTURE;
  const mockPassword: string = 'testPassword';
  const mockResponseError = { message: 'Internal Server Error' };
  const mockResponseNotFound = { message: 'Not Found' };

  beforeEach(() => {
    mockNest = {
      auth: {
        me: jest.fn(),
        signUp: jest.fn(),
        signIn: jest.fn(),
        getOne: jest.fn(),
        updateAuth: jest.fn(),
        uploadPicture: jest.fn(),

      },
    } as unknown as jest.Mocked<Nest>;

    authService = new AuthService(mockNest);
  });

  describe('signUp', () => {
    const mockSignUpParams: SignUpParams = {
      cpf: mockUser.cpf,
      name: mockUser.name,
      email: mockUser.email,
      gender: mockUser.gender,
      password: mockPassword,
      whatsapp: mockUser.whatsapp,
      date_of_birth: mockUser.date_of_birth,
      password_confirmation: mockPassword,
    };
    it('should return success message when registering', async () => {
      const mockResponse = { message: 'Registration Completed Successfully!' };

      mockNest.auth.signUp.mockResolvedValue(mockResponse);

      const result = await authService.signUp(mockSignUpParams);
      expect(result).toBe(mockResponse.message);
      expect(mockNest.auth.signUp).toHaveBeenCalledTimes(1);
      expect(mockNest.auth.signUp).toHaveBeenCalledWith(mockSignUpParams);
    });

    it('should throw error when registration fails', async () => {
      mockNest.auth.signUp.mockRejectedValue(
        new Error(mockResponseError.message),
      );
      await expect(authService.signUp(mockSignUpParams)).rejects.toThrow(
        mockResponseError.message,
      );

      expect(mockNest.auth.signUp).toHaveBeenCalledTimes(1);
      expect(mockNest.auth.signUp).toHaveBeenCalledWith(mockSignUpParams);
    });
  });

  describe('signIn', () => {
    const mockSignInParams: SignInParams = {
      email: mockUser.email,
      password: mockPassword,
    };
    it('should return token when logging in', async () => {
      const mockResponse = { token: 'abc123' };

      mockNest.auth.signIn.mockResolvedValue(mockResponse);

      const result = await authService.signIn(mockSignInParams);
      expect(result).toBe(mockResponse.token);
      expect(mockNest.auth.signIn).toHaveBeenCalledTimes(1);
      expect(mockNest.auth.signIn).toHaveBeenCalledWith(mockSignInParams);
    });

    it('should throw error when login fails', async () => {
      mockNest.auth.signIn.mockRejectedValue(
        new Error(mockResponseError.message),
      );
      await expect(authService.signIn(mockSignInParams)).rejects.toThrow(
        mockResponseError.message,
      );

      expect(mockNest.auth.signIn).toHaveBeenCalledTimes(1);
      expect(mockNest.auth.signIn).toHaveBeenCalledWith(mockSignInParams);
    });
  });

  describe('get', () => {
    it('should return a user when searching by id', async () => {
      mockNest.auth.getOne.mockResolvedValue(mockUser);

      const result = await authService.get(mockUser.id);
      expect(result).toEqual(transformDateStringInDate(mockUser));
      expect(mockNest.auth.getOne).toHaveBeenCalledTimes(1);
      expect(mockNest.auth.getOne).toHaveBeenCalledWith(mockUser.id);
    });

    it('should throw error when userid not found', async () => {
      mockNest.auth.getOne.mockRejectedValue(
        new Error(mockResponseNotFound.message),
      );

      await expect(authService.get(mockUser.id)).rejects.toThrow(
        mockResponseNotFound.message,
      );
      expect(mockNest.auth.getOne).toHaveBeenCalledTimes(1);
      expect(mockNest.auth.getOne).toHaveBeenCalledWith(mockUser.id);
    });
  });

  describe('me', () => {
    it('should return the current user', async () => {
      mockNest.auth.me.mockResolvedValue(mockUser);

      const result = await authService.me();
      expect(result).toEqual(transformDateStringInDate(mockUser));
      expect(mockNest.auth.me).toHaveBeenCalledTimes(1);
    });

    it('should throw error when failing to fetch current user', async () => {
      mockNest.auth.me.mockRejectedValue(new Error(mockResponseError.message));

      await expect(authService.me()).rejects.toThrow(mockResponseError.message);
      expect(mockNest.auth.me).toHaveBeenCalledTimes(1);
    });
  });

  describe('update', () => {
    const mockUpdateParams: UpdateParams = {
      id: mockUser.id,
      role: mockUser.role,
      name: mockUser.name,
      gender: mockUser.gender,
      status: mockUser.status,
      date_of_birth: mockUser.date_of_birth,
    };
    it('should return success message when updating user', async () => {
      const mockResponse = { message: 'Update Successfully!' };
      mockNest.auth.updateAuth.mockResolvedValue(mockResponse);
      const result = await authService.update(mockUpdateParams);
      expect(mockNest.auth.updateAuth).toHaveBeenCalledTimes(1);
      expect(mockNest.auth.updateAuth).toHaveBeenCalledWith(mockUpdateParams);
      expect(result).toBe(mockResponse.message);
    });
  });

  describe('upload', () => {
    const mockFile = new File(['test'], 'test.png', { type: 'image/png' });
    it('should return success message when upload picture', async () => {
      const mockResponse = { message: 'File uploaded successfully!' };
      mockNest.auth.uploadPicture.mockResolvedValue(mockResponse);
      const result = await authService.upload(mockFile);
      expect(mockNest.auth.uploadPicture).toHaveBeenCalledTimes(1);
      expect(mockNest.auth.uploadPicture).toHaveBeenCalledWith(mockFile);
      expect(result).toBe(mockResponse.message);
    });
  });
});