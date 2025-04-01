import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_INTERCEPTOR } from '@nestjs/core';

import { AppService } from './app.service';
import { AppController } from './app.controller';
import { dataSourceOptions } from './app.data-source';

import { SanitizeUserInterceptor } from './interceptors/sanitize-user.interceptor';
import { AuthModule } from './auth/auth.module';
import { PokemonModule } from './pokemons/pokemon.module';
import { FinanceModule } from './finance/finance.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dataSourceOptions),
    AuthModule,
    PokemonModule,
    FinanceModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_INTERCEPTOR, useClass: SanitizeUserInterceptor },
  ],
})
export class AppModule {}
