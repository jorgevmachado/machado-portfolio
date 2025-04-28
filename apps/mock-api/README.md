<div style="text-align: center;">
    <h1>mock</h1>
    <br/>
<p>
    <strong>Powered by</strong>

![Npm](https://shields.io/badge/npm-gray?logo=npm&style=falt)
![Typescript](https://img.shields.io/badge/typescript-%23323330.svg?style=falt&logo=typescript&logoColor=%233178C6)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=falt&logo=node.js&logoColor=white)
</p>
</div>

## Para que serve ?
### Módulo responsável por criar uma api mockada para testes e desenvolvimento. 

## Instalação do Ambiente
### Seguir as instruções do Readme Principal no ‘item’ Instalação do Ambiente [clique aqui](../../README.md).
### Para usar o mock basta acessar um via serviço utilizando softwares como postman ou insomnia com http://localhost:9000.
### ou
### Para usar o mock dentro do projeto, basta adicionar o módulo no package.json do projeto.
```json
{
  "dependencies": {
    "@repo/mock": "*"
  }      
}
```
### Depois é só importar a função do módulo desejado e navegar até o valor desejado
```typescript
import { USER_FIXTURE } from '@repo/mock/fixtures/auth/auth.fixture';
```

## 🏠  Comandos
#### Todos os comandos aqui listados, devem ser executados na raiz do módulo (./packages/mock).

### Build
```bash
# Irá executar o build do módulo.
npm run build
```

### Watch

```bash
# Irá executar o módulo ouvindo a porta 9000.
npm run watch
```

#### Lint

```bash
# Irá executar o lint no módulo.
# Veja `@repo/eslint-config` para personalizar o comportamento.
npm run lint
```