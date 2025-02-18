import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { ExpenseCategoryTypeService } from './expenseCategoryTypeService';
import { Nest } from '../../api';

jest.mock('../../api');

describe('ExpenseCategoryTypeService', () => {
  let service: ExpenseCategoryTypeService;
  let mockNest: jest.Mocked<Nest>;

  beforeEach(() => {
    mockNest = {
      finance: {
        expense: {
          category: {
            type: {
              create: jest.fn(),
            },
          },
        },
      },
    } as unknown as jest.Mocked<Nest>;

    service = new ExpenseCategoryTypeService(mockNest); // Instância do serviço com o mock
  });

  it('should successfully create an expense category type', async () => {
    const mockName = 'Marketing Expenses';
    const mockResponse = {
      id: '1',
      name: mockName,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: undefined,
      message: 'Success',
    };
    mockNest.finance.expense.category.type.create.mockResolvedValue(
      mockResponse,
    );

    const result = await service.create(mockName);

    expect(mockNest.finance.expense.category.type.create).toHaveBeenCalledWith({
      name: mockName,
    });
    expect(result).toEqual(mockResponse);
  });

  it('should throw an error if the creation fails', async () => {
    const mockName = 'Invalid Name';
    const mockError = new Error('Failed to create category type');
    mockNest.finance.expense.category.type.create.mockRejectedValue(mockError);

    await expect(service.create(mockName)).rejects.toThrow(
      'Failed to create category type',
    );
  });

  it('should call the create method with correct arguments', async () => {
    const mockName = 'Travel Expenses';
    const mockResponse = {
      id: '2',
      name: mockName,
      created_at: new Date(),
      updated_at: new Date(),
      deleted_at: undefined,
      message: 'Success',
    };
    mockNest.finance.expense.category.type.create.mockResolvedValue(
      mockResponse,
    );

    await service.create(mockName);

    expect(mockNest.finance.expense.category.type.create).toHaveBeenCalledWith({
      name: mockName,
    });
    expect(mockNest.finance.expense.category.type.create).toHaveBeenCalledTimes(
      1,
    );
  });
});