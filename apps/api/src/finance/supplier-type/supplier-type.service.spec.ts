import { Test, TestingModule } from '@nestjs/testing';
import { SupplierTypeService } from './supplier-type.service';

describe('SupplierTypeService', () => {
  let service: SupplierTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupplierTypeService],
    }).compile();

    service = module.get<SupplierTypeService>(SupplierTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
