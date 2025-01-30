<div style="text-align: center;">
    <h1>Eslint</h1>
    <br/>
<p>
    <strong>Powered by</strong>

![Javascript](https://img.shields.io/badge/javascript-%23323330.svg?style=falt&logo=javascript)
![Npm](https://shields.io/badge/npm-gray?logo=npm&style=falt)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=falt&logo=node.js&logoColor=white)
</p>
</div>

## Para que serve ?
### Módulo responsável pelas configurações de eslint de todos os módulos, bibliotecas e projetos.

## Instalação do Ambiente
### Seguir as instruções do Readme Principal no ‘item’ Instalação do Ambiente [clique aqui](../../README.md).

### Para usar o eslint-config dentro do projeto, basta adicionar o módulo no package.json do projeto.
```json
{
  "devDependencies": {
    "@repo/eslint-config": "*"
  }      
}
```
### Seguir os passos da instalação conforme [Instalação do Ambiente](#instalação-do-ambiente).
### Depois criar um arquivo `.eslintrc.js` e selecionar qual grupo do eslint deseja adicionar ao projeto.
```javascript
// No Exemplo em extends está sendo utilizado o grupo de configurações do nest.js.
/** @type {import("eslint").Linter.Config} */
module.exports = {
    extends: ['@repo/eslint-config/nest.js'],
    parserOptions: {
        project: 'tsconfig.lint.json',
        tsconfigRootDir: __dirname,
    },
};
```
### por fim no `package.json` adicionar os comandos para executar o lint.
```json
{
  "scripts": {
    "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --max-warnings 0 --fix"
  }      
}
```
## rules
## semi
### É utilizado para verificar o uso de pont e vírgula no final de instruções JavaScript.
#### Primeiro elemento do Array
##### 1 - 'error': Marca o uso incorreto como erro.
##### 2 - 'warn': Marca o uso incorreto como aviso.
##### 3 - 'off': Desativa a regra.
#### Segundo elemento do Array
##### 1 - 'always': Exige em todas as instruções.
##### 2 - 'never': Proíbe em todas as instruções.
##### 3 - 'always-multi-line': Exige apenas em instruções multi linhas.
#### Exemplo:
```
semi: ['error', 'always'],
// Errado
const x = 5
// Certo
const x = 5;
```

## quotes
###  É utilizada para especificar o tipo de aspas utilizadas em ‘strings’ JavaScript.
#### Primeiro elemento do Array
##### 1 - 'error': Marca o uso incorreto como erro.
##### 2 - 'warn': Marca o uso incorreto como aviso.
##### 3 - 'off': Desativa a regra.
#### Segundo elemento do Array
##### 1 - 'single': Exige aspas simples ('') para strings.
##### 2 - 'double': Exige aspas duplas ("") para strings.
##### 3 - 'prefer-single': Prefere aspas simples, mas permite aspas duplas.
##### 4 - 'prefer-double': Prefere aspas duplas, mas permite aspas simples.
#### Exemplo:
```
quotes: ['error', 'single'],
// Errado
const x = "hello";
// Correto
const x = 'hello';
```

## 'object-curly-spacing'
### Verifica se há espaços entre chaves ({}) em objetos JavaScript.
#### Primeiro elemento do Array
##### 1 - 'error': Marca o uso incorreto como erro.
##### 2 - 'warn': Marca o uso incorreto como aviso.
##### 3 - 'off': Desativa a regra.
#### Segundo elemento do Array
##### 1 - 'always': Exige espaços entre chaves.
##### 2 - 'never': Proíbe espaços entre chaves.
#### Exemplo:
```
'object-curly-spacing': ['error', 'always']
// Errado
const obj = {a:1,b:2};
// Correto
const obj = { a: 1, b: 2 };
```

## 'object-curly-spacing'
### Verifica se há espaços entre chaves ({}) em objetos JavaScript.
#### Primeiro elemento do Array
##### 1 - 'error': Marca o uso incorreto como erro.
##### 2 - 'warn': Marca o uso incorreto como aviso.
##### 3 - 'off': Desativa a regra.
#### Segundo elemento do Array
##### 1 - 'always': Exige espaços entre chaves.
##### 2 - 'never': Proíbe espaços entre chaves.
#### Exemplo:
```
'object-curly-spacing': ['error', 'always']
// Errado
const obj = {a:1,b:2};
// Correto
const obj = { a: 1, b: 2 };
```

## '@typescript-eslint/no-explicit-any'
### Proíbe o uso explícito do tipo 'any' em código TypeScript.
#### Opções
##### 1 - 'error': Marca o uso incorreto como erro.
##### 2 - 'warn': Marca o uso incorreto como aviso.
##### 3 - 'off': Desativa a regra.
#### Exemplo:
```
'@typescript-eslint/no-explicit-any': 'error',
// Errado
let variavel: any = 'valor';
// Correto
let variavel: string = 'valor';
```

## 'space-before-function-paren'
### Verifica se há espaços antes dos parênteses em funções.
#### Primeiro elemento do Array
##### 1 - 'error': Marca o uso incorreto como erro.
##### 2 - 'warn': Marca o uso incorreto como aviso.
##### 3 - 'off': Desativa a regra.
#### Segundo elemento do Array
##### 1 - 'named': Regra para funções nomeadas:
##### 1.1 - 'never': Não permite espaços.
##### 1.2 - 'always': Exige espaços.
##### 1.3 - 'ignore': Ignora.
##### 2 - 'anonymous': Regra para funçÕes anônimas:
##### 2.1 - 'never': Não permite espaços.
##### 2.2 - 'always': Exige espaços.
##### 2.3 - 'ignore': Ignora.
##### 3 - 'asyncArrow': Regra para funções assíncronas com arrow.
##### 3.1 - 'never': Não permite espaços.
##### 3.2 - 'always': Exige espaços.
##### 3.3 - 'ignore': Ignora.
#### Exemplo:
```
'space-before-function-paren': ['error', {
            'named': 'never',
            'anonymous': 'always',
            'asyncArrow': 'always'
}],
// signficado:
1. Funções nomeadas: não permitir espaços.
2. Funções anônimas: exigir espaços.
3. Funções assíncronas com arrow: exigir espaços.

// Errado (named)
function minhaFunção () {}

// Correto (named)
function minhaFunção(){}

// Errado (anonymous)
var foo = function () {};

// Correto (anonymous)
var foo = function(){}

// Errado (asyncArrow)
const asyncFoo = async () => {};

// Correto (asyncArrow)
const asyncFoo = async() => {}
```

## 'sort-imports'
### Garante que as importações sejam organizadas de forma consistente.
#### Primeiro elemento do Array
##### 1 - 'error': Marca o uso incorreto como erro.
##### 2 - 'warn': Marca o uso incorreto como aviso.
##### 3 - 'off': Desativa a regra.
#### Segundo elemento do Array
##### 1 - 'ignoreCase': Ignora caso (maiúsculo/minúsculo) ao ordenar.
##### 1.1 - 'false' (padrão): Considera caso.
##### 1.2 - 'true': Ignora caso.
##### 2 - 'ignoreMemberSort': Ignora ordenação de membros.
##### 2.1 - 'false' (padrão): Ordena membros.
##### 2.2 - 'true': Ignora ordenação.
##### 3 - 'allowSeparatedGroups': Permite grupos separados.
##### 3.1 - 'false' (padrão): Permite.
##### 3.2 - 'true': Não permite.
##### 4 - 'memberSyntaxSortOrder': Ordena membros por sintaxe.
##### 4.1 - 'none': Não ordena.
##### 4.2 - 'all': Ordena todos.
##### 4.3 - 'multiple': Ordena múltiplos.
##### 4.4 - 'single': Ordena Simples.
##### 5 - 'ignoreDeclarationSort': Ignora ordenação de declarações.
##### 5.1 - 'false' (padrão): Ordena declarações.
##### 5.2 - 'true': Ignora ordenação.
```
'sort-imports': ['error', {
            'ignoreCase': false,
            'ignoreMemberSort': false,
            'allowSeparatedGroups': true,
            'memberSyntaxSortOrder': ['none', 'all', 'multiple', 'single'],
            'ignoreDeclarationSort': false,
}],
// signficado:
1. Não ignora caso.
2. Ordena membros.
3. Permite grupos separados.
4. Ordena membros por sintaxe (nenhum, todos, múltiplos ou simples).
5. Não ignora declarações.


// Errado:
import { B } from 'modulo';
import { A } from 'modulo';

// Correto:
import { A, B } from 'modulo';
```

## 'keyword-spacing'
### Verifica se há espaços adequados antes e depois das palavras-chave JavaScript. Isso melhora a legibilidade do código.
#### Primeiro elemento do Array
##### 1 - 'error': Marca o uso incorreto como erro.
##### 2 - 'warn': Marca o uso incorreto como aviso.
##### 3 - 'off': Desativa a regra.
#### Segundo elemento do Array
##### 1 - 'before': Verifica espaços antes das palavras-chave.
##### 1.1 - 'true': Exige espaços.
##### 1.2 - 'false': Não Exige espaços.
##### 2 - 'after': Verifica espaços depois das palavras-chave.
##### 1.1 - 'true': Exige espaços.
##### 1.2 - 'false': Não Exige espaços.
```
'keyword-spacing': ['error', { 'before': true, 'after': true }]
// signficado:
1. Exige espaços antes das palavras-chave.
2. Exige espaços depois das palavras-chave.
Errado:
if(true){}

Correto:
if (true) {}

Errado:
function nome(){}

Correto:
function nome () {}

Palavras-chave afetadas

- if
- else
- for
- while
- function
- class
- switch
- case
- default
- try
- catch
- finally
```