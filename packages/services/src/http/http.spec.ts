import { describe, expect, it } from '@jest/globals';

import { Http } from './http';

class HttpMock extends Http {
  constructor(url: string, config: RequestInit) {
    super(url, config);
  }

  public async getMock(): Promise<{ mock: string }> {
    return this.get('mock');
  }

  public async pathMock(): Promise<{ mock: string }> {
    return this.path('mock', { body: { path: 'mock' } });
  }

  public async postMock(): Promise<{ mock: string }> {
    return this.post('mock', { body: { post: 'mock' } });
  }

  public async removeMock(): Promise<{ mock: string }> {
    return this.remove('mock');
  }
}

describe('http', () => {
  const url = 'http://localhost:8080';
  const config = { method: 'GET' };
  const http = new HttpMock(url, config);

  describe('url', () => {
    it('should return the correct url', () => {
      expect(http.url).toEqual(url);
    });
  });

  describe('config', () => {
    it('should return the correct url', () => {
      expect(http.config).toEqual(config);
    });
  });
});
