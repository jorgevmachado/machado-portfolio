import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import cookies from './cookies';

describe('cookies methods', () => {
  const documentMock = {
    cookie: 'accessToken=123; ',
  };

  const domain = '.host.com.br';

  beforeEach(() => {
    jest.clearAllMocks();
    jest.restoreAllMocks();
    Object.defineProperty(global, 'document', {
      value: documentMock,
      writable: true,
    });
  });

  afterEach(() => {
    jest.resetModules();
    Object.defineProperty(global, 'document', { value: undefined });
  });

  describe('get', () => {
    it('returns correct cookie', () => {
      Object.defineProperty(global, 'document', { value: documentMock });
      expect(cookies.get('accessToken')).toBe('123');
    });
  });

  describe('set', () => {
    it('set cookie', () => {
      Object.defineProperty(global, 'document', { value: documentMock });
      const date = new Date();
      date.setTime(date.getTime() + 365 * 24 * 60 * 60 * 1000);
      expect(cookies.set('accessToken', '123', domain)).toEqual(
        `accessToken=123; expires=${date.toUTCString()}; path=/; domain=${domain}`,
      );
    });
  });

  describe('remove', () => {
    it('remove cookie', () => {
      Object.defineProperty(global, 'document', { value: documentMock });
      expect(cookies.remove('accessToken', domain)).toEqual(
        `accessToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain}`,
      );
    });
  });
});
