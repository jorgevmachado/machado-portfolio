import { Http } from '@repo/services/http/http';

import type { INestModuleConfig } from '../../interface';

export class PokemonAbility extends Http {
    constructor({ baseUrl, headers }: INestModuleConfig) {
        super(baseUrl, { headers });
    }
}