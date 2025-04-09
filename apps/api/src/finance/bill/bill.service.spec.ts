import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException } from '@nestjs/common';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import { Repository } from 'typeorm';

import * as monthModule from '@repo/services/month/month';
import { MONTHS } from '@repo/services/month/month';

import { EExpenseType, EMonth } from '@repo/business/finance/enum';

import BillBusiness from '@repo/business/finance/bill/business';
import { BANK_LIST_FIXTURE } from '@repo/business/finance/bank/fixtures/bank';
import { BILL_LIST_FIXTURE } from '@repo/business/finance/bill/fixtures/bill';
import { BILL_CATEGORY_LIST_FIXTURE } from '@repo/business/finance/bill-category/fixtures/billCategory';
import { SUPPLIER_LIST_FIXTURE } from '@repo/business/finance/supplier/fixtures/supplier';
import {
  EXPENSE_LIST_FIXTURE,
  INGRID_RESIDENTIAL_LIST_FIXTURE,
} from '@repo/business/finance/expense/fixtures/expense';
import { FINANCE_FIXTURE } from '@repo/business/finance/fixtures/finance';

import { BankService } from '../bank/bank.service';

import { Bill } from './bill.entity';
import { BillService } from './bill.service';
import { BillCategoryService } from './bill-category/bill-category.service';

import { ExpenseService } from './expense/expense.service';
import { CreateBillDto } from './dto/create-bill.dto';
import { UpdateBillDto } from './dto/update.bill.dto';
import { Expense } from './expense/expense.entity';

describe('BillService', () => {
  const bill: Bill = BILL_LIST_FIXTURE[0];
  const newBillCreate: Bill = BILL_LIST_FIXTURE[1];
  const expense: Expense = EXPENSE_LIST_FIXTURE[0];
  const newExpenseCreate: Expense = EXPENSE_LIST_FIXTURE[1];
  let repository: Repository<Bill>;
  let service: BillService;
  let bankService: BankService;
  let expenseService: ExpenseService;
  let billCategoryService: BillCategoryService;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BillService,
        BillBusiness,
        { provide: getRepositoryToken(Bill), useClass: Repository },
        {
          provide: BankService,
          useValue: {
            treatEntityParam: jest.fn(),
          },
        },
        {
          provide: BillCategoryService,
          useValue: {
            seed: jest.fn(),
            treatEntityParam: jest.fn(),
          },
        },
        {
          provide: ExpenseService,
          useValue: {
            seed: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            softRemove: jest.fn(),
            saveExpense: jest.fn(),
            buildUpdate: jest.fn(),
            buildCreation: jest.fn(),
            treatEntitiesParams: jest.fn(),
          },
        },
      ],
    }).compile();

    repository = module.get<Repository<Bill>>(getRepositoryToken(Bill));
    billCategoryService = module.get<BillCategoryService>(BillCategoryService);
    bankService = module.get<BankService>(BankService);
    expenseService = module.get<ExpenseService>(ExpenseService);
    service = module.get<BillService>(BillService);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
    expect(billCategoryService).toBeDefined();
    expect(bankService).toBeDefined();
    expect(expenseService).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a bill successfully without expenses list', async () => {
      const createBill: CreateBillDto = {
        type: bill.type,
        year: bill.year,
        bank: bill.bank.name,
        category: bill.category.name,
      };
      jest
        .spyOn(bankService, 'treatEntityParam')
        .mockResolvedValueOnce(bill.bank);

      jest
        .spyOn(billCategoryService, 'treatEntityParam')
        .mockResolvedValueOnce(bill.category);

      jest
        .spyOn(expenseService, 'treatEntitiesParams')
        .mockResolvedValueOnce([]);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(null),
      } as any);

      jest.spyOn(repository, 'save').mockResolvedValueOnce(bill);

      expect(await service.create(FINANCE_FIXTURE, createBill)).toEqual(bill);
    });

    it('should return error when exist one bill with this name', async () => {
      const createBill: CreateBillDto = {
        type: bill.type,
        year: bill.year,
        bank: bill.bank.name,
        category: bill.category.name,
      };
      jest
        .spyOn(bankService, 'treatEntityParam')
        .mockResolvedValueOnce(bill.bank);

      jest
        .spyOn(billCategoryService, 'treatEntityParam')
        .mockResolvedValueOnce(bill.category);

      jest
        .spyOn(expenseService, 'treatEntitiesParams')
        .mockResolvedValueOnce([]);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(bill),
      } as any);

      jest.spyOn(repository, 'save').mockResolvedValueOnce(bill);

      await expect(
        service.create(FINANCE_FIXTURE, createBill),
      ).rejects.toThrowError(ConflictException);
    });
  });

  describe('update', () => {
    it('should update a bill successfully without year', async () => {
      const bill: Bill = {
        ...BILL_LIST_FIXTURE[0],
        expenses: INGRID_RESIDENTIAL_LIST_FIXTURE,
      };
      const updateBill: UpdateBillDto = {
        type: bill.type,
        bank: bill.bank.name,
        category: bill.category.name,
        expenses: INGRID_RESIDENTIAL_LIST_FIXTURE,
      };

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(bill),
      } as any);

      jest
        .spyOn(bankService, 'treatEntityParam')
        .mockResolvedValueOnce(bill.bank);

      jest
        .spyOn(billCategoryService, 'treatEntityParam')
        .mockResolvedValueOnce(bill.category);

      jest
        .spyOn(expenseService, 'treatEntitiesParams')
        .mockResolvedValueOnce(INGRID_RESIDENTIAL_LIST_FIXTURE);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(null),
      } as any);

      jest.spyOn(repository, 'save').mockResolvedValueOnce(bill);

      expect(
        await service.update(FINANCE_FIXTURE, bill.id, updateBill),
      ).toEqual(bill);
    });

    it('should update a bill successfully with only year', async () => {
      const bill: Bill = {
        ...BILL_LIST_FIXTURE[0],
        expenses: INGRID_RESIDENTIAL_LIST_FIXTURE,
      };
      const updateBill: UpdateBillDto = {
        year: bill.year,
      };

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(bill),
      } as any);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(null),
      } as any);

      jest.spyOn(repository, 'save').mockResolvedValueOnce(bill);

      expect(
        await service.update(FINANCE_FIXTURE, bill.id, updateBill),
      ).toEqual(bill);
    });
  });

  describe('findAllBills', () => {
    it('Should return an list of bills', async () => {
      const expected: Array<Bill> = BILL_LIST_FIXTURE.filter(
        (bill) => bill.finance.id === FINANCE_FIXTURE.id,
      );
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getMany: jest.fn().mockReturnValueOnce(expected),
      } as any);

      expect(await service.findAllBills(FINANCE_FIXTURE, {})).toEqual(
        BILL_LIST_FIXTURE,
      );
    });
  });

  describe('remove', () => {
    it('should remove bill when there are no associated expenses', async () => {
      const expected: Bill = {
        ...BILL_LIST_FIXTURE[0],
        expenses: [],
      };
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(expected),
      } as any);
      jest.spyOn(repository, 'softRemove').mockResolvedValueOnce({
        ...expected,
        deleted_at: BILL_LIST_FIXTURE[0].created_at,
      });
      expect(await service.remove(BILL_LIST_FIXTURE[0].id)).toEqual({
        message: 'Successfully removed',
      });
    });

    it('should throw a ConflictException when bill is in use', async () => {
      const expected: Bill = BILL_LIST_FIXTURE[0];

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(expected),
      } as any);

      await expect(
        service.remove(BILL_LIST_FIXTURE[0].id),
      ).rejects.toThrowError(ConflictException);
    });
  });

  describe('seed', () => {
    it('should seed the database when exist in database', async () => {
      jest
        .spyOn(billCategoryService, 'seed')
        .mockResolvedValueOnce(BILL_CATEGORY_LIST_FIXTURE);
      jest.spyOn(repository, 'find').mockResolvedValueOnce(BILL_LIST_FIXTURE);
      expect(
        await service.seed({
          finance: FINANCE_FIXTURE,
          bankList: BANK_LIST_FIXTURE,
        }),
      ).toEqual(BILL_LIST_FIXTURE);
    });

    it('should seed the database when not exist in database', async () => {
      jest
        .spyOn(billCategoryService, 'seed')
        .mockResolvedValueOnce(BILL_CATEGORY_LIST_FIXTURE);
      jest.spyOn(repository, 'find').mockResolvedValueOnce([]);

      BILL_LIST_FIXTURE.forEach((bill) => {
        jest.spyOn(repository, 'save').mockResolvedValueOnce(bill);
      });

      expect(
        await service.seed({
          finance: FINANCE_FIXTURE,
          bankList: BANK_LIST_FIXTURE,
        }),
      ).toEqual(BILL_LIST_FIXTURE);
    });

    it('should return conflict exception when seed bank', async () => {
      jest
        .spyOn(billCategoryService, 'seed')
        .mockResolvedValueOnce(BILL_CATEGORY_LIST_FIXTURE);
      jest.spyOn(repository, 'find').mockResolvedValueOnce([]);
      await expect(
        service.seed({
          finance: FINANCE_FIXTURE,
          bankList: [],
        }),
      ).rejects.toThrowError(ConflictException);
    });
  });

  describe('billCategorySeed', () => {
    it('should return list of bill categories when received', async () => {
      expect(
        await service.billCategorySeed(BILL_CATEGORY_LIST_FIXTURE),
      ).toEqual(BILL_CATEGORY_LIST_FIXTURE);
    });

    it('should seed list of bill categories when not received', async () => {
      jest
        .spyOn(billCategoryService, 'seed')
        .mockResolvedValueOnce(BILL_CATEGORY_LIST_FIXTURE);
      expect(await service.billCategorySeed()).toEqual(
        BILL_CATEGORY_LIST_FIXTURE,
      );
    });
  });

  describe('expenseSeed', () => {
    const supplierList = SUPPLIER_LIST_FIXTURE;
    const billList = BILL_LIST_FIXTURE;
    it('should seed list of expenses when received', async () => {
      jest
        .spyOn(expenseService, 'seed')
        .mockResolvedValueOnce(EXPENSE_LIST_FIXTURE);
      expect(await service.expenseSeed(supplierList, billList)).toEqual(
        EXPENSE_LIST_FIXTURE,
      );
    });
  });

  describe('addExpense', () => {
    const supplier = expense.supplier;
    const expenseParams = {
      type: EExpenseType.FIXED,
      paid: true,
      value: 93.59,
      supplier: supplier.name,
      instalment_number: 1,
    };
    it('should create a expense successfully with expense type fixed and set bill id', async () => {
      jest.spyOn(monthModule, 'getCurrentMonth').mockReturnValue(EMonth.MARCH);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(bill),
      } as any);

      const mockExpenseBuildCreation = {
        ...expense,
        id: undefined,
        bill,
        paid: expenseParams.paid,
        type: expenseParams.type,
        name: `${bill.name} ${supplier.name}`,
        supplier,
        created_at: undefined,
        updated_at: undefined,
        deleted_at: undefined,
        description: undefined,
        instalment_number: expenseParams.instalment_number,
      };

      MONTHS.forEach((month) => {
        mockExpenseBuildCreation[month] = 0;
        mockExpenseBuildCreation[`${month}_paid`] = false;
      });

      jest
        .spyOn(expenseService, 'buildCreation')
        .mockResolvedValueOnce(mockExpenseBuildCreation);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getMany: jest.fn().mockReturnValueOnce([]),
      } as any);

      const mockSaveExpense = {
        ...mockExpenseBuildCreation,
        id: expense.id,
        total: 1123.08,
        total_paid: 1123.08,
        created_at: expense.created_at,
        updated_at: expense.updated_at,
      };

      MONTHS.forEach((month) => {
        mockExpenseBuildCreation[month] = 93.59;
        mockExpenseBuildCreation[`${month}_paid`] = true;
      });

      jest
        .spyOn(expenseService, 'saveExpense')
        .mockResolvedValueOnce(mockSaveExpense);

      expect(await service.addExpense(bill.id, expenseParams)).toEqual(
        mockSaveExpense,
      );
    });

    it('should create a expense successfully with expense type variable and set bill id', async () => {
      const expenseVariableParams = {
        ...expenseParams,
        type: EExpenseType.VARIABLE,
        month: EMonth.MARCH,
        instalment_number: 12,
      };

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(bill),
      } as any);

      const mockExpenseBuildCreation = {
        ...expense,
        id: undefined,
        year: 2020,
        bill: {
          ...bill,
          year: 2020,
        },
        paid: expenseVariableParams.paid,
        type: expenseVariableParams.type,
        name: `${bill.name} ${supplier.name}`,
        supplier,
        created_at: undefined,
        updated_at: undefined,
        deleted_at: undefined,
        description: undefined,
        instalment_number: expenseVariableParams.instalment_number,
      };

      MONTHS.forEach((month) => {
        mockExpenseBuildCreation[month] = 0;
        mockExpenseBuildCreation[`${month}_paid`] = false;
      });

      jest
        .spyOn(expenseService, 'buildCreation')
        .mockResolvedValueOnce(mockExpenseBuildCreation);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getMany: jest.fn().mockReturnValueOnce([]),
      } as any);

      const mockSaveExpenseForCurrentYear = {
        ...mockExpenseBuildCreation,
        id: expense.id,
        total: 935.9,
        total_paid: 935.9,
        created_at: expense.created_at,
        updated_at: expense.updated_at,
      };

      MONTHS.forEach((month) => {
        if (month !== 'january' && month !== 'february') {
          mockExpenseBuildCreation[month] = 93.59;
          mockExpenseBuildCreation[`${month}_paid`] = true;
        }
      });

      jest
        .spyOn(expenseService, 'saveExpense')
        .mockResolvedValueOnce(mockSaveExpenseForCurrentYear);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(null),
      } as any);

      jest.spyOn(repository, 'save').mockResolvedValueOnce(newBillCreate);

      const mockSaveExpenseForNextYear = {
        ...newExpenseCreate,
        bill: {
          ...newBillCreate,
          year: 2021,
        },
        year: 2021,
        total: 187.18,
        total_paid: 187.18,
      };

      MONTHS.forEach((month) => {
        if (month === 'january' || month === 'february') {
          mockSaveExpenseForNextYear[month] = 93.59;
          mockSaveExpenseForNextYear[`${month}_paid`] = true;
        }
      });

      jest
        .spyOn(expenseService, 'saveExpense')
        .mockResolvedValueOnce(mockSaveExpenseForNextYear);

      expect(
        await service.addExpense(bill.id, expenseVariableParams),
      ).toEqual(mockSaveExpenseForCurrentYear);
    });

    it('should create a expense successfully with expense type variable and get bill existent', async () => {
      const expenseVariableParams = {
        ...expenseParams,
        type: EExpenseType.VARIABLE,
        month: EMonth.MARCH,
        instalment_number: 12,
      };

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(bill),
      } as any);

      const mockExpenseBuildCreation = {
        ...expense,
        id: undefined,
        year: 2020,
        bill: {
          ...bill,
          year: 2020,
        },
        paid: expenseVariableParams.paid,
        type: expenseVariableParams.type,
        name: `${bill.name} ${supplier.name}`,
        supplier,
        created_at: undefined,
        updated_at: undefined,
        deleted_at: undefined,
        description: undefined,
        instalment_number: expenseVariableParams.instalment_number,
      };

      MONTHS.forEach((month) => {
        mockExpenseBuildCreation[month] = 0;
        mockExpenseBuildCreation[`${month}_paid`] = false;
      });

      jest
        .spyOn(expenseService, 'buildCreation')
        .mockResolvedValueOnce(mockExpenseBuildCreation);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getMany: jest.fn().mockReturnValueOnce([]),
      } as any);

      const mockSaveExpenseForCurrentYear = {
        ...mockExpenseBuildCreation,
        id: expense.id,
        total: 935.9,
        total_paid: 935.9,
        created_at: expense.created_at,
        updated_at: expense.updated_at,
      };

      MONTHS.forEach((month) => {
        if (month !== 'january' && month !== 'february') {
          mockExpenseBuildCreation[month] = 93.59;
          mockExpenseBuildCreation[`${month}_paid`] = true;
        }
      });

      jest
        .spyOn(expenseService, 'saveExpense')
        .mockResolvedValueOnce(mockSaveExpenseForCurrentYear);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(newBillCreate),
      } as any);

      const mockSaveExpenseForNextYear = {
        ...newExpenseCreate,
        bill: {
          ...newBillCreate,
          year: 2021,
        },
        year: 2021,
        total: 187.18,
        total_paid: 187.18,
      };

      MONTHS.forEach((month) => {
        if (month === 'january' || month === 'february') {
          mockSaveExpenseForNextYear[month] = 93.59;
          mockSaveExpenseForNextYear[`${month}_paid`] = true;
        }
      });

      jest
        .spyOn(expenseService, 'saveExpense')
        .mockResolvedValueOnce(mockSaveExpenseForNextYear);

      expect(
        await service.addExpense(bill.id, expenseVariableParams),
      ).toEqual(mockSaveExpenseForCurrentYear);
    });

    it('should return an error when trying to create an expense with an existing name', async () => {
      const expenseVariableParams = {
        ...expenseParams,
        type: EExpenseType.VARIABLE,
        month: EMonth.MARCH,
        instalment_number: 12,
      };

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(bill),
      } as any);

      const mockExpenseBuildCreation = {
        ...expense,
        id: undefined,
        year: 2020,
        bill: {
          ...bill,
          year: 2020,
        },
        paid: expenseVariableParams.paid,
        type: expenseVariableParams.type,
        name: `${bill.name} ${supplier.name}`,
        supplier,
        created_at: undefined,
        updated_at: undefined,
        deleted_at: undefined,
        description: undefined,
        instalment_number: expenseVariableParams.instalment_number,
      };

      MONTHS.forEach((month) => {
        mockExpenseBuildCreation[month] = 0;
        mockExpenseBuildCreation[`${month}_paid`] = false;
      });

      jest
        .spyOn(expenseService, 'buildCreation')
        .mockResolvedValueOnce(mockExpenseBuildCreation);

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getMany: jest.fn().mockReturnValueOnce([bill]),
      } as any);

      await expect(
        service.addExpense(bill.id, expenseVariableParams),
      ).rejects.toThrowError(ConflictException);
    });
  });

  describe('findOneExpense', () => {
    it('should return an expense successfully', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(bill),
      } as any);

      jest.spyOn(expenseService, 'findOne').mockResolvedValueOnce(expense);

      expect(await service.findOneExpense(bill.id, expense.id)).toEqual(
        expense,
      );
    });
  });

  describe('findAllExpense', () => {
    it('should return an expense successfully', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(bill),
      } as any);

      jest.spyOn(expenseService, 'findAll').mockResolvedValueOnce([expense]);

      expect(await service.findAllExpense(bill.id, {})).toEqual([expense]);
    });
  });

  describe('removeExpense', () => {
    it('should remove an expense successfully', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(bill),
      } as any);

      jest.spyOn(expenseService, 'findOne').mockResolvedValueOnce(expense);
      jest.spyOn(expenseService, 'softRemove').mockResolvedValueOnce(expense);

      expect(await service.removeExpense(bill.id, expense.id)).toEqual({
        message: 'Successfully removed',
      });
    });
  });

  describe('updateExpense', () => {
    it('should update a expense successfully', async () => {
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(bill),
      } as any);

      jest.spyOn(expenseService, 'findOne').mockResolvedValueOnce(expense);

      jest.spyOn(expenseService, 'buildUpdate').mockResolvedValueOnce({
        ...expense,
        paid: expense.paid,
        bill: expense.bill,
        deleted_at: undefined,
      });

      jest.spyOn(expenseService, 'saveExpense').mockResolvedValueOnce(expense);

      expect(await service.updateExpense(bill.id, expense.id, expense)).toEqual(
        expense,
      );
    });

    it('should return an error when trying to update an expense with an existing name', async () => {
      const supplier = newExpenseCreate.supplier;
      const expenseParams = {
        ...expense,
        supplier: supplier.name,
      };
      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getOne: jest.fn().mockReturnValueOnce(bill),
      } as any);

      jest.spyOn(expenseService, 'findOne').mockResolvedValueOnce(expense);

      jest.spyOn(expenseService, 'buildUpdate').mockResolvedValueOnce({
        ...expense,
        paid: expense.paid,
        bill: expense.bill,
        name_code: `${bill.name_code}_${supplier.name_code}`,
        deleted_at: undefined,
      });

      jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
        andWhere: jest.fn(),
        withDeleted: jest.fn(),
        leftJoinAndSelect: jest.fn(),
        getMany: jest.fn().mockReturnValueOnce([bill]),
      } as any);

      await expect(
        service.updateExpense(bill.id, expense.id, expenseParams),
      ).rejects.toThrowError(ConflictException);
    });
  });
});
