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
  softRemove: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  delete: jest.fn(),
  update: jest.fn(),
  create: jest.fn(),
  count: jest.fn(),
  manager: {
    transaction: jest.fn(),
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
  const entity = {
    id: '52422c37-83a7-4ca6-96c4-bd15a1dc61bc',
    name: 'test',
  };
  const entities = [
    entity,
    {
      id: '92ca29f3-d08d-4abe-a157-94ef70f512c7',
      name: 'test2',
    },
  ];
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
      jest.spyOn(mockRepository, 'save').mockResolvedValueOnce(entity);

      const result = await service.save(entity);

      expect(mockRepository.save).toBeCalledTimes(1);
      expect(mockRepository.save).toBeCalledWith(entity);
      expect(result).toEqual(entity);
    });
  });

  describe('softRemove', () => {
    it('should softRemove entity successfully', async () => {
      jest.spyOn(mockRepository, 'softRemove').mockResolvedValueOnce(entity);

      const result = await service.softRemove(entity);

      expect(mockRepository.softRemove).toBeCalledTimes(1);
      expect(mockRepository.softRemove).toBeCalledWith(entity);
      expect(result).toEqual(entity);
    });
  });

  describe('findAll', () => {
    it('should return an list of entities', async () => {
      jest.spyOn(Queries.prototype, 'list').mockResolvedValueOnce(entities);
      const result = await service.findAll({});
      expect(result).toEqual(entities);
    });
  });

  describe('findOne', () => {
    it('should return one entity', async () => {
      jest.spyOn(Queries.prototype, 'findOne').mockResolvedValueOnce(entity);
      const result = await service.findOne({ value: entity.id });
      expect(result).toEqual(entity);
    });
  });

  describe('remove', () => {
    it('should return one entity', async () => {
      jest.spyOn(Queries.prototype, 'findOne').mockResolvedValueOnce(entity);
      jest.spyOn(mockRepository, 'softRemove').mockResolvedValueOnce(entity);
      const result = await service.remove(entity.id);
      expect(result).toEqual({ message: 'Successfully removed' });
    });
  });

  describe('treatEntityParam', () => {
    it('should return one entity by request', async () => {
      jest.spyOn(Queries.prototype, 'findOne').mockResolvedValueOnce(entity);
      const result = await service.treatEntityParam(entity.id, 'Entity');
      expect(result).toEqual(entity);
    });

    it('should return one entity by list and name', async () => {
      const result = await service.treatEntityParam(
        entity.name,
        'Entity',
        entities,
      );
      expect(result).toEqual(entity);
    });

    it('should return one entity when the parameter is a entity', async () => {
      jest.spyOn(Validate.prototype, 'paramIsEntity').mockReturnThis();
      const result = await service.treatEntityParam(entity, 'Entity');
      expect(result).toEqual(entity);
    });
  });

  describe('treatEntitiesParams', () => {
    it('should return an list of entities empty', async () => {
      const result = await service.treatEntitiesParams();
      expect(result).toEqual([]);
    });

    it('should return an list of entities empty with list of entities empty', async () => {
      const result = await service.treatEntitiesParams([]);
      expect(result).toEqual([]);
    });
    it('should return an list of entities by request', async () => {
      jest.spyOn(Queries.prototype, 'list').mockResolvedValueOnce(entities);
      const result = await service.treatEntitiesParams(entities, 'Entity');
      expect(result).toEqual(entities);
    });
  });

  describe('findOneByList', () => {
    it('should return one entity by list and name', () => {
      const result = service.findOneByList(entity.name, entities);
      expect(result).toEqual(entity);
    });
    it('should return one entity by list and uuid', () => {
      const result = service.findOneByList(entity.id, entities);
      expect(result).toEqual(entity);
    });
  });
});
