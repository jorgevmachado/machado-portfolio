import type { INestConfig } from './interface';
import { Auth } from './auth';
import { Pokemon } from './pokemon';
import { Finance } from './finance';

export class Nest {
  private readonly authModule: Auth;
  private readonly pokemonModule: Pokemon;
  private readonly financeModule: Finance;

  constructor({ baseUrl = 'http://localhost:3000', token = '' }: INestConfig) {
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    this.authModule = new Auth({ baseUrl, headers });
    this.pokemonModule = new Pokemon({ baseUrl, headers });
    this.financeModule = new Finance({ baseUrl, headers });
  }

  get auth(): Auth {
    return this.authModule;
  }

  get pokemon(): Pokemon {
    return this.pokemonModule;
  }

  get finance(): Finance {
    return this.financeModule;
  }
}
