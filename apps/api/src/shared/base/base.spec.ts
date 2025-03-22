import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { Base } from './base';

describe('Base Class', () => {
  let base: Base;

  beforeEach(() => {
    jest.clearAllMocks();
    base = new (class extends Base {})();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('error()', () => {
    it('should throw ConflictException when error code is 23505', () => {
      const mockError = { code: '23505', detail: 'User already exists' };

      expect(() => base.error(mockError)).toThrow(ConflictException);
      expect(() => base.error(mockError)).toThrow('User already exists');
    });

    it('should throw ConflictException with a default message when error code is 23505 and no detail exists', () => {
      const mockError = { code: '23505' };

      expect(() => base.error(mockError)).toThrow(ConflictException);
      expect(() => base.error(mockError)).toThrow('User already exists');
    });

    it('should throw ConflictException when error code is 22001', () => {
      const mockError = { code: '22001', detail: 'Field type error' };

      expect(() => base.error(mockError)).toThrow(ConflictException);
      expect(() => base.error(mockError)).toThrow('Field type error');
    });

    it('should throw ConflictException with a generic message when error code is 22001 and no detail exists', () => {
      const mockError = { code: '22001' };

      expect(() => base.error(mockError)).toThrow(ConflictException);
      expect(() => base.error(mockError)).toThrow('Field type error');
    });

    it('should throw InternalServerErrorException for missing error or status 500', () => {
      const mockError = { status: 500, message: 'Internal Error' };

      expect(() => base.error(mockError)).toThrow(InternalServerErrorException);
      expect(() => base.error(mockError)).toThrow('Internal Error');
    });

    it('should throw default InternalServerErrorException when no error is provided', () => {
      expect(() => base.error(undefined)).toThrow(InternalServerErrorException);
      expect(() => base.error(undefined)).toThrow('Internal Server Error 2025');
    });

    it('should return the error itself if it does not match any known criteria', () => {
      const mockError = { code: '12345', message: 'Unknown Error' };

      const result = base.error(mockError);
      expect(result).toBe(mockError);
    });
  });
});