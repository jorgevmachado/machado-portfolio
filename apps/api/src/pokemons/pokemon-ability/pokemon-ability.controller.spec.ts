import {afterEach, beforeEach, describe, expect, it, jest} from '@jest/globals';
import { PokemonAbilityController } from './pokemon-ability.controller';
import { PokemonAbilityService } from './pokemon-ability.service';
import { Test, TestingModule } from '@nestjs/testing';

import {
  OVERGROW_ABILITY_FIXTURE,
  LIST_ABILITIES_FIXTURE,
} from '@repo/business/pokemon/pokemon-ability/fixtures/pokemonAbility';

describe('PokemonAbilityController', () => {
  let service: PokemonAbilityService;
  let controller: PokemonAbilityController;

  beforeEach(async () => {
    jest.clearAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PokemonAbilityController],
      providers: [
        {
          provide: PokemonAbilityService,
          useValue: {
            findAll: jest.fn(),
            findOne: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<PokemonAbilityService>(PokemonAbilityService);
    controller = module.get<PokemonAbilityController>(PokemonAbilityController);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('Should return an list of pokemon move', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(LIST_ABILITIES_FIXTURE);

      expect(await controller.findAll({})).toEqual(LIST_ABILITIES_FIXTURE);
    });
  });

  describe('findOne', () => {
    it('Should return an pokemon move', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(OVERGROW_ABILITY_FIXTURE);

      expect(await controller.findOne(OVERGROW_ABILITY_FIXTURE.name)).toEqual(
        OVERGROW_ABILITY_FIXTURE,
      );
    });
  });
});