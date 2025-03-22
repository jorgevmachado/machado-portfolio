import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
  jest,
} from '@jest/globals';
import { Repository } from 'typeorm';

import { Service } from './service';

import { Seeder } from '../seeder';
import { Queries } from '../queries';
import { Validate } from '../validate';

jest.mock('../seeder');
jest.mock('../queries');
jest.mock('../validate');

interface MockEntity {
  id: string;
  name: string;
}

const mockRepository = {
  save: jest.fn().mockReturnThis(),
  createQueryBuilder: jest.fn().mockReturnThis(),
  softRemove: jest.fn(), // Simula soft delete de uma entidade
  findOne: jest.fn(), // Simula buscar uma única entidade
  find: jest.fn(), // Simula buscar múltiplas entidades
  delete: jest.fn(), // Simula deletar uma entidade diretamente
  update: jest.fn(), // Simula atualizar uma entidade
  create: jest.fn(), // Simula criar uma instância de uma entidade
  count: jest.fn(), // Simula contar registros na base
  manager: {
    transaction: jest.fn(), // Simula uma transação gerenciada
  },
} as unknown as Repository<MockEntity>;

jest.mock('typeorm', () => {
  return {
    Repository: jest.fn().mockImplementation(() => mockRepository),
  };
});

class TestService extends Service<MockEntity> {
  constructor() {
    super('mockAlias', ['relation1', 'relation2'], mockRepository);
  }
}

describe('service', () => {
  let service: TestService;

  beforeEach(() => {
    jest.clearAllMocks();
    service = new TestService();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('constructor', () => {
    it('should be defined', () => {
      expect(service).toBeDefined();
    });
  });

  describe('seederModule', () => {
    it('should initialize seederModule module.', () => {
      expect(Seeder).toBeCalledTimes(1);
      expect(Seeder).toBeCalledWith(
        'mockAlias',
        ['relation1', 'relation2'],
        mockRepository,
      );
    });
  });

  describe('queriesModule', () => {
    it('should initialize queriesModule module.', () => {
      expect(Queries).toBeCalledTimes(1);
      expect(Queries).toBeCalledWith(
        'mockAlias',
        ['relation1', 'relation2'],
        mockRepository,
      );
    });
  });

  describe('validateModule', () => {
    it('should initialize validate module.', () => {
      expect(Validate).toBeCalledTimes(1);
    });
  });

  describe('save', () => {
    it('should save entity successfully', async () => {
      const entity = {
        id: '1',
        name: 'test',
      };

      jest.spyOn(mockRepository, 'save').mockResolvedValueOnce(entity);

      const result = await service.save(entity);

      expect(mockRepository.save).toBeCalledTimes(1);
      expect(mockRepository.save).toBeCalledWith(entity);
      expect(result).toEqual(entity);
    });
  });
});
