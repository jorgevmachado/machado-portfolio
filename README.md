<div align="center">
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


## Comandos
### Build

```bash
# Irá  construir todos os projetos e pacotes que possuírem o `build` no script.
npm run build
```

### Develop

```bash
# Irá  executar todos os projetos e pacotes que possuírem o `dev` no script.
npm run dev
```

### test

```bash
# Will launch a test suites for all the app & packages with the supported `test` script.
pnpm run test

# You can launch e2e testes with `test:e2e`
pnpm run test:e2e

# See `@repo/jest-config` to customize the behavior.
```

#### Lint

```bash
# Will lint all the app & packages with the supported `lint` script.
# See `@repo/eslint-config` to customize the behavior.
pnpm run lint
```

#### Format

```bash
# Will format all the supported `.ts,.js,json,.tsx,.jsx` files.
# See `@repo/eslint-config/prettier-base.js` to customize the behavior.
pnpm format
```

### Remote Caching

> [!TIP]
> Vercel Remote Cache is free for all plans. Get started today at [vercel.com](https://vercel.com/signup?/signup?utm_source=remote-cache-sdk&utm_campaign=free_remote_cache).

Turborepo can use a technique known as [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching) to share cache artifacts across machines, enabling you to share build caches with your team and CI/CD pipelines.

By default, Turborepo will cache locally. To enable Remote Caching you will need an account with Vercel. If you don't have an account you can [create one](https://vercel.com/signup?utm_source=turborepo-examples), then enter the following commands:

```bash
npx turbo login
```

This will authenticate the Turborepo CLI with your [Vercel account](https://vercel.com/docs/concepts/personal-accounts/overview).

Next, you can link your Turborepo to your Remote Cache by running the following command from the root of your Turborepo:

```bash
npx turbo link
```

## Useful Links

Learn more about the power of Turborepo:

- [Tasks](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)




- [TypeScript](https://www.typescriptlang.org/) for static type-safety
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Jest](https://prettier.io) & [Playwright](https://playwright.dev/) for testing