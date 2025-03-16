import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { PokemonMoveController } from './pokemon-move.controller';
import { PokemonMoveService } from './pokemon-move.service';
import { Test, TestingModule } from '@nestjs/testing';
import {
  BIND_MOVE_FIXTURE,
  LIST_MOVE_FIXTURE,
} from '@repo/business/pokemon/pokemon-move/fixtures/pokemonMove';

describe('PokemonMoveController', () => {
  let service: PokemonMoveService;
  let controller: PokemonMoveController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonMoveController],
      providers: [
        {
          provide: PokemonMoveService,
          useValue: {
            list: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PokemonMoveService>(PokemonMoveService);
    controller = module.get<PokemonMoveController>(PokemonMoveController);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('Should return an list of pokemon move', async () => {
      jest.spyOn(service, 'list').mockResolvedValue(LIST_MOVE_FIXTURE);

      expect(await controller.findAll({})).toEqual(LIST_MOVE_FIXTURE);
    });
  });

  describe('findOne', () => {
    it('Should return an pokemon move', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(BIND_MOVE_FIXTURE);

      expect(await controller.findOne(BIND_MOVE_FIXTURE.name)).toEqual(
        BIND_MOVE_FIXTURE,
      );
    });
  });
});