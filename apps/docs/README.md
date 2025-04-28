<div style="text-align: center;">
    <h1>Documentação</h1>
    <br/>
<p>
    <strong>Powered by</strong>

![Typescript](https://img.shields.io/badge/typescript-%23323330.svg?style=falt&logo=typescript&logoColor=%233178C6)
![React](https://img.shields.io/badge/react-2C8EBB.svg?style=falt&logo=react&logoColor=white)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=falt&logo=node.js&logoColor=white)
![Jest](https://img.shields.io/badge/jest-C53d15.svg?style=falt&logo=jest&logoColor=white)
</p>
</div>

## Para que serve?
### Apresentação do Design System e do User Interface do Projeto.

## Estrutura da Biblioteca
> ex: button ...

```
├── src
│   ├── [module]
│   |   ├── index.ts
│   |   ├── [submodules]
|   |   |   ├── index.ts
```
ex:
```
├── src
│   ├── components
│   |   ├── button
│   |   |   ├── index.ts
│   |   |   ├── Button.tsx
│   |   |   ├── Button.scss
│   |   ├── index.ts
```

## Instalação do Ambiente
### Seguir as instruções do Readme Principal no ‘item’ Instalação do Ambiente [clique aqui](../../README.md).

## 🏠  Comandos
#### Todos os comandos aqui listados, devem ser executados na raiz do módulo (./apps/docs).

### Build
```bash
# Irá executar o build da documentação.
npm run build
```

#### Lint

```bash
# Irá executar o lint na biblioteca.
# Veja `@repo/eslint-config` para personalizar o comportamento.
npm run lint
```

### desenvolvimento
```bash
# Irá executar o storybook da marca geek.
npm run dev:geek

# Irá executar o storybook da marca law.
npm run dev:law

# Irá executar o storybook da marca finance.
npm run dev:finance
```

## Como usar?
### Para usar o design system dentro do projeto, basta adicionar a biblioteca no package.json e seguir os passos da instalação conforme [Instalação do Ambiente](#instalação-do-ambiente).
```json
{
  "dependencies": {
    "@repo/ds": "*"
  }      
}
```
### Depois é só importar a lib ds e navegar até o valor desejado
```typescript
import Button from '@repo/ds/components/button/Button';
```

### Para usar o user interface dentro do projeto, basta adicionar a biblioteca no package.json e seguir os passos da instalação conforme [Instalação do Ambiente](#instalação-do-ambiente).
```json
{
  "dependencies": {
    "@repo/ui": "*"
  }      
}
```
### Depois é só importar a lib ui e navegar até o valor desejado
```typescript
import Header from '@repo/ui/components/header/Header';
```