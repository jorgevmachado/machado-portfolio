<div style="text-align: center;">
    <h1>services</h1>
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
### Módulo responsável por fornecer funções utilitárias em comum para todos os módulos, bibliotecas e projetos(apps).

## Instalação do Ambiente
### Seguir as instruções do Readme Principal no ‘item’ Instalação do Ambiente [clique aqui](../../README.md).

### Para usar o services dentro do projeto, basta adicionar o módulo no package.json do projeto.
```json
{
  "dependencies": {
    "@repo/services": "*"
  }      
}
```
### Depois é só importar a função do módulo desejado e navegar até o valor desejado
```typescript
import { cpfValidator } from '@repo/services/validator/document/document';
```

## 🏠  Comandos
#### Todos os comandos aqui listados, devem ser executados na raiz do módulo (./packages/services).

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
### cookies:
#### Funções para manipulação de cookies.
```
    npm run test -- --findRelatedTests src/cookies/cookies.spec.ts               
```

### date:
#### Utilitários ou manipuladores de datas.
```
    npm run test -- --findRelatedTests src/date/date.spec.ts               
```
### formatter:
#### Funções que formatam dados (datas, números, strings, etc.).
```
    npm run test -- --findRelatedTests src/formatter/formatter.spec.ts               
    npm run test -- --findRelatedTests src/formatter/address/address.spec.ts               
    npm run test -- --findRelatedTests src/formatter/contact/contact.spec.ts               
    npm run test -- --findRelatedTests src/formatter/currency/currency.spec.ts               
    npm run test -- --findRelatedTests src/formatter/document/document.spec.ts               
```

### http:
#### Funções para realizar chamadas HTTP ou gerenciar requisições e respostas.
```
    npm run test -- --findRelatedTests src/http/http.spec.ts               
```

### object:
#### Utilitários ou manipuladores de objetos.
```
    npm run test -- --findRelatedTests src/object/object.spec.ts               
```

### string:
#### Utilitários relacionados a manipulação ou validação de 'strings'.
#### testes
```bash
  npm run test -- --findRelatedTests src/string/string.spec.ts               
```
##### uuid: Gera uma 'string' UUID (identificador universal único) com base na data fornecida.
##### isUUID: Verifica se uma 'string' é um UUID válido.
##### initials: Retorna as iniciais de uma 'string' com um número específico de letras. 
##### normalize: Remove acentos e espaços extras e Normaliza espaços múltiplos para um único espaço.
##### formatUrl: Constrói uma URL formatada com caminho adicional ('path') e parâmetros de consulta ('params').
##### capitalize: Retorna uma 'string' com a primeira letra em maiúscula.
##### toSnakeCase: Converte strings em camel case (ou similares) para snake case (formato `snake_case`).
##### toCamelCase: Converte strings no formato `snake_case` para camel case.
##### findRepeated: Procura duplicatas numa lista de objetos com base numa chave definida ('id' ou 'name').
##### truncateString: Trunca uma 'string' para o comprimento especificado ('length') e converte para maiúsculas.
##### separateCamelCase: Separa palavras em camel case ('CamelCase') para uma versão com espaços e capitalização individual.
##### snakeCaseToNormal: Converte uma 'string' snake_case fornecida em uma string case normal legível por humanos.
##### extractLastItemFromUrl: Extrai o último segmento de uma URL.

### number:
#### Utilitários relacionados a manipulação ou validação de numbers.
```
    npm run test -- --findRelatedTests src/number/number.spec.ts               
```
### validator:
#### Funções para validação de entrada de dados ou outros tipos de verificações.
```
    npm run test -- --findRelatedTests src/validator/validator.spec.ts
    npm run test -- --findRelatedTests src/validator/address/address.spec.ts   
    npm run test -- --findRelatedTests src/validator/contact/contact.spec.ts
    npm run test -- --findRelatedTests src/validator/document/document.spec.ts
    npm run test -- --findRelatedTests src/validator/password/password.spec.ts            
    npm run test -- --findRelatedTests src/validator/personal/personal.spec.ts            
```

### window:
#### Funções relacionadas ao objeto `window` (provavelmente para navegadores).
```
    npm run test -- --findRelatedTests src/window/window.spec.ts               
```

### error:
#### Função relacionado a tratamento de erros.
```
    npm run test -- --findRelatedTests src/error/error.spec.ts               
```

### entities
```bash
    npm run test -- --findRelatedTests src/entities/entities.spec.ts               
```
