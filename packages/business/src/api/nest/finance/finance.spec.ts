import { beforeEach, describe, expect, it, jest } from '@jest/globals';

import { Supplier } from './supplier';
import { Expense } from './expense';
import { Bill } from './bill';

import { Finance } from './finance';

jest.mock('./supplier');
jest.mock('./expense');
jest.mock('./bill');

describe('Finance', () => {
    const mockBaseUrl = 'http://mock-base-url.com';
    const mockHeaders = { Authorization: 'Bearer test-token' };
    const mockConfig = { baseUrl: mockBaseUrl, headers: mockHeaders };

    let finance: Finance;

    beforeEach(() => {
        jest.clearAllMocks();
        finance = new Finance(mockConfig);
    });

    describe('supplierModule', () => {
        it('should initialize Supplier module', () => {
            expect(Supplier).toHaveBeenCalledTimes(1);
            expect(Supplier).toHaveBeenCalledWith(mockConfig);
        })

        it('should return the instance of Supplier via supplier getter', () => {
            const supplierModule = finance.supplier;
            expect(supplierModule).toBeInstanceOf(Supplier);
            expect(Supplier).toHaveBeenCalledTimes(1);
        })
    });

    describe('expenseModule', () => {
        it('should initialize Expense module', () => {
            expect(Expense).toHaveBeenCalledTimes(1);
            expect(Expense).toHaveBeenCalledWith(mockConfig);
        })

        it('should return the instance of Expense via expense getter', () => {
            const expenseModule = finance.expense;
            expect(expenseModule).toBeInstanceOf(Expense);
            expect(Expense).toHaveBeenCalledTimes(1);
        })
    });

    describe('bill Module', () => {
        it('should initialize Expense module', () => {
            expect(Expense).toHaveBeenCalledTimes(1);
            expect(Expense).toHaveBeenCalledWith(mockConfig);
        })

        it('should return the instance of Bill via bill getter', () => {
            const billModule = finance.bill;
            expect(billModule).toBeInstanceOf(Bill);
            expect(Bill).toHaveBeenCalledTimes(1);
        })
    })
})