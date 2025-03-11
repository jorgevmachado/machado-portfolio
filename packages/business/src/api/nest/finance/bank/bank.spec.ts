import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { QueryParameters } from '@repo/business/shared/interface';

import { NestModuleAbstract } from '../../nestModuleAbstract';

import { Bank } from './bank';

jest.mock('../../nestModuleAbstract');

describe('Bank', () => {
    const mockBaseUrl = 'http://mock-base-url.com';
    const mockHeaders = { Authorization: 'Bearer test-token' };
    const mockConfig = { baseUrl: mockBaseUrl, headers: mockHeaders };

    let bank: Bank;

    beforeEach(() => {
        jest.clearAllMocks();
        bank = new Bank(mockConfig);
    });

    describe('constructor', () => {
        it('should initialize with the correct path and config bank', () => {
            expect(NestModuleAbstract).toHaveBeenCalledTimes(1);
            expect(NestModuleAbstract).toHaveBeenCalledWith({
                pathUrl: 'finance/bank',
                nestModuleConfig: mockConfig,
            });
        });

        it('should call inherited methods from NestModuleAbstract about bank', async () => {
            const mockGetAll = jest
                .spyOn(NestModuleAbstract.prototype, 'getAll')
                .mockResolvedValue([]);

            const queryParams: QueryParameters = { name: 'test' };
            const result = await bank.getAll(queryParams);

            expect(mockGetAll).toHaveBeenCalledTimes(1);
            expect(mockGetAll).toHaveBeenCalledWith(queryParams);
            expect(result).toEqual([]);
        });
    });
})