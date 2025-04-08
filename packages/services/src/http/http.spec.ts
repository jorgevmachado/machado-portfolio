import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';

import { Http } from './http';

class HttpMock extends Http {
  constructor(url: string, config: RequestInit) {
    super(url, config);
  }

  public async getMock(): Promise<{ mock: string }> {
    return this.get('mock', {
      override: { headers: { 'Content-Type': 'application/json' } },
    });
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
  let http: HttpMock;

  beforeEach(() => {
    http = new HttpMock(url, config);
    jest.clearAllMocks();
    jest.restoreAllMocks();
  });

  afterEach(() => {
    jest.resetModules();
  });

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

  describe('get', () => {
    it('should perform a GET request and return data.', async () => {
      const mockResponse = new Response(
        JSON.stringify({ data: 'mocked-get-response' }),
        {
          status: 200,
          statusText: 'OK',
          headers: { 'Content-Type': 'application/json' },
        },
      );
      global.fetch = jest.fn((input: RequestInfo | URL, init?: RequestInit) =>
        Promise.resolve(mockResponse),
      ) as jest.MockedFunction<
        (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
      >;

      const result = await http.getMock();
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8080/mock',
        expect.objectContaining({ method: 'GET' }),
      );
      expect(result).toEqual({ data: 'mocked-get-response' });
    });
  });

  describe('post', () => {
    it('should perform a POST request with body and return data', async () => {
      const mockResponse = new Response(
        JSON.stringify({ data: 'mocked-post-response' }),
        {
          status: 200,
          statusText: 'OK',
          headers: { 'Content-Type': 'application/json' },
        },
      );
      global.fetch = jest.fn((input: RequestInfo | URL, init?: RequestInit) =>
        Promise.resolve(mockResponse),
      ) as jest.MockedFunction<
        (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
      >;

      const result = await http.postMock();
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8080/mock',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ post: 'mock' }),
        }),
      );
      expect(result).toEqual({ data: 'mocked-post-response' });
    });

    it('should perform a POST request with FormData as body', async () => {
      const mockResponse = new Response(
        JSON.stringify({ data: 'mocked-post-response' }),
        {
          status: 200,
          statusText: 'OK',
          headers: { 'Content-Type': 'application/json' },
        },
      );

      global.fetch = jest.fn((input: RequestInfo | URL, init?: RequestInit) =>
        Promise.resolve(mockResponse),
      ) as jest.MockedFunction<
        (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
      >;

      const formData = new FormData();
      formData.append('key', 'value');

      await http.post('mock', { body: formData });

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8080/mock',
        expect.objectContaining({
          method: 'POST',
          body: formData,
        }),
      );
    });

    it('should throw an error when response.json() fails during handle processing', async () => {
      const mockResponse = new Response('', {
        status: 200,
        statusText: 'OK',
        headers: { 'Content-Type': 'application/json' },
      });

      jest.spyOn(mockResponse, 'json').mockImplementationOnce(() => {
        return Promise.reject(new Error('Failed to parse JSON'));
      });

      global.fetch = jest.fn(() =>
        Promise.resolve(mockResponse),
      ) as jest.MockedFunction<
        (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
      >;

      const result = await http.postMock();

      expect(result).toBeUndefined();

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8080/mock',
        expect.objectContaining({
          method: 'POST',
          body: JSON.stringify({ post: 'mock' }),
        }),
      );
    });
  });

  describe('path', () => {
    it('should perform a PUT request with body and return data', async () => {
      const mockResponse = new Response(
        JSON.stringify({ data: 'mocked-put-response' }),
        {
          status: 200,
          statusText: 'OK',
          headers: { 'Content-Type': 'application/json' },
        },
      );
      global.fetch = jest.fn((input: RequestInfo | URL, init?: RequestInit) =>
        Promise.resolve(mockResponse),
      ) as jest.MockedFunction<
        (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
      >;

      const result = await http.pathMock();
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8080/mock',
        expect.objectContaining({
          method: 'PUT',
          body: JSON.stringify({ path: 'mock' }),
        }),
      );
      expect(result).toEqual({ data: 'mocked-put-response' });
    });

    it('should perform a PUT request with FormData as body', async () => {
      const mockResponse = new Response(
        JSON.stringify({ data: 'mocked-put-response' }),
        {
          status: 200,
          statusText: 'OK',
          headers: { 'Content-Type': 'application/json' },
        },
      );

      global.fetch = jest.fn((input: RequestInfo | URL, init?: RequestInit) =>
        Promise.resolve(mockResponse),
      ) as jest.MockedFunction<
        (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
      >;

      const formData = new FormData();
      formData.append('key', 'value');

      await http.path('mock', { body: formData });

      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8080/mock',
        expect.objectContaining({
          method: 'PUT',
          body: formData,
        }),
      );
    });
  });

  describe('remove', () => {
    it('should perform a DELETE request and return data', async () => {
      const mockResponse = new Response(
        JSON.stringify({ data: 'mocked-delete-response' }),
        {
          status: 200,
          statusText: 'OK',
          headers: { 'Content-Type': 'application/json' },
        },
      );
      global.fetch = jest.fn((input: RequestInfo | URL, init?: RequestInit) =>
        Promise.resolve(mockResponse),
      ) as jest.MockedFunction<
        (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
      >;

      const result = await http.removeMock();
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8080/mock',
        expect.objectContaining({
          method: 'DELETE',
        }),
      );
      expect(result).toEqual({ data: 'mocked-delete-response' });
    });
  });

  describe('Error handling', () => {
    it('should throw an error when fetch fails', async () => {
      const expectedError = {
        error: 'bad Request',
        message: 'Something went wrong',
        statusCode: 400,
      };
      const mockResponse = new Response(JSON.stringify(expectedError), {
        status: 400,
        statusText: 'Bad Request',
        headers: { 'Content-Type': 'application/json' },
      });
      global.fetch = jest.fn((input: RequestInfo | URL, init?: RequestInit) =>
        Promise.resolve(mockResponse),
      ) as jest.MockedFunction<
        (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
      >;

      await expect(http.getMock()).rejects.toEqual(expectedError);
    });

    it('should throw an error for a failed HTTP response', async () => {
      const mockResponse = new Response(JSON.stringify({ status: 500 }), {
        status: 500,
        statusText: 'Internal Server Error',
        headers: { 'Content-Type': 'application/json' },
      });
      global.fetch = jest.fn((input: RequestInfo | URL, init?: RequestInit) =>
        Promise.resolve(mockResponse),
      ) as jest.MockedFunction<
        (input: RequestInfo | URL, init?: RequestInit) => Promise<Response>
      >;

      await expect(http.getMock()).rejects.toEqual({
        error: 'internal Server Error',
        message: 'Internal Server Error',
        statusCode: 500,
      });
    });
  });
});
