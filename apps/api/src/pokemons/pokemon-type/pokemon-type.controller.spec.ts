import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { PokemonTypeController } from './pokemon-type.controller';
import { PokemonTypeService } from './pokemon-type.service';
import { Test, TestingModule } from '@nestjs/testing';
import {
  GRASS_TYPE_FIXTURE,
  LIST_TYPES_FIXTURE,
} from '@repo/mock/pokemon/fixtures/completes/types/index';

describe('PokemonTypeController', () => {
  let service: PokemonTypeService;
  let controller: PokemonTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonTypeController],
      providers: [
        {
          provide: PokemonTypeService,
          useValue: {
            list: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PokemonTypeService>(PokemonTypeService);
    controller = module.get<PokemonTypeController>(PokemonTypeController);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('Should return an list of pokemon move', async () => {
      jest.spyOn(service, 'list').mockResolvedValue(LIST_TYPES_FIXTURE);

      expect(await controller.findAll({})).toEqual(LIST_TYPES_FIXTURE);
    });
  });

  describe('findOne', () => {
    it('Should return an pokemon move', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(GRASS_TYPE_FIXTURE);

      expect(await controller.findOne(GRASS_TYPE_FIXTURE.name)).toEqual(
        GRASS_TYPE_FIXTURE,
      );
    });
  });
});