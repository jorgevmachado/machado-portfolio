import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { ConflictException } from '@nestjs/common';
import { Validate } from './validate';

describe('Validate', () => {
  let validate: Validate;

  beforeEach(() => {
    jest.clearAllMocks();
    validate = new Validate();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('mock', () => {
    it('should throw ConflictException if param is provided', () => {
      expect(() => {
        validate.mock('123', 'id', 'TestLabel');
      }).toThrow(ConflictException);
      expect(() => {
        validate.mock('123', 'id', 'TestLabel');
      }).toThrow(
        'The selected id 123 is repeated in TestLabel, try another one or update this.',
      );
    });

    it('should not throw if param is undefined', () => {
      expect(() => {
        validate.mock(undefined, 'id', 'TestLabel');
      }).not.toThrow();
    });

    it('should not throw if param is null', () => {
      expect(() => {
        validate.mock(null as any, 'id', 'TestLabel');
      }).not.toThrow();
    });
  });

  describe('listMock', () => {
    it('should throw ConflictException if there are repeated ids in the list', () => {
      const mockList = [
        { id: '1', name: 'Entity1' },
        { id: '1', name: 'Entity2' },
      ];
      expect(() => {
        validate.listMock({
          key: 'id',
          list: mockList,
          label: 'EntityList',
        });
      }).toThrow(ConflictException);
      expect(() => {
        validate.listMock({
          key: 'id',
          list: mockList,
          label: 'EntityList',
        });
      }).toThrow(
        'The selected id 1 is repeated in EntityList, try another one or update this.',
      );
    });

    it('should throw ConflictException if there are repeated names in the list', () => {
      const mockList = [
        { id: '1', name: 'Entity1' },
        { id: '2', name: 'Entity1' },
      ];
      expect(() => {
        validate.listMock({
          key: 'name',
          list: mockList,
          label: 'EntityList',
        });
      }).toThrow(ConflictException);
      expect(() => {
        validate.listMock({
          key: 'name',
          list: mockList,
          label: 'EntityList',
        });
      }).toThrow(
        'The selected name Entity1 is repeated in EntityList, try another one or update this.',
      );
    });

    it('should not throw if there are no repeated ids or names', () => {
      const mockList = [
        { id: '1', name: 'Entity1' },
        { id: '2', name: 'Entity2' },
      ];
      expect(() => {
        validate.listMock({
          key: 'all',
          list: mockList,
          label: 'EntityList',
        });
      }).not.toThrow();
    });

    it('should not throw if key is undefined and list is empty', () => {
      const mockList: any[] = [];
      expect(() => {
        validate.listMock({
          key: undefined as any,
          list: mockList,
          label: 'EmptyList',
        });
      }).not.toThrow();
    });
  });

  describe('paramIsEntity', () => {
    it('should return true if the value has an "id" property', () => {
      expect(validate.paramIsEntity({ id: '123', name: 'Test' })).toBe(true);
    });

    it('should return false if the value does not have an "id" property', () => {
      expect(validate.paramIsEntity({ name: 'Test' })).toBe(false);
    });

    it('should return false if the value is null', () => {
      expect(validate.paramIsEntity(null)).toBe(false);
    });

    it('should return false if the value is undefined', () => {
      expect(validate.paramIsEntity(undefined)).toBe(false);
    });

    it('should return false if the value is not an object', () => {
      expect(validate.paramIsEntity('test')).toBe(false);
      expect(validate.paramIsEntity(123)).toBe(false);
      expect(validate.paramIsEntity(true)).toBe(false);
    });
  });

  describe('param', () => {
    it('should throw ConflictException if value is undefined', () => {
      expect(() => {
        validate.param(undefined, 'TestField');
      }).toThrow(ConflictException);
      expect(() => {
        validate.param(undefined, 'TestField');
      }).toThrow(
        'The selected TestField does not exist, try another one or create one.',
      );
    });

    it('should throw ConflictException if value is null', () => {
      expect(() => {
        validate.param(null as any, 'TestField');
      }).toThrow(ConflictException);
      expect(() => {
        validate.param(null as any, 'TestField');
      }).toThrow(
        'The selected TestField does not exist, try another one or create one.',
      );
    });

    it('should not throw if value is valid', () => {
      expect(() => {
        validate.param('validValue', 'TestField');
      }).not.toThrow();
    });

    it('should throw ConflictException with default label if label is not provided', () => {
      expect(() => {
        validate.param(undefined, undefined);
      }).toThrow(ConflictException);
      expect(() => {
        validate.param(undefined, undefined);
      }).toThrow(
        'The selected field does not exist, try another one or create one.',
      );
    });
  });
});
