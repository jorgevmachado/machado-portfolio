import { Test, TestingModule } from '@nestjs/testing';
import {afterEach, beforeEach, describe, expect, it, jest} from '@jest/globals';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

import { BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE } from '@repo/business/pokemon/fixtures/pokemon/completes/completes';

import { PokemonAbility } from './pokemon-ability.entity';

import { PokemonAbilityService } from './pokemon-ability.service';

describe('TypeService', () => {
    let service: PokemonAbilityService;
    let repository: Repository<PokemonAbility>;

    beforeEach(async () => {
        jest.clearAllMocks();
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PokemonAbilityService,
                { provide: getRepositoryToken(PokemonAbility), useClass: Repository },
            ],
        }).compile();

        service = module.get<PokemonAbilityService>(PokemonAbilityService);
        repository = module.get<Repository<PokemonAbility>>(getRepositoryToken(PokemonAbility));
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(repository).toBeDefined();
    });

    describe('findList(entityType)', () => {
        it('should return a list of Pokémon types from the database', async () => {

            BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE.abilities.forEach((ability) => {
                jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
                    andWhere: jest.fn(),
                    getOne: jest.fn().mockReturnValueOnce(ability),
                } as any);
            })

            expect(await service.findList(BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE.abilities)).toEqual(
                BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE.abilities,
            );
        });

        it('must save a list of pokemon types in the database when none exist', async () => {

            BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE.abilities.forEach(() => {
                jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
                    andWhere: jest.fn(),
                    getOne: jest.fn().mockReturnValueOnce(null),
                } as any);
            })

            BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE.abilities.forEach((ability) => {
                jest
                    .spyOn(repository, 'save')
                    .mockResolvedValueOnce(ability);
            })

            BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE.abilities.forEach((ability) => {
                jest.spyOn(repository, 'createQueryBuilder').mockReturnValueOnce({
                    andWhere: jest.fn(),
                    getOne: jest.fn().mockReturnValueOnce(ability),
                } as any);
            })

            expect(await service.findList(BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE.abilities)).toEqual(
                BULBASAUR_ENTITY_COMPLETE_POKEMON_FIXTURE.abilities,
            );
        });
    });
});