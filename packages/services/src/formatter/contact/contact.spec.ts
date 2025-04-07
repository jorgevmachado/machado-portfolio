import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { mobileFormatter, phoneFormatter } from './contact';

describe('contact formatter methods', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.resetModules();
  });
  describe('phoneFormatter', () => {
    it('should return a formatted phone number when the string is received', () => {
      expect(phoneFormatter('00000000000')).toEqual('(00) 00000-0000');
    });

    it('should return an empty string phone number when string is not received', () => {
      expect(phoneFormatter()).toEqual('');
    });
  });

  describe('mobileFormatter', () => {
    it('should return a formatted mobile phone number when the string is received', () => {
      expect(mobileFormatter('00000000000')).toEqual('(00) 00000-0000');
    });

    it('should return an empty string mobile phone number when string is not received', () => {
      expect(mobileFormatter()).toEqual('');
    });
  });
});
