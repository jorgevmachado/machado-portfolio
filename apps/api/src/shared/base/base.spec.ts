import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { beforeEach, describe, expect, it } from '@jest/globals';

import { Base } from './base';

describe('Base Class', () => {
  let base: Base;

  beforeEach(() => {
    base = new (class extends Base {})(); // Cria uma instância concreta da classe abstrata Base
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

  describe('paramIsEntity()', () => {
    it('should return true if value is an object and has an "id" property', () => {
      const entity = { id: 1, name: 'Test' };

      const result = base.paramIsEntity(entity);
      expect(result).toBe(true);
    });

    it('should return false if value is an object but does not have an "id" property', () => {
      const nonEntity = { name: 'Test' };

      const result = base.paramIsEntity(nonEntity);
      expect(result).toBe(false);
    });

    it('should return false if value is not an object', () => {
      const nonObjectValue = 'string';

      const result = base.paramIsEntity(nonObjectValue);
      expect(result).toBe(false);
    });
  });

  describe('validateParam()', () => {
    it('should throw ConflictException if value is falsy', () => {
      expect(() => base.validateParam(null, 'test field')).toThrow(
        ConflictException,
      );
      expect(() => base.validateParam(null, 'test field')).toThrow(
        'The selected test field does not exist, try another one or create one.',
      );
    });

    it('should throw ConflictException with default message if label is not provided', () => {
      expect(() => base.validateParam(null)).toThrow(ConflictException);
      expect(() => base.validateParam(null)).toThrow(
        'The selected field does not exist, try another one or create one.',
      );
    });

    it('should not throw any error if value is valid', () => {
      const validValue = '123';

      expect(() => base.validateParam(validValue, 'field')).not.toThrow();
    });
  });
});