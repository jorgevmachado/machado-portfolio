import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import User from './user';
import { cleanFormatter, validateMobile } from './config';
import type { UserConstructorParams } from './interface';
import { EGender, ERole, EStatus } from '../shared';

jest.mock('./config');

describe('User Class', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockUserConstructorParams: UserConstructorParams = {
    id: 'eaca4c08-e62d-495a-ae1c-918199da8d52',
    cpf: '123.456.789-09',
    role: ERole.USER,
    name: 'Test User',
    email: 'testuser@example.com',
    clean: false,
    gender: EGender.MALE,
    status: EStatus.ACTIVE,
    whatsapp: '(11) 99456-7890',
    date_of_birth: new Date('2000-01-01'),
    cleanAllFormatter: true,
  };
  const mockPhoneFormatted: string = '11994567890';
  const mockCpfFormatted: string = '12345678909';

  describe('constructor', () => {
    it('should create a User object with the given parameters', () => {
      (cleanFormatter as jest.Mock).mockImplementation((value) => value);
      (validateMobile as jest.Mock).mockImplementation((value) => value);

      const user = new User({
        cpf: mockUserConstructorParams.cpf,
        role: mockUserConstructorParams.role,
        name: mockUserConstructorParams.name,
        email: mockUserConstructorParams.email,
        gender: mockUserConstructorParams.gender,
        status: mockUserConstructorParams.status,
        whatsapp: mockUserConstructorParams.whatsapp,
        date_of_birth: mockUserConstructorParams.date_of_birth,
      });

      expect(user.id).toBeUndefined();
      expect(user.cpf).toBe(mockUserConstructorParams.cpf);
      expect(user.role).toBe(mockUserConstructorParams.role);
      expect(user.name).toBe(mockUserConstructorParams.name);
      expect(user.email).toBe(mockUserConstructorParams.email);
      expect(user.gender).toBe(mockUserConstructorParams.gender);
      expect(user.status).toBe(mockUserConstructorParams.status);
      expect(user.whatsapp).toBe(mockUserConstructorParams.whatsapp);
      expect(user.date_of_birth).toBe(mockUserConstructorParams.date_of_birth);

      expect(cleanFormatter).toHaveBeenCalledWith(
        mockUserConstructorParams.cpf,
        true,
      );
      expect(validateMobile).toHaveBeenCalledWith(
        mockUserConstructorParams.whatsapp,
        true,
      );
    });

    it('should create a User with default values if parameters are not provided', () => {
      const user = new User();

      expect(user.id).toBeUndefined();
      expect(user.cpf).toBeUndefined();
      expect(user.role).toBe(mockUserConstructorParams.role);
      expect(user.name).toBeUndefined();
      expect(user.email).toBeUndefined();
      expect(user.gender).toBeUndefined();
      expect(user.status).toBe(mockUserConstructorParams.status);
      expect(user.whatsapp).toBeUndefined();
      expect(user.date_of_birth).toBeUndefined();
    });

    it('should call cleanFormatter and validateMobile correctly when clearing values', () => {
      (cleanFormatter as jest.Mock).mockImplementation(() => mockCpfFormatted);
      (validateMobile as jest.Mock).mockImplementation(
        () => mockPhoneFormatted,
      );

      const user = new User({
        ...mockUserConstructorParams,
        cleanAllFormatter: false,
      });

      expect(user.cpf).toBe(mockCpfFormatted);
      expect(user.whatsapp).toBe(mockPhoneFormatted);
      expect(cleanFormatter).toHaveBeenCalledWith(
        mockUserConstructorParams.cpf,
        false,
      );
      expect(validateMobile).toHaveBeenCalledWith(
        mockUserConstructorParams.whatsapp,
        false,
      );
    });

    it('should not clear salt, password, and tokens when clean is false', () => {
      const mockParams: UserConstructorParams = {
        ...mockUserConstructorParams,
        salt: 'randomSalt',
        clean: false,
        password: 'hashedPassword',
        recover_token: 'recoveryToken',
        confirmation_token: 'confirmationToken',
      };

      const user = new User(mockParams);

      expect(user.salt).toBe(mockParams.salt);
      expect(user.password).toBe(mockParams.password);
      expect(user.recover_token).toBe(mockParams.recover_token);
      expect(user.confirmation_token).toBe(mockParams.confirmation_token);
    });

    it('should not include salt, password, or tokens when clean is true', () => {
      const mockParams: UserConstructorParams = {
        ...mockUserConstructorParams,
        salt: 'randomSalt',
        clean: true,
        password: 'hashedPassword',
        recover_token: 'recoveryToken',
        confirmation_token: 'confirmationToken',
      };

      const user = new User(mockParams);

      expect(user.salt).toBeUndefined();
      expect(user.password).toBeUndefined();
      expect(user.recover_token).toBeUndefined();
      expect(user.confirmation_token).toBeUndefined();
    });
  });
});