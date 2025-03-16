<div style="text-align: center;">
    <h1>JEST</h1>
    <br/>
<p>
    <strong>Powered by</strong>

![Jest](https://img.shields.io/badge/jest-C53d15.svg?style=falt&logo=jest&logoColor=white)

![Npm](https://shields.io/badge/npm-gray?logo=npm&style=falt)
![Typescript](https://img.shields.io/badge/typescript-%23323330.svg?style=falt&logo=typescript&logoColor=%233178C6)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=falt&logo=node.js&logoColor=white)
</p>
</div>

## Para que serve ?
### Módulo responsável pelas configurações de testes de todos os módulos, bibliotecas e projetos.

## Instalação do Ambiente
### Seguir as instruções do Readme Principal no ‘item’ Instalação do Ambiente [clique aqui](../../README.md).

### Para usar o jest dentro do projeto, basta adicionar o módulo no package.json do projeto.
```json
{
  "devDependencies": {
    "@jest/globals": "^29.7.0",
    "jest": "^29.7.0",
    "ts-jest": "^29.2.5",
    "@repo/jest": "*"
  }      
}
```
### Seguir os passos da instalação conforme [Instalação do Ambiente](#instalação-do-ambiente).
### Depois criar um arquivo `jest.config.ts` e selecionar qual grupo do eslint deseja adicionar ao projeto.
```typescript
// No Exemplo está sendo utilizado o grupo de configurações do nest.
import { config } from '@repo/jest/nest';

export default config;
```
### por fim no `package.json` adicionar os comandos para executar o lint.
```json
{
  "scripts": {
    "test": "jest",
    "test:watch": "jest --watch",
    "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
    "test:e2e": "jest --config ./test/jest-e2e.json"
  }      
}
```