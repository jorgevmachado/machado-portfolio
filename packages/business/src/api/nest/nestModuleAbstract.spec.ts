import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { NestModuleAbstract } from './nestModuleAbstract';
import { Paginate } from '../../paginate';
import type { INestModuleConfig } from './interface';

jest.mock('@repo/services/http/http'); // Mock da classe base Http

interface MockEntity {
  id: string;
  name: string;
}

type MockEntityParams = Omit<MockEntity, 'id'>;

class MockModule extends NestModuleAbstract<
  MockEntity,
  MockEntityParams,
  MockEntityParams
> {
  constructor(nestModuleConfig: INestModuleConfig) {
    super('/mock-path', nestModuleConfig);
  }
}

describe('NestModuleAbstract', () => {
  const mockBaseUrl = 'http://mock-base-url.com';
  const mockHeaders = { Authorization: 'Bearer test-token' };
  const mockConfig: INestModuleConfig = {
    baseUrl: mockBaseUrl,
    headers: mockHeaders,
  };

  let mockModule: MockModule;

  beforeEach(() => {
    mockModule = new MockModule(mockConfig);
    jest.clearAllMocks();
  });

  it('should call get with correct URL and parameters for getAll', async () => {
    const mockedGet = jest.spyOn(mockModule, 'get').mockResolvedValue(
      new Paginate<MockEntity>(
        1,
        10,
        1,
        [{ id: '1', name: 'Example' }], // results
      ),
    );

    const queryParams = { search: 'test', page: 1 };
    const result = await mockModule.getAll(queryParams);

    expect(mockedGet).toHaveBeenCalledTimes(1);
    expect(mockedGet).toHaveBeenCalledWith('/mock-path', {
      params: queryParams,
    });
    expect(result).toBeInstanceOf(Paginate);
  });

  it('should call get with correct URL for getOne', async () => {
    const mockedGet = jest
      .spyOn(mockModule, 'get')
      .mockResolvedValue({ id: '1', name: 'Example' });

    const mockId = '1';
    const result = await mockModule.getOne(mockId);

    expect(mockedGet).toHaveBeenCalledTimes(1);
    expect(mockedGet).toHaveBeenCalledWith('/mock-path/1');
    expect(result).toEqual({ id: '1', name: 'Example' });
  });

  it('should call remove with correct URL for delete', async () => {
    const mockedRemove = jest
      .spyOn(mockModule, 'remove')
      .mockResolvedValue({ success: true });

    const mockId = '1';
    const result = await mockModule.delete(mockId);

    expect(mockedRemove).toHaveBeenCalledTimes(1);
    expect(mockedRemove).toHaveBeenCalledWith('/mock-path/1');
    expect(result).toEqual({ success: true });
  });

  it('should call post with correct URL and body for create', async () => {
    const mockedPost = jest
      .spyOn(mockModule, 'post')
      .mockResolvedValue({ success: true });

    const mockBody = { id: '1', name: 'New Entity' };
    const result = await mockModule.create(mockBody);

    expect(mockedPost).toHaveBeenCalledTimes(1);
    expect(mockedPost).toHaveBeenCalledWith('/mock-path', { body: mockBody });
    expect(result).toEqual({ success: true });
  });

  it('should call path with correct URL and body for update', async () => {
    const mockedPath = jest
      .spyOn(mockModule, 'path')
      .mockResolvedValue({ success: true });

    const mockId = '1';
    const mockBody = { name: 'Updated Entity' };
    const result = await mockModule.update(mockId, mockBody);

    expect(mockedPath).toHaveBeenCalledTimes(1);
    expect(mockedPath).toHaveBeenCalledWith('/mock-path/1', { body: mockBody });
    expect(result).toEqual({ success: true });
  });
});