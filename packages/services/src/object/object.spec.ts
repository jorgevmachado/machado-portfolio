import { describe, expect, it } from '@jest/globals';

import { isObject, serialize } from './object';

describe('Object functions', () => {
  const customObject = { userId: 1, fullName: 'Text' };

  describe('serialize', () => {
    it('should return serialized string when received only one value', () => {
      expect(serialize({ name: 'your_name' })).toEqual('name=your_name');
    });

    it('should return serialized string when received multiples values', () => {
      const data = { name: 'your_name', lastname: 'your_lastname' };
      expect(serialize(data)).toEqual('name=your_name&lastname=your_lastname');
    });

    it('should return undefined when received empty object', () => {
      expect(serialize({})).toEqual(undefined);
    });
  });

  describe('isObject', () => {
    it('should return true when param is a object', () => {
      expect(isObject(customObject)).toBeTruthy();
    });

    it('should return false when param is not a valid object', () => {
      expect(isObject('not-object')).toBeFalsy();
    });
  });
});
