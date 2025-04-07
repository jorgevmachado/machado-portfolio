import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import { CallHandler, ExecutionContext } from '@nestjs/common';
import { of } from 'rxjs';

import { USER_ENTITY_FIXTURE } from '@repo/business/auth/fixtures/auth';
import UserBusiness from '@repo/business/auth/user';

import { SanitizeUserInterceptor } from './sanitize-user.interceptor';

describe('SanitizeUserInterceptor', () => {
  let interceptor: SanitizeUserInterceptor;
  const mockUser = USER_ENTITY_FIXTURE;

  beforeEach(() => {
    jest.clearAllMocks();
    interceptor = new SanitizeUserInterceptor();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('intercept', () => {
    it('should return the data unchanged if it is neither an object nor an array', (done) => {
      const mockCallHandler: CallHandler = {
        handle: jest.fn(() => of('testString')),
      };

      interceptor
        .intercept({} as ExecutionContext, mockCallHandler)
        .subscribe((result) => {
          expect(mockCallHandler.handle).toBeCalled();
          expect(result).toBe('testString');
          done();
        });
    });

    it('should sanitize a single object of type User', (done) => {
      const mockCallHandler: CallHandler = {
        handle: jest.fn(() => of(mockUser)),
      };

      interceptor
        .intercept({} as ExecutionContext, mockCallHandler)
        .subscribe((result) => {
          expect(mockCallHandler.handle).toBeCalled();
          expect(result).toBeInstanceOf(UserBusiness);
          expect(result).toEqual(
            new UserBusiness({ ...mockUser, clean: true }),
          );
          done();
        });
    });

    it('should sanitize a list of objects containing users', (done) => {
      const mockUsers = [mockUser, mockUser];
      const mockCallHandler: CallHandler = {
        handle: jest.fn(() => of(mockUsers)),
      };

      interceptor
        .intercept({} as ExecutionContext, mockCallHandler)
        .subscribe((result) => {
          expect(mockCallHandler.handle).toBeCalled();
          expect(result).toEqual([
            new UserBusiness({ ...mockUsers[0], clean: true }),
            new UserBusiness({ ...mockUsers[1], clean: true }),
          ]);
          done();
        });
    });

    it('should sanitize an object with `user` property', (done) => {
      const mockObjectWithUser = {
        id: 123,
        description: 'Some data',
        user: mockUser,
      };
      const mockCallHandler: CallHandler = {
        handle: jest.fn(() => of(mockObjectWithUser)),
      };

      interceptor
        .intercept({} as ExecutionContext, mockCallHandler)
        .subscribe((result) => {
          expect(mockCallHandler.handle).toBeCalled();
          expect(result).toEqual({
            id: 123,
            description: 'Some data',
            user: new UserBusiness({ ...mockObjectWithUser.user, clean: true }),
          });
          done();
        });
    });

    it('should avoid changes to objects unrelated to the user', (done) => {
      const mockData = { id: 123, description: 'Other object' };
      const mockCallHandler: CallHandler = {
        handle: jest.fn(() => of(mockData)),
      };

      interceptor
        .intercept({} as ExecutionContext, mockCallHandler)
        .subscribe((result) => {
          expect(mockCallHandler.handle).toBeCalled();
          expect(result).toEqual(mockData);
          done();
        });
    });

    it('should return an empty list if given an empty array', (done) => {
      const mockCallHandler: CallHandler = {
        handle: jest.fn(() => of([])),
      };

      interceptor
        .intercept({} as ExecutionContext, mockCallHandler)
        .subscribe((result) => {
          expect(mockCallHandler.handle).toBeCalled();
          expect(result).toEqual([]);
          done();
        });
    });
  });

  describe('sanitizeData', () => {
    it('should sanitize a User object in the sanitizeData method', () => {
      const result = interceptor['sanitizeData'](mockUser);

      expect(result).toEqual(new UserBusiness({ ...mockUser, clean: true }));
    });

    it('should sanitize an object containing the `user` property in the sanitizeData method', () => {
      const mockObjectWithUser = {
        id: 123,
        description: 'Some data',
        user: mockUser,
      };
      const result = interceptor['sanitizeData'](mockObjectWithUser);

      expect(result).toEqual({
        id: 123,
        description: 'Some data',
        user: new UserBusiness({
          ...mockObjectWithUser.user,
          clean: true,
        }),
      });
    });

    it('should return data not directly related', () => {
      const mockData = { id: 123, description: 'Test Data' };
      const result = interceptor['sanitizeData'](mockData);

      expect(result).toEqual(mockData);
    });
  });

  describe('private utilities', () => {
    it('should return true for an object with `user` property', () => {
      const mockObjectWithUser = { id: 123, user: {} };
      expect(interceptor['isObjectPropertyUser'](mockObjectWithUser)).toBe(
        true,
      );
    });

    it('should return false for an object without a `user` property', () => {
      const mockObjectWithoutUser = { id: 123 };
      expect(interceptor['isObjectPropertyUser'](mockObjectWithoutUser)).toBe(
        false,
      );
    });

    it('should return true for a User object containing a `password` property', () => {
      const mockUser = { id: 1, email: 'test@mail.com', password: 'secret' };
      expect(interceptor['isObjectUser'](mockUser)).toBe(true);
    });

    it('should return false for an object without the `password` property', () => {
      const mockInvalidUser = { id: 1, email: 'test@mail.com' };
      expect(interceptor['isObjectUser'](mockInvalidUser)).toBe(false);
    });
  });
});