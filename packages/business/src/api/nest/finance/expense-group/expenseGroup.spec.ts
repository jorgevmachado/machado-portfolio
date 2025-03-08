import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { QueryParameters } from '@repo/business/shared/interface';

import { NestModuleAbstract } from '../../nestModuleAbstract';

import { ExpenseGroup } from './expenseGroup';

jest.mock('../../nestModuleAbstract');

describe('ExpenseGroup', () => {
    const mockBaseUrl = 'http://mock-base-url.com';
    const mockHeaders = { Authorization: 'Bearer test-token' };
    const mockConfig = { baseUrl: mockBaseUrl, headers: mockHeaders };

    let expenseGroup: ExpenseGroup;

    beforeEach(() => {
        jest.clearAllMocks();
        expenseGroup = new ExpenseGroup(mockConfig);
    });

    describe('constructor', () => {
        it('should initialize with the correct path and config expenseGroup', () => {
            expect(NestModuleAbstract).toHaveBeenCalledTimes(1);
            expect(NestModuleAbstract).toHaveBeenCalledWith({
                pathUrl: 'finance/expense',
                subPathUrl: 'group',
                nestModuleConfig: mockConfig,
            });
        });

        it('should call inherited methods from NestModuleAbstract about expenseGroup', async () => {
            const mockGetAll = jest
                .spyOn(NestModuleAbstract.prototype, 'getAll')
                .mockResolvedValue([]);

            const queryParams: QueryParameters = { name: 'test' };
            const result = await expenseGroup.getAll(queryParams);

            expect(mockGetAll).toHaveBeenCalledTimes(1);
            expect(mockGetAll).toHaveBeenCalledWith(queryParams);
            expect(result).toEqual([]);
        });
    });
});