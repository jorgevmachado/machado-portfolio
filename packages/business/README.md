<div style="text-align: center;">
    <h1>business</h1>
    <br/>
<p>
    <strong>Powered by</strong>

![Npm](https://shields.io/badge/npm-gray?logo=npm&style=falt)
![Typescript](https://img.shields.io/badge/typescript-%23323330.svg?style=falt&logo=typescript&logoColor=%233178C6)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=falt&logo=node.js&logoColor=white)
![Jest](https://img.shields.io/badge/jest-C53d15.svg?style=falt&logo=jest&logoColor=white)
</p>
</div>

## Para que serve ?
### Módulo responsável por lidar com as regras de negócio em comum de todos os projetos (‘apps’). 

## Instalação do Ambiente
### Seguir as instruções do Readme Principal no ‘item’ Instalação do Ambiente [clique aqui](../../README.md). 

### Para usar o business dentro do projeto, basta adicionar o módulo no package.json do projeto.
```json
{
  "dependencies": {
    "@repo/business": "*"
  }      
}
```
### Depois é só importar a função do módulo desejado e navegar até o valor desejado
```typescript
import { User } from '@repo/business/auth/interface';
```

## 🏠  Comandos
#### Todos os comandos aqui listados, devem ser executados na raiz do módulo (./packages/business).

### Build
```bash
# Irá executar o build do módulo.
npm run build
```

### Develop

```bash
# Irá executar o módulo em modo de desenvolvimento.
npm run dev
```

### test

```bash
# Irá executar todos os testes do módulo.
npm run test
```

#### Lint

```bash
# Irá executar o lint no módulo.
# Veja `@repo/eslint-config` para personalizar o comportamento.
npm run lint
```
## Módulos
### api:
#### Funções de configurações de apis externas.

### auth:
#### Regras de negócios relacionadas a autenticação.

### paginate:
#### Funções utilitárias para construção de paginação.
```
    npm run test -- --findRelatedTests src/paginate/paginate.spec.ts                                 
```

### pokemon:
#### Regras de negócios relacionadas a api de pokemon.

### shared:
#### Funções utilitárias de recursos compartilhados de regras de negócios.
