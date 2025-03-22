import { Test, TestingModule } from '@nestjs/testing';
import {afterEach, beforeEach, describe, expect, it, jest} from '@jest/globals';

import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';

describe('PokemonController', () => {
    let controller: PokemonController;
    let service: PokemonService;

    beforeEach(async () => {
        jest.clearAllMocks();
        const module: TestingModule = await Test.createTestingModule({
            controllers: [PokemonController],
            providers: [
                {
                    provide: PokemonService,
                    useValue: {},
                },
            ],
        }).compile();

        controller = module.get<PokemonController>(PokemonController);
        service = module.get<PokemonService>(PokemonService);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
        expect(service).toBeDefined();
    });
});