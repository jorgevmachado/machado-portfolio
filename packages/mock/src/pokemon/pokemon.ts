import { Router } from 'express';
import {LIST_ENTITY_COMPLETE_POKEMON_FIXTURE} from "./fixtures";

const pokemonRouter: Router = Router();

pokemonRouter.get(`/pokemon`, (req, res) => {
    const { page, limit } = req.query;
    if(!page || !limit) {
        res.json(LIST_ENTITY_COMPLETE_POKEMON_FIXTURE);
    }

    res.json({
        skip: 0,
        next: 0,
        prev: 0,
        total: LIST_ENTITY_COMPLETE_POKEMON_FIXTURE.length,
        pages: 1,
        results: LIST_ENTITY_COMPLETE_POKEMON_FIXTURE,
        per_page: limit,
        current_page: page,
    });
});

pokemonRouter.get(`/pokemon/:param`, (req, res) => {
    const { param } = req.params;
    const paramNumber = Number(param);
    const filter = {
        key: isNaN(paramNumber) ? 'name' : 'id',
        value: isNaN(paramNumber) ? param : paramNumber,
    };
    const pokemon = LIST_ENTITY_COMPLETE_POKEMON_FIXTURE.find((pokemon) => pokemon[filter.key] === filter.value);
    if (!pokemon) {
        res.status(404).json({
            message: 'pokemons not found',
            error: 'Not Found',
            statusCode: 404
        });
        return;
    }
    res.json(pokemon);
});

export default pokemonRouter;