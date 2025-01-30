<div style="text-align: center;">
    <h1>Typescript</h1>
    <br/>
<p>
    <strong>Powered by</strong>

![Typescript](https://img.shields.io/badge/typescript-%23323330.svg?style=falt&logo=typescript&logoColor=%233178C6)
![Npm](https://shields.io/badge/npm-gray?logo=npm&style=falt)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=falt&logo=node.js&logoColor=white)
</p>
</div>

## Para que serve ?
### Módulo responsável pelas configurações de typescript de todos os módulos, bibliotecas e projetos.

## Instalação do Ambiente
### Seguir as instruções do Readme Principal no ‘item’ Instalação do Ambiente [clique aqui](../../README.md).

### Para usar o typescript dentro do projeto, basta adicionar o módulo no package.json do projeto.
```json
{
  "devDependencies": {
    "typescript": "^5.7.3",
    "@repo/typescript": "*"
  }      
}
```
### Seguir os passos da instalação conforme [Instalação do Ambiente](#instalação-do-ambiente).
### Depois criar um arquivo `tsconfig.json` e selecionar qual grupo do typescript deseja adicionar ao projeto.
#### No Exemplo em extends está sendo utilizado o grupo de configurações do nestjs.json
```json
{
  "extends": "@repo/typescript/nestjs.json",
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist"
  }
}


```
# Rules
## incremental
### Salve arquivos .tsbuildinfo para permitir a compilação incremental de projetos.
#### Serve para habilitar a compilação incremental do Typescript
### Comportamento padrão
#### Quando não é especificado o typescript assume como `"incremental": true` apenas quando usado o modo de compilação `watch` `(tsc --watch)`
### Quando `"incremental": true`
#### 1 - Acelera a compilação: reutiliza informações de compilações anteriores.
#### 2 - Reduz o tempo de build: Somente recompila arquivos alterados.
#### 3 - Melhora o desempenho: Reduza a carga de processamento
### funcionamento:
#### 1 - Cria um arquivo `.tsbuildinfo` para armazenar informações de compilação.
#### 2 - Verifica quais arquivos foram alterados desde a última compilação.
#### 3 - Recompila apenas os arquivos alterados e seus dependentes
### considerações:
#### 1 - Útil para projetos grandes ou com muitos arquivos.
#### 2 - Pode ser usada com outras flags, como "watch".
#### 3 - Requer o arquivo `tsconfig.json` para funcionar

## composite
### Habilite restrições que permitem que um projeto TypeScript seja usado com referências de projeto.
#### Controla se o typescript deve gerar arquivos de declaração (*.d.ts) para módulos que dependem de outros módulos.
### Comportamento padrão
#### Quando não é especificado, o typescript assume como `"composite": true` apenas se estiver usando `"module": "commonjs"` ou `"module": "amd"`
### Quando `"composite": true`
#### 1 - Gera arquivos de declaração para módulos dependentes.
#### 2 - Habilita a composição de módulos
### Considerações:
#### 1 - Útil para projetos com muitos módulos interdependentes.
#### 2 - Pode afetar a performance da compilação
#### 3 - Requer o arquivo `tsconfig.json` para funcionar

----

# Language and Environment
## target
### Define a versão da linguagem JavaScript para o JavaScript emitido e inclui declarações de biblioteca compatíveis.
#### Especifica a versão do ECMAScript(JavaScript) que o código compilado deve ser compatível.
### Comportamento padrão
#### Quando não é especificado o typescript assume como `"target": "es2015"`
#### Para versões do TypeScript a partir de (4.3) para as anteriores se assume `"target": "es3"`
### Comportamento
#### 1 - Especifica a versão de ECMAScript para compilação.
#### 2 - Define a sintaxe e recursos suportados.
#### 3 - Influencia a compatibilidade com navegadores e ambientes.
### Opções comuns:
#### 1 - "es3" (Compatível com IE6+).
#### 2 - "es5" (Compatível com IE9+).
#### 3 - "es2015" (Compatível com navegadores modernos).
#### 4 - "es2016".
#### 5 - "es2017".
#### 6 - "es2018".
#### 7 - "es2019".
#### 8 - "es2020".
#### 9 - "es2022".
#### 10 - "esnext" (Versão mais recente).
### Considerações:
#### 1 - Verifique a compatibilidade com o ambiente de execução.
#### 2 - Utilize "module" junto com "target" para definir o formato de módulo.

## lib
### Especifique um conjunto de arquivos de declaração de biblioteca agrupados que descrevem o ambiente de tempo de execução de destino.
#### Especifica quais bibliotecas de tipos padrão do TypeScript devem ser incluídas no projeto
### Comportamento padrão
#### Quando não é especificado o typescript inclui tipos padrão com base na versão.
### Comportamento
#### 1 - Especifica bibliotecas de tipos para compilação.
#### 2 - Permite inclusão de tipos para
##### 2.1 - ECMAScript (ES5, ES6, etc.).
##### 2.2 - DOM.
##### 2.3 - WebWorker.
##### 2.4 - Node.js.
#### 3 - Ajuda na compatibilidade entre versões
### Opções comuns:
#### 1 - "es5"
#### 2 - "es2015"
#### 3 - "es2020"
#### 4 - "es2022"
#### 5 - "DOM"
#### 6 - "DOM.Iterable"
#### 7 - "webworker"
#### 8 - "node"

----

## moduleDetection
### Controla qual método é usado para detetar arquivos JS em formato de módulo.
#### Controla como o TypeScript deteta automaticamente o formato de módulo (CommonJs ou ES6) para arquivos sem declaração explícita.
### Comportamento padrão
#### Quando não é especificado o typescript assume como `"moduleDetection": "auto"`
### Opções
#### 1 - "auto" (Padrão, deteta automaticamente o formato de módulo com base no conteúdo do arquivo.)
#### 2 - "node" (Força a deteção como módulo CommonJs, semelhante ao comportamento do Node.js).
#### 3 - "none" (Desativa a deteção automática de módulos).
#### 4 - "force" (Força a deteção de módulos, independentemente de declarações explícitas).
### Considerações:
#### 1 - Útil para projetos que utilizam módulos mistos (CommonJs e ES6).
#### 2 - Influencia a compatibilidade com ambiente de execução.
#### 3 - Utilize com `"module"` e `"target"` para definir o formato de módulo.

----

----

----

## experimentalDecorators
### Habilita suporte experimental para decoradores experimentais legados.
#### Habilita ou desabilita o suporte a decoradores experimentais.
### Comportamento padrão
#### Quando não é especificado o typescript assume como `"experimentalDecorators": false`
### Quando `"experimentalDecorators": true`
#### 1 - Permite utilizar decoradores para classes, métodos e propriedades, possibilitando:
#### 1.1 - Adicionar funcionalidades sem alterar o código original.
#### 1.2 - Implementar padrões de projeto como Singleton e Factory.
#### 1.3 - Melhorar a organização e reutilização de código.
### Considerações:
#### 1 - Flexibilidade e reutilização de código.
#### 2 - Suporte a bibliotecas e ‘frameworks’ que utilizem decoradores.
#### 3 - Possibilidade de criar padrões de projeto personalizados.

## emitDecoratorMetadata
### Emite metadados de tipo de design para declarações decoradas em arquivos de origem.
#### Habilita ou desabilita a emissão de metadados para decoradores. Permite que bibliotecas como Angular e outros ‘frameworks’ utilizem esses metadados para gerenciar dependências, injeção de dependências e outras finalidades.
### Comportamento padrão
#### Quando não é especificado o typescript assume como `"emitDecoratorMetadata": false`
### Quando `"emitDecoratorMetadata": true`
#### 1 - habilita a emissão de metadados para decoradores.
### Considerações:
#### 1 - Suporte a decoradores para ‘framework’ como Angular.
#### 2 - Melhoria na gerência de dependências.
#### 3 - Facilita a injeção de dependências.

# Modules

## module
### Especifique qual código do módulo é gerado.
#### Especifica o formato de módulo para o código compilado pelo TypeScript.
### Comportamento padrão
#### Quando não é especificado o typescript assume como `"module": "commonjs"` para projetos Node.js e `"module": "es6"` para projetos não Node.js
### Opções de formato de módulo
#### 1 - None (Não gera módulos).
#### 2 - commonjs (Compatível com Node.js e require.js).
#### 3 - amd (Compatível com require.js).
#### 4 - umd (Compatível com amd e commonjs).
#### 5 - system (Compatível com SystemJS).
#### 6 - es6 (Compatível com módulos ES6).
#### 7 - es2015 (Compatível com módulos ES6).
#### 8 - esnext (Compatível com módulos ES6+).
#### 8 - es2020 (Compatível com módulos ES6+).
#### 9 - Node10 (Compatível com Node.js 10+).
#### 10 - Node16 (Compatível com Node.js 16+).
#### 11 - Node18 (Compatível com Node.js 18+).
#### 12 - NodeNext (Compatível com a última versão do Node.js).
### Considerações:
#### 1 - Verifique a compatibilidade com o ambiente de execução.
#### 2 - Utilize "target" junto com "module" para definir a versão de ECMAScript.
#### 3 - Ajuste "moduleResolution" para resolver módulos.

## moduleResolution
### Especifique como o TypeScript procura um arquivo de um determinado especificador de módulo
#### Especifica como o TypesScript resolve módulos importados.
### Comportamento padrão
#### Quando não é especificado o typescript assume como `"moduleResolution": "node"`
### Opções
#### 1 - "node": Utiliza o algoritmo de resolução de módulos do Node.js, que procura módulos em
##### 1.1 - Pasta Atual.
##### 1.2 - node_modules/ .
##### 1.3 - Pasta pai.
#### 2 - "classic": Utiliza o algoritmo de resolução de módulos clássicos, que procura por módulos em
##### 2.1 - Pasta Atual.
##### 2.2 - Pasta pai.
#### 3 - "NodeNext": Utiliza o algoritmo de resolução de módulos do Node.js mais recentes, que procura módulos em
##### 1.1 - Pasta Atual.
##### 1.2 - node_modules/ .
##### 1.3 - Pasta pai.
### Considerações:
#### 1 - Influencia a compatibilidade com ambientes de execução.
#### 2 - Utilize com `"module"` e `"target"` para definir o formato de módulo.
#### 3 - "node" é recomendado para projetos Node.js.

## baseUrl
### Especifique o diretório base para resolver nomes de módulos não relativos.
#### Especifica o diretório raiz para resolução de imports relativos.
### Comportamento padrão
#### Quando não é especificado o typescript:
### 1 - O diretório atual (.) é considerado o baseUrl.
### 2 - Imports relativos são resolvidos a partir do arquivo atual.
### Vantagens
#### 1 - Simplifica imports relativos.
#### 2 - Melhora a organização do código.
#### 3 - Facilita a migração para outros projetos.
### Considerações:
#### 1 - Utilizar `"baseUrl": "src"` com "paths" para mapear imports.
#### 2 - Configurar `"baseUrl": "src"` em projetos grandes.
#### 3 - Verificar compatibilidade com outras flags.

## resolveJsonModule
### Habilita a importação de arquivos (.json).
#### Habilita o suporte a importação de arquivos JSON como módulos no TypeScript.
### Comportamento padrão
#### Quando não é especificado o typescript assume como `"resolveJsonModule": true`
#### Para versões do TypeScript a partir de (4.5) para as anteriores se assume `"resolveJsonModule": false`
### Quando `"resolveJsonModule": true`
#### 1 - Permite importar arquivos JSON como módulos.
#### 2 - Habilita a resolução de arquivos JSON.
#### 3 - Suporte a tipos de dados JSON.
### Considerações:
#### 1 - Útil para projetos que utilizam JSON.
#### 2 - Requer `"esModuleInterop": true` para interoperabilidade em módulos ES.
#### 3 - Suporte a arquivos JSON com extensão (.json).



----

# JavaScript Support
## allowJs
### Permite que arquivos JavaScript façam parte do seu programa. Use a opção 'checkJS' para obter erros desses arquivos.
#### Permite compilar arquivos JavaScript (.js) com arquivos TypeScript (.ts). Com a finalidade:
#### 1 - Habilitar compilação de arquivos JavaScript.
#### 2 - Permitir migração gradual de JavaScript para TypeScript.
#### 3 - Suporte a projetos hibridos.
### Comportamento padrão
#### Quando não é especificado o typescript assume como `"allowJs": false` em quando `"strict": true` e `"allowJs": true` para os demais.
### Quando `"allowJs": true`
#### 1 - Flexibilidade na migração para TypeScript.
#### 2 - Suporte a bibliotecas JavaScript.
#### 3 - Possibilidade de usar TypeScript e JavaScript juntos.
### Considerações:
#### 1 - Utilizar "allowJs" durante a migração para TypeScript.
#### 2 - Configurar `"checkJs": true` para verificar erros.
#### 3 - Limitar o uso de `"allowJs": true` a arquivos específicos.

----

# Emit
## declaration
### Gere arquivos .d.ts a partir de arquivos TypeScript e JavaScript em seu projeto.
#### Controla a geração de arquivos (.d.ts) pelo Typescript
### Comportamento padrão
#### Quando não é especificado o typescript assume como `"declaration": false`
### Quando `"declaration": true`
#### 1 - Gera arquivos de declaração (.d.ts) para cada arquivo TypeScript (.ts).
#### 2 - Permite que outros projetos utilizem tipos definidos no projeto atual.
#### 3 - Útil para bibliotecas e módulos.
### Considerações:
#### 1 - Útil para criar bibliotecas e módulos.
#### 2 - Pode aumentar o tempo de compilação.
#### 3 - Combina-se com `"outDir"` para organizar arquivos gerados.

## declarationMap
### Cria mapas de origem para arquivos d.ts.
#### Controla a geração de mapas de declaração (.d.ts.map) para arquivos de declaração gerados pelo TypeScript
#### Deve ser usado em conjunto com a flag `"declaration": true`
### Comportamento padrão
#### Quando não é especificado o typescript assume como `"flag": false`
### Quando `"declarationMap": true`
#### 1 - Gera arquivos (.d.ts.map) para mapear declarações.
#### 2 - Permite navegação e depuração mais precisas.
#### 3 - Útil para bibliotecas e módulos
### Considerações:
#### 1 - Requer a flag `"declaration": true`.
#### 2 - Aumenta a quantidade de arquivos gerados.
#### 3 - Útil para projetos complexos e bibliotecas.

## sourceMap
### Cria arquivos de mapa de origem para arquivos JavaScript emitidos.
#### Habilita ou desabilita a geração de arquivos de mapa de fonte (source maps) durante a compilação do TypeScript
### Comportamento padrão
#### Quando não é especificado o typescript assume como `"sourceMap": false`
### Quando `"sourceMap": true`
#### 1 - Habilita a geração de source maps.
### Considerações:
#### 1 - Vantagem de depuração mais fácil, mapeia código compilado para código-fonte original.
#### 2 - Identificação precisa de erros.
#### 3 - Melhoria na experiência de desenvolvimento.

## inlineSources
### Inclui o código-fonte nos mapas de origem dentro do JavaScript emitido.
#### Controla se o TypeScript inclui código-fonte (.ts) nos arquivos de mapa de origem (.map) gerados durante a compilação.
#### Deve ser usado em conjunto com a flag `"sourceMap": true`
### Comportamento padrão
#### Quando não é especificado o typescript assume como `"inlineSources": false`
### Quando `"inlineSources": true`
#### 1 - Inclui código-fonte (.ts) nos arquivos (.map).
#### 2 - Permite depuração mais detalhada.
#### 3 - Útil para debugar aplicativos.
### Considerações:
#### 1 - Aumenta tamanho dos arquivos (.map).
#### 2 - Pode afetar o desempenho.
#### 3 - Útil para ambientes de desenvolvimento.

## outDir
### Especifique uma pasta de saída para todos os arquivos emitidos.
#### Especifica o diretório de saída para os arquivos compilados em JavaScript. Determina onde os arquivos JavaScript compilados serão salvos.
### Comportamento padrão
#### Quando não é especificado o typescript:
### 1 - Não compacta arquivos.
### 2 - Mantém arquivos no mesmo diretório do arquivo TypeScript original.
### Vantagens
#### 1 - Organização: Separa arquivos TypeScript de JavaScript.
#### 2 - Facilita deploy: compacta arquivos em um diretório.
#### 3 - Melhoria na legibilidade.
### Considerações:
#### 1 - Utilizar `"outdir"` com  `"sourceRoot"` para manter estrutura de pastas.
#### 2 - Configurar `"outdir"` em projetos grandes.
#### 3 - Verificar compatibilidade com outras ‘flags’.

## removeComments
### Desativa a emissão de comentários.
#### Controla se o TypeScript deve remover cometários do código compilado.
### Comportamento padrão
#### Quando não é especificado o typescript assume como `"removeComments": false`
### Quando `"removeComments": true`
#### 1 - Remove comentários.
### Considerações:
#### 1 - Redução do tamanho do código
#### 2 - Melhoria no desempenho.
#### 3 - Proteção de código sensível.

## importHelpers
### Permite importar funções auxiliares do tslib uma vez por projeto, em vez de incluí-las por arquivo.
#### Controla se o TypeScript deve incluir helpers (Funções auxiliares) em cada arquivo compilado ou importá-las de um módulo separado.
### Comportamento padrão
#### Quando não é especificado o typescript assume como `"importHelpers": true`
### Quando `"importHelpers": true`
#### 1 - Redução do tamanho do código compilado.
#### 2 - Melhoria no desempenho.
#### 3 - Evita duplicação de código.
### Considerações:
#### 1 - Requer importação adicional.
#### 2 - Pode causar problemas de compatibilidade.

## downlevelIteration
### Emite JavaScript mais compatível, mas detalhado e com menos desempenho para iteração.
#### Controla como o TypeScript lida com iterações (laços "for...of") em versões antigas do JavaScript.
### Comportamento padrão
#### Quando não é especificado o typescript assume como `"downlevelIteration": false`
### Quando `"downlevelIteration": true`
#### 1 - Habilita suporte a iterações em versões antigas (IE, Node.js < 10).
### Considerações:
#### 1 - Suporte a iterações em navegadores antigos (IE).
#### 2 - Compatibilidade com Node.js < 10.
#### 3 - Melhoria na experiência de desenvolvimento.


----

# Interop Constraints

## allowSyntheticDefaultImports
### Permitir 'importar x de y' quando um módulo não tem uma exportação padrão.
#### Permite importações ‘default’ sintéticas, habilitando a importação de módulos que não têm uma exportação ‘default’ explícita.
### Comportamento padrão
#### Quando não é especificado o typescript assume como `"allowSyntheticDefaultImports": false` em casos que o `"strict": true` e `"moduleResolutions": "node"` nos demais caso assume o valor `"allowSyntheticDefaultImports": true`.
### Quando `"allowSyntheticDefaultImports": true`
#### 1 - Compatibilidade com bibliotecas que utilizam exportações nomeadas.
#### 2 - Flexibilidade na importação de módulos.
#### 3 - Suporte a imports default em módulos CommonJS
### Considerações:
#### 1 - Habilitar para utilizar bibliotecas com exportações nomeadas.
#### 2 - Verificar documentação das bibliotecas utilizadas.
#### 3 - Utilizar `"esModuleInterop": true` junto com essa flag.

## esModuleInterop
### Emite JavaScript adicional para facilitar o suporte à importação de módulos CommonJS. Isso habilita 'allowSyntheticDefaultImports' para compatibilidade de tipo.
#### Permite interoperabilidade entre módulos ES6 e módulos CommonJS. Quando habilitado, essa opção permite módulos ES6 sejam importados como se fossem módulos CommonJS.
### Comportamento padrão
#### Quando não é especificado o typescript assume como `"esModuleInterop": false`
### Quando `"esModuleInterop": true`
#### 1 - Módulos ES6 poderão ser importados como módulos CommonJS.
#### 2 - Será possível usar a sintaxe "require" para importar módulos ES6.
#### 3 - Erros de tipo não serão gerados ao tentar importar módulos ES6 como CommonJS.
### Considerações:
#### 1 - Compatibilidade: permite usar bibliotecas ES6 com CommonJS.
#### 2 - Desempenho: pode afetar o desempenho, pois o TypeScript precisa realizar conversões adicionais.
#### 3 - Tipagem: pode afetar a precisão de tipos, pois módulos ES6 são ttratados como CommonJS.
#### 4 - Configuração: certifique-se de que todas as dependências sejam compatíveis com essa opção.

## forceConsistentCasingInFileNames
### Certifique-se de que as maiúsculas e minúsculas estejam corretas nas importações.
#### Garante que o TypeScript trate nomes de arquivos com casing(maiúsculas/minúsculas) consistente, evitando erros de importação e referência
### Comportamento padrão
#### Quando não é especificado o typescript assume como `"forceConsistentCasingInFileNames": false`
### Quando `"forceConsistentCasingInFileNames": true`
#### 1 - Trata nomes de arquivos com casing consistente.
#### 2 - Evita erros de importação e referência.
#### 3 - Garante compatibilidade entre sistemas operacionais.
### Considerações:
#### 1 - Útil para projetos multiplataformas.
#### 2 - Evita erros em sistemas operacionais sensíveis a caso (Linux, macOS).
#### 3 - Recomendado para projetos grandes e complexos.

----

# Type Checking
## strict
### Ativa o modo estrito do Typescript, habilitando verificações rigorosas de tipos e erros.
### Comportamento padrão
#### Quando não é especificado, o typescript assume como `"strict": false`, dando a possibilidade de ser substituido por  flags como:
```sh
    "strictNullChecks": true.
    "strictFunctionTypes": true,
    "strictBindCallApply": true,
    "strictPropertyInitialization": true,
    "strictBuiltinIteratorReturn": true, 
```
### Quando `"strict": true`
#### 1 - Verificação de tipos rigorosos.
#### 2 - Erros de tipo são tratados como erros.
#### 3 - Verificação de null e undefined
#### 4 - Verificação de tipos de união.
#### 5 - Verificação de tipos de tuplas.
#### 6 - Desabilita implicitAny
### Considerações:
#### 1 - Melhora a segurança e estabilidade do código.
#### 2 - Pode exigir ajustes no código existente.
#### 3 - Útil para projetos novos ou refatoração

## noImplicitAny
### Ativa o relatório de erros para expressões e declarações com um tipo 'any' implícito.
#### Controla se o TypeScript deve reportar erros quando uma variável ou parâmetro não tem um tipo explícito e não pode ser inferido automaticamente.
### Comportamento padrão
#### Quando não é especificado o typescript assume como `"noImplicitAny": false`
### Considerações:
#### 1 - Melhoria na segurança de tipos.
#### 2 - Prevenção de erros de tipo.
#### 3 - Código mais robusto e sustentável.

## strictNullChecks
### Ao verificar o tipo, leve em consideração 'null' e 'undefined'.
#### Habilita verificação rigorosa de valores `null` e `undefined` no TypeScript
### Comportamento padrão
#### Quando não é especificado o typescript assume como `"strictNullChecks": false`
### Quando `"strictNullChecks": true`
#### 1 - Habilita verificação rigorosa.
### Considerações:
#### 1 - Evita erros de null pointer.
#### 2 - Melhoria na segurança de tipos.
#### 3 - Código mais robusto e sustentável.
#### 4 - Prevenção de erros em tempo de execução.

## strictBindCallApply
### Verifique se os argumentos para os métodos 'bind', 'call' e 'apply' correspondem à função original.
#### É uma opção de configuração que habilita a verificação rigorosa dos métodos bind(), call() e apply() em funções. Quando ativada, garante que esses métodos sejam utilizados corretamente evitando erros de tipo.
### Comportamento padrão
#### Quando não é especificado o typescript assume como `"strictBindCallApply": false`
### Quando `"strictBindCallApply": true`
#### 1 - Habilita verificação rigorosa dos métodos bind(), call() e apply().
### Considerações:
#### 1 - Melhoria na segurança de tipos.
#### 2 - Prevenção de erros de tipo.
#### 3 - Código mais robusto e sustentável.
#### 4 - Maior compatibilidade com padrões ECMAScript.

## noUnusedLocals
### Habilita o relatório de erros quando variáveis locais não são lidas.
#### Instrui o TypeScript a reportar erros para variáveis locais não utilizadas no código.
### Comportamento padrão
#### Quando não é especificado o typescript assume como `"noUnusedLocals": true`
#### Para versões do TypeScript a partir de (4.6) para as anteriores se assume `"noUnusedLocals": false`
### Quando `"noUnusedLocals": true`
#### 1 - Reporta erros para variáveis locais não utilizadas.
#### 2 - Ajuda a manter o código limpo e organizado.
#### 3 - Evita variáveis desnecessárias.
### Considerações:
#### 1 - Útil para manter o código conciso.
#### 2 - Pode ser útil com outras ‘flags’, como `"noUnusedParameters": true`.
#### 3 - Não afeta variáveis globais ou módulos

----

## noUnusedParameters
### Gera um erro quando um parâmetro de função não é lido.
#### Instrui o TypeScript a reportar erros para parâmetros de funções não utilizadas no código.
### Comportamento padrão
#### Quando não é especificado o typescript assume como `"noUnusedParameters": true`
#### Para versões do TypeScript a partir de (4.2) para as anteriores se assume `"noUnusedParameters": false`
### Quando `"noUnusedParameters": true`
#### 1 - Reporta erros para parâmetros não utilizados.
#### 2 - Ajuda a manter o código limpo e organizado.
#### 3 - Evita parâmetros desnecessários.
#### 4 - Melhora a legibilidade e manutenibilidade.
### Considerações:
#### 1 - Útil para manter o código conciso.
#### 2 - Pode ser usado com outras 'flags' como `"noUnusedLocals": true`.
#### 3 - Não afeta parâmetros com valores padrão.
#### 4 - Ajuda a evitar erros de digitação.

## noFallthroughCasesInSwitch
### Habilita o relatório de erros para casos de fallthrough em instruções switch.
#### É uma opção de configuração que verifica se todos os casos em uma instrução switch têm uma cláusula "break" ou "return", evitando quedas não intencionais entre casos.
### Comportamento padrão
#### Quando não é especificado o typescript assume como `"noFallthroughCasesInSwitch": false`
### Quando `"noFallthroughCasesInSwitch": true`
#### 1 - Prevenção de erros de lógica.
#### 2 - Melhoria na legibilidade e manutenibilidade de código.
#### 3 - Evita comportamentos inesperados
### Considerações:
#### 1 - Habilitar para garantir segurança e clareza no código.
#### 2 - Utilizar "break" ou "return" explícitos em cada caso.
#### 3 - Considerar habilitar outras flags de segurança como "strict" e "noImplicitAny".

## noUncheckedIndexedAccess
### Adiciona 'indefinido' a um tipo quando acessado usando um índice.
#### Habilita verificações rigorosas para acessos a índices não verificados em array e objetos no TypeScript
### Comportamento padrão
#### Quando não é especificado o typescript assume como `"noUncheckedIndexedAccess": false`
### Quando `"noUncheckedIndexedAccess": true`
#### 1 - Gera erros para acessos a índices não verificados.
#### 2 - Verifica tipos de índices em runtime.
#### 3 - Evita erros de tipo "undefined" ou "null".
#### 4 - Melhora segurança e estabilidade do código.
### Considerações:
#### 1 - Útil para projetos críticos e seguros.
#### 2 - Requer `"strict": true` para funcionar corretamente.
#### 3 - Pode gerar erros em código legado.
#### 4 - Melhora a segurança e estabilidade do código.

----

# Completeness
## skipLibCheck
### Ignore a verificação de tipo de todos os arquivos (.d.ts).
#### Instrui o TypeScript a ignorar a verificação de tipos nos arquivos de biblioteca (.d.ts) durante a compilação.
### Comportamento padrão
#### Quando não é especificado o typescript assume como `"skipLibCheck": false`
### Quando `"flag": true`
#### 1 - Ignora erros de tipo em arquivos .d.ts
#### 2 - Melhora desempenho, pois reduz verificações
#### 3 - Útil para projetos grandes ou com bibliotecas complexas
### Considerações:
#### 1 - Não afeta verificações de tipos de código-fonte (.ts).
#### 2 - Não é recomendado para bibliotecas ou módulos.
#### 3 - Útil para projetos que utilizam bibliotecas de terceiros com erros de tipo."

## preserveWatchOutput
#### Controla se o TypeScript mantém a saída do modo "watch" após uma compilação bem-sucedida.
### Comportamento padrão
#### Quando não é especificado o typescript assume como `"preserveWatchOutput": false`
### Quando `"preserveWatchOutput": true`
#### 1 - Mantém a saída do modo "watch" após uma compilação bem-sucedida.
#### 2 - Não limpa a saída anterior.
#### 3 - Útil para depuração e desenvolvimento.
### Considerações:
#### 1 - Útil para depuração e desenvolvimento.
#### 2 - Pode ser usado com "watch" ou "watchOptions".
#### 3 - Não afeta a saída do projeto.

## EXAMPLE NOME
### Tradução da descrição da flag
#### Descrição
### Comportamento padrão
#### Quando não é especificado o typescript assume como `"flag": false`
### Quando `"flag": true`
#### 1 -
#### 2 -
#### 3 -
### Considerações:
#### 1 -
#### 2 -
#### 3 -

# DOCUMENT
```sh
  {
  "compilerOptions": {
    /* Visit https://aka.ms/tsconfig to read more about this file */

    /* Projects */
    // "incremental": true,                              /* Save .tsbuildinfo files to allow for incremental compilation of projects. */
    // "composite": true,                                /* Enable constraints that allow a TypeScript project to be used with project references. */
    // "tsBuildInfoFile": "./.tsbuildinfo",              /* Specify the path to .tsbuildinfo incremental compilation file. */
    // "disableSourceOfProjectReferenceRedirect": true,  /* Disable preferring source files instead of declaration files when referencing composite projects. */
    // "disableSolutionSearching": true,                 /* Opt a project out of multi-project reference checking when editing. */
    // "disableReferencedProjectLoad": true,             /* Reduce the number of projects loaded automatically by TypeScript. */

    /* Language and Environment */
    "target": "es2016",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
    // "lib": [],                                        /* Specify a set of bundled library declaration files that describe the target runtime environment. */
    // "jsx": "preserve",                                /* Specify what JSX code is generated. */
    // "experimentalDecorators": true,                   /* Enable experimental support for legacy experimental decorators. */
    // "emitDecoratorMetadata": true,                    /* Emit design-type metadata for decorated declarations in source files. */
    // "jsxFactory": "",                                 /* Specify the JSX factory function used when targeting React JSX emit, e.g. 'React.createElement' or 'h'. */
    // "jsxFragmentFactory": "",                         /* Specify the JSX Fragment reference used for fragments when targeting React JSX emit e.g. 'React.Fragment' or 'Fragment'. */
    // "jsxImportSource": "",                            /* Specify module specifier used to import the JSX factory functions when using 'jsx: react-jsx*'. */
    // "reactNamespace": "",                             /* Specify the object invoked for 'createElement'. This only applies when targeting 'react' JSX emit. */
    // "noLib": true,                                    /* Disable including any library files, including the default lib.d.ts. */
    // "useDefineForClassFields": true,                  /* Emit ECMAScript-standard-compliant class fields. */
    // "moduleDetection": "auto",                        /* Control what method is used to detect module-format JS files. */

    /* Modules */
    "module": "commonjs",                                /* Specify what module code is generated. */
    // "rootDir": "./",                                  /* Specify the root folder within your source files. */
    // "moduleResolution": "node10",                     /* Specify how TypeScript looks up a file from a given module specifier. */
    // "baseUrl": "./",                                  /* Specify the base directory to resolve non-relative module names. */
    // "paths": {},                                      /* Specify a set of entries that re-map imports to additional lookup locations. */
    // "rootDirs": [],                                   /* Allow multiple folders to be treated as one when resolving modules. */
    // "typeRoots": [],                                  /* Specify multiple folders that act like './node_modules/@types'. */
    // "types": [],                                      /* Specify type package names to be included without being referenced in a source file. */
    // "allowUmdGlobalAccess": true,                     /* Allow accessing UMD globals from modules. */
    // "moduleSuffixes": [],                             /* List of file name suffixes to search when resolving a module. */
    // "allowImportingTsExtensions": true,               /* Allow imports to include TypeScript file extensions. Requires '--moduleResolution bundler' and either '--noEmit' or '--emitDeclarationOnly' to be set. */
    // "rewriteRelativeImportExtensions": true,          /* Rewrite '.ts', '.tsx', '.mts', and '.cts' file extensions in relative import paths to their JavaScript equivalent in output files. */
    // "resolvePackageJsonExports": true,                /* Use the package.json 'exports' field when resolving package imports. */
    // "resolvePackageJsonImports": true,                /* Use the package.json 'imports' field when resolving imports. */
    // "customConditions": [],                           /* Conditions to set in addition to the resolver-specific defaults when resolving imports. */
    // "noUncheckedSideEffectImports": true,             /* Check side effect imports. */
    // "resolveJsonModule": true,                        /* Enable importing .json files. */
    // "allowArbitraryExtensions": true,                 /* Enable importing files with any extension, provided a declaration file is present. */
    // "noResolve": true,                                /* Disallow 'import's, 'require's or '<reference>'s from expanding the number of files TypeScript should add to a project. */

    /* JavaScript Support */
    // "allowJs": true,                                  /* Allow JavaScript files to be a part of your program. Use the 'checkJS' option to get errors from these files. */
    // "checkJs": true,                                  /* Enable error reporting in type-checked JavaScript files. */
    // "maxNodeModuleJsDepth": 1,                        /* Specify the maximum folder depth used for checking JavaScript files from 'node_modules'. Only applicable with 'allowJs'. */

    /* Emit */
    // "declaration": true,                              /* Generate .d.ts files from TypeScript and JavaScript files in your project. */
    // "declarationMap": true,                           /* Create sourcemaps for d.ts files. */
    // "emitDeclarationOnly": true,                      /* Only output d.ts files and not JavaScript files. */
    // "sourceMap": true,                                /* Create source map files for emitted JavaScript files. */
    // "inlineSourceMap": true,                          /* Include sourcemap files inside the emitted JavaScript. */
    // "noEmit": true,                                   /* Disable emitting files from a compilation. */
    // "outFile": "./",                                  /* Specify a file that bundles all outputs into one JavaScript file. If 'declaration' is true, also designates a file that bundles all .d.ts output. */
    // "outDir": "./",                                   /* Specify an output folder for all emitted files. */
    // "removeComments": true,                           /* Disable emitting comments. */
    // "importHelpers": true,                            /* Allow importing helper functions from tslib once per project, instead of including them per-file. */
    // "downlevelIteration": true,                       /* Emit more compliant, but verbose and less performant JavaScript for iteration. */
    // "sourceRoot": "",                                 /* Specify the root path for debuggers to find the reference source code. */
    // "mapRoot": "",                                    /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSources": true,                            /* Include source code in the sourcemaps inside the emitted JavaScript. */
    // "emitBOM": true,                                  /* Emit a UTF-8 Byte Order Mark (BOM) in the beginning of output files. */
    // "newLine": "crlf",                                /* Set the newline character for emitting files. */
    // "stripInternal": true,                            /* Disable emitting declarations that have '@internal' in their JSDoc comments. */
    // "noEmitHelpers": true,                            /* Disable generating custom helper functions like '__extends' in compiled output. */
    // "noEmitOnError": true,                            /* Disable emitting files if any type checking errors are reported. */
    // "preserveConstEnums": true,                       /* Disable erasing 'const enum' declarations in generated code. */
    // "declarationDir": "./",                           /* Specify the output directory for generated declaration files. */

    /* Interop Constraints */
    // "isolatedModules": true,                          /* Ensure that each file can be safely transpiled without relying on other imports. */
    // "verbatimModuleSyntax": true,                     /* Do not transform or elide any imports or exports not marked as type-only, ensuring they are written in the output file's format based on the 'module' setting. */
    // "isolatedDeclarations": true,                     /* Require sufficient annotation on exports so other tools can trivially generate declaration files. */
    // "allowSyntheticDefaultImports": true,             /* Allow 'import x from y' when a module doesn't have a default export. */
    "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
    // "preserveSymlinks": true,                         /* Disable resolving symlinks to their realpath. This correlates to the same flag in node. */
    "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */

    /* Type Checking */
    "strict": true,                                      /* Enable all strict type-checking options. */
    // "noImplicitAny": true,                            /* Enable error reporting for expressions and declarations with an implied 'any' type. */
    // "strictNullChecks": true,                         /* When type checking, take into account 'null' and 'undefined'. */
    // "strictFunctionTypes": true,                      /* When assigning functions, check to ensure parameters and the return values are subtype-compatible. */
    // "strictBindCallApply": true,                      /* Check that the arguments for 'bind', 'call', and 'apply' methods match the original function. */
    // "strictPropertyInitialization": true,             /* Check for class properties that are declared but not set in the constructor. */
    // "strictBuiltinIteratorReturn": true,              /* Built-in iterators are instantiated with a 'TReturn' type of 'undefined' instead of 'any'. */
    // "noImplicitThis": true,                           /* Enable error reporting when 'this' is given the type 'any'. */
    // "useUnknownInCatchVariables": true,               /* Default catch clause variables as 'unknown' instead of 'any'. */
    // "alwaysStrict": true,                             /* Ensure 'use strict' is always emitted. */
    // "noUnusedLocals": true,                           /* Enable error reporting when local variables aren't read. */
    // "noUnusedParameters": true,                       /* Raise an error when a function parameter isn't read. */
    // "exactOptionalPropertyTypes": true,               /* Interpret optional property types as written, rather than adding 'undefined'. */
    // "noImplicitReturns": true,                        /* Enable error reporting for codepaths that do not explicitly return in a function. */
    // "noFallthroughCasesInSwitch": true,               /* Enable error reporting for fallthrough cases in switch statements. */
    // "noUncheckedIndexedAccess": true,                 /* Add 'undefined' to a type when accessed using an index. */
    // "noImplicitOverride": true,                       /* Ensure overriding members in derived classes are marked with an override modifier. */
    // "noPropertyAccessFromIndexSignature": true,       /* Enforces using indexed accessors for keys declared using an indexed type. */
    // "allowUnusedLabels": true,                        /* Disable error reporting for unused labels. */
    // "allowUnreachableCode": true,                     /* Disable error reporting for unreachable code. */

    /* Completeness */
    // "skipDefaultLibCheck": true,                      /* Skip type checking .d.ts files that are included with TypeScript. */
    "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
  }
}

```