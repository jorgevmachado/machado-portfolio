<div style="text-align: center;">
    <h1>MACHADO-PORTFOLIO</h1>
    <br/>
<p>
    <strong>Powered by</strong>

![Turbo](https://img.shields.io/badge/Turborepo-orangered?style=for-the-badge&logo=turborepo&logoColor=white)

![Nest](https://img.shields.io/badge/-NestJs-ea2845?style=for-the-badge&logo=nestjs&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=turborepo&logoColor=white)
![Next](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)

![React](https://shields.io/badge/react-black?logo=react&style=falt)
![Npm](https://shields.io/badge/npm-gray?logo=npm&style=falt)
![Typescript](https://img.shields.io/badge/typescript-%23323330.svg?style=falt&logo=typescript&logoColor=%233178C6)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=falt&logo=node.js&logoColor=white)
![Jest](https://img.shields.io/badge/jest-C53d15.svg?style=falt&logo=jest&logoColor=white)
</p>
</div>

## Para que serve ?
### Projeto Criado para aprimorar os meus conhecimentos em desenvolvimento de Software.
    .
    ├── apps
    │   ├── api                       # NestJS app (https://nestjs.com).
    │   └── web                       # Next.js app (https://nextjs.org).
    │   └── geek                      # Projeto Front-end com nextjs para a marca geek.
    └── packages
        ├── @repo/eslint-config       # Módulo de configurações do `eslint` (inclui `prettier`).
        ├── @repo/jest                # Módulo de configurações do `jest`.
        ├── @repo/typescript          # Módulo de configurações do typescript com `tsconfig.json`s usado em todo o monorepo.
        ├── @repo/services            # Módulo de utilitários.
        ├── @repo/business            # Módulo de regras de negocio.   
        └── @repo/tokens              # Biblioteca de estilos compartilhados divididos entre marcas.
        └── @repo/ds                  # Biblioteca de componentes React de Sistema de Design.
        └── @repo/ui                  # Biblioteca de componentes React de Interface do usuário.

## Apps
Mais informações sobre projeto api [clique aqui](./apps/api/README.md).

Mais informações sobre projeto web [clique aqui](./apps/web/README.md).

Mais informações sobre projeto geek [clique aqui](./apps/geek/README.md).

## Packages
Mais informações sobre módulo eslint [clique aqui](./packages/eslint-config/README.md).

Mais informações sobre módulo jest [clique aqui](./packages/jest/README.md).

Mais informações sobre módulo typescript [clique aqui](./packages/typescript/README.md).

Mais informações sobre módulo services [clique aqui](./packages/services/README.md).

Mais informações sobre módulo business [clique aqui](./packages/business/README.md).

Mais informações sobre a biblioteca de tokens [clique aqui](./packages/tokens/README.md).

Mais informações sobre a biblioteca de Design System [clique aqui](./packages/ds/README.md).

Mais informações sobre a biblioteca de User Interface [clique aqui](./packages/ui/README.md).

## Instalação do Ambiente
Primeiramente, instale o [NVM](https://github.com/nvm-sh/nvm) e instale a versão específica do Node via terminal:
```bash
  nvm install v22.13.1
  nvm use
```
Instale todas as dependências:
```bash
  npm install
```

## 🏠  Comandos
### Build

```bash
# Irá construir todos os projetos e pacotes que possuírem o `build` no script.
npm run build

# Irá construir somente as módulos dependentes. (@repo/services e @repo/business).
npm run build:module-dependencies

# Irá construir somente as bibliotecas dependentes. (@repo/tokens, @repo/ds e @repo/ui).
npm run build:lib-dependencies

# Irá construir somente o projeto api.
npm run build:api

# Irá construir somente o projeto web.
npm run build:web

# Irá construir somente o projeto geek.
npm run build:geek
```

### Develop

```bash
# Irá executar em todos os projetos e pacotes que possuírem o `dev` no script.
npm run dev

# Irá executar somente o projeto api.
npm run dev:api

# Irá executar somente o projeto web.
npm run dev:web

# Irá executar somente o projeto geek.
npm run dev:geek
```

### test

```bash
# Irá executar em todos os projetos e pacotes que possuírem o `test` no script.
npm run test

# Irá executar somente os módulos dependentes. (@repo/services e @repo/business).
npm run test:module-dependencies

# Irá executar somente as bibliotecas dependentes. (@repo/tokens, @repo/ds e @repo/ui).
npm run test:lib-dependencies

# Irá executar somente o projeto api.
npm run test:api

# Irá executar somente o projeto web.
npm run test:web

# Irá executar somente o projeto geek.
npm run test:geek

# Veja `@repo/jest` para personalizar o comportamento.
# Também poderá ser executado o `test:e2e` nos projetos e pacotes que possuírem.
npm run test:e2e
```

#### Lint

```bash
# Irá executar o lint em todos os projetos e pacotes que possuírem o `lint` no script.
# Veja `@repo/eslint-config` para personalizar o comportamento.
npm run lint

# Irá executar somente os módulos dependentes. (@repo/services e @repo/business).
npm run lint:module-dependencies

# Irá executar somente as bibliotecas dependentes. (@repo/tokens, @repo/ds e @repo/ui).
npm run lint:lib-dependencies

# Irá executar somente o projeto api.
npm run lint:api

# Irá executar somente o projeto web.
npm run lint:web

# Irá executar somente o projeto geek.
npm run lint:geek
```

#### Format

```bash
# Formatará todos os arquivos `.ts,.js,json,.tsx,.jsx` suportados.
# Veja `@repo/eslint-config/prettier-base.js` para personalizar o comportamento.
npm format
```