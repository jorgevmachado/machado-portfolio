import { Test, TestingModule } from '@nestjs/testing';
import { SupplierCategoryService } from './supplier-category.service';

describe('SupplierCategoryService', () => {
  let service: SupplierCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupplierCategoryService],
    }).compile();

    service = module.get<SupplierCategoryService>(SupplierCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
