<div style="text-align: center;">
    <h1>NEST API</h1>
    <br/>
<p>
    <strong>Powered by</strong>

![Nest](https://img.shields.io/badge/-NestJs-ea2845?style=for-the-badge&logo=nestjs&logoColor=white)

![Npm](https://shields.io/badge/npm-gray?logo=npm&style=falt)
![Typescript](https://img.shields.io/badge/typescript-%23323330.svg?style=falt&logo=typescript&logoColor=%233178C6)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=falt&logo=node.js&logoColor=white)
![Jest](https://img.shields.io/badge/jest-C53d15.svg?style=falt&logo=jest&logoColor=white)
</p>
</div>
# With-NestJs | API

## Para que serve ?
Este projeto é uma API desenvolvida com o framework **NestJS**,
que é uma solução progressiva para construir aplicações server-side eficientes,
escaláveis e confiáveis em **Node.js**. A API utiliza **TypeScript**
seguindo testes automatizados com **Jest**.

## Instalação do Ambiente
### Seguir as instruções do Readme Principal no ‘item’ Instalação do Ambiente [clique aqui](../../README.md).

## 🏠  Comandos
#### Todos os comandos aqui listados, devem ser executados na raiz do módulo (./apps/api).

### Build
```bash
# Irá executar o build do módulo.
npm run build
```

### Develop

```bash
# Irá executar o módulo em modo de desenvolvimento. http://localhost:3001
npm run dev
```

### Lint
```bash
# Irá executar o lint no módulo.
# Veja `@repo/eslint-config` para personalizar o comportamento.
npm run lint
```
### test
```bash
# Irá executar todos os testes do módulo.
npm run test
```
#### base:
```bash
  npm run test -- --findRelatedTests src/shared/base/base.spec.ts                                 
```
#### query:
```bash
  npm run test -- --findRelatedTests src/shared/query/query.spec.ts                                 
```
#### file:
```bash
  npm run test -- --findRelatedTests src/shared/file/file.spec.ts                                 
```

#### validate:
```bash
  npm run test -- --findRelatedTests src/shared/validate/validate.spec.ts                                 
```

#### service:
```bash
  npm run test -- --findRelatedTests src/shared/service/service.spec.ts                                 
```

#### auth:
##### -INTERCEPTORS
```bash
  npm run test -- --findRelatedTests src/auth/interceptors/sanitize-user.interceptor.spec.ts                                 
```
##### - SERVICE
```bash
  npm run test -- --findRelatedTests src/auth/auth.service.spec.ts                                 
```
##### - CONTROLLER
```bash
  npm run test -- --findRelatedTests src/auth/auth.controller.spec.ts                                 
```
##### - user
###### - SERVICE
```bash
  npm run test -- --findRelatedTests src/auth/users/users.service.spec.ts                                 
```
#### pokemon:
##### - SERVICE
```bash
  npm run test -- --findRelatedTests src/pokemons/pokemon.service.spec.ts                                 
```
##### - CONTROLLER
```bash
  npm run test -- --findRelatedTests src/pokemons/pokemon.controller.spec.ts                                 
```
##### - ABILITY
###### - SERVICE
```bash
  npm run test -- --findRelatedTests src/pokemons/ability/ability.service.spec.ts                                 
```
###### - CONTROLLER
```bash
  npm run test -- --findRelatedTests src/pokemons/ability/ability.controller.spec.ts                                 
```
##### - MOVE
###### - SERVICE
```bash
  npm run test -- --findRelatedTests src/pokemons/move/move.service.spec.ts                                 
```
###### - CONTROLLER
```bash
  npm run test -- --findRelatedTests src/pokemons/move/move.controller.spec.ts                                 
```
##### - TYPE
###### - SERVICE
```bash
  npm run test -- --findRelatedTests src/pokemons/type/type.service.spec.ts                                 
```
###### - CONTROLLER
```bash
  npm run test -- --findRelatedTests src/pokemons/type/type.controller.spec.ts                                 
```
#### finance:
##### - SERVICE
```bash
  npm run test -- --findRelatedTests src/finance/finance.service.spec.ts                                 
```
##### - CONTROLLER
```bash
  npm run test -- --findRelatedTests src/finance/finance.controller.spec.ts                                 
```
##### - SUPPLIER-TYPE
###### - SERVICE
```bash
  npm run test -- --findRelatedTests src/finance/supplier/supplier-type/supplier-type.service.spec.ts                                 
```
###### - CONTROLLER
```bash
  npm run test -- --findRelatedTests src/finance/supplier/supplier-type/supplier-type.controller.spec.ts                                 
```
##### - SUPPLIER
###### - SERVICE
```bash
  npm run test -- --findRelatedTests src/finance/supplier/supplier.service.spec.ts                                 
```
###### - CONTROLLER
```bash
  npm run test -- --findRelatedTests src/finance/supplier/supplier.controller.spec.ts                                 
```
##### - BANK
###### - SERVICE
```bash
  npm run test -- --findRelatedTests src/finance/bank/bank.service.spec.ts                                 
```
###### - CONTROLLER
```bash
  npm run test -- --findRelatedTests src/finance/bank/bank.controller.spec.ts                                 
```
##### - EXPENSE
###### - SERVICE
```bash
  npm run test -- --findRelatedTests src/finance/bill/expense/expense.service.spec.ts                                 
```

##### - BILL-CATEGORY
###### - SERVICE
```bash
  npm run test -- --findRelatedTests src/finance/bill/bill-category/bill-category.service.spec.ts                                 
```
###### - CONTROLLER
```bash
  npm run test -- --findRelatedTests src/finance/bill/bill-category/bill-category.controller.spec.ts
                                   
```
##### - BILL
###### - SERVICE
```bash
  npm run test -- --findRelatedTests src/finance/bill/bill.service.spec.ts                                 
```
###### - CONTROLLER
```bash
  npm run test -- --findRelatedTests src/finance/bill/bill.controller.spec.ts                                 
```