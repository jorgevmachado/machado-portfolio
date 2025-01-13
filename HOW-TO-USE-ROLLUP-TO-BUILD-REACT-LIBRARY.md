# Como usar o `rollup` para gerar pacote de bibliotecas react

## Rollup
### O Rollup é uma ferramenta de empacotamento de módulos JavaScript (bundler) que permite reunir e otimizar código para produção. Ele converte módulos ES6+ em formatos compatíveis com navegadores e servidores.
### Características:
#### 1. Suporte a ES6+: Rollup suporta sintaxe moderna de JavaScript.
#### 2. Empacotamento: Reúne módulos num arquivo único.
#### 3. Otimização: Minifica e compacta código.
#### 4. Tree Shaking: Remove código desnecessário.
#### 5. Compatibilidade: Gera códigos compatíveis com navegadores e servidores.
#### 6. Plug-ins: Suporta extensões para funcionalidades adicionais.
### Vantagens
#### 1. Melhor performance.
#### 2. Redução de tamanho do código.
#### 3. Simplificação da gestão de dependências.
#### 4. Suporte a módulos ES6+.
#### 5. Facilita deploy.
### Uso comum
#### 1. Desenvolvimento de bibliotecas JavaScript.
#### 2. Criação de aplicativos web.
#### 3. Otimização de código legado.
#### 4. Integração com frameworks (React, Angular, Vue.js).
### Comparação com outras ferramentas
#### 1. Webpack: Mais complexo, mas com mais recursos.
#### 2. Parcel: Mais rápido, mas com menos configurações.
#### 3. Gulp: Focado em tarefas automatizadas.

## CLI
### Para usá-lo globalmente, você deve instalar o repositório rollup globalmente. Você pode usar o comando abaixo:
```sh
  npm install rollup --global 
```
----
#### obs: Mesmo instalando de forma global é necessário instalar no projeto.
```sh
  npm install rollup -D 
```

## Configuração
### Após instalar o rollup é necessário realizar algumas configurações básicas.
### Vamos primeiramente instalar algumas bibliotecas para nos auxiliar:
#### `glob`: Vai nos ajudar a buscar e acessar arquivos de forma mais simples.
```sh
  npm install glob -D 
```
#### `@rollup/plugin-typescript`: É uma extensão oficial do rollup para suportar typescript.
```sh
  npm install @rollup/plugin-typescript -D 
```
#### `rollup-plugin-postcss`: É uma extensão do rollup que permite processar arquivos CSS com PostCSS.
```sh
  npm install rollup-plugin-postcss -D 
```
#### `rollup-plugin-sass`: É uma extensão do Rollup que permite compilar arquivos Sass (SCSS) em CSS, integrando-o com o fluxo de build do Rollup.
```sh
  npm install rollup-plugin-sass -D 
```
### Para que tudo funcione bem, teremos que fazer alguns ajustes no `compilerOptions` que fica no arquivo `.tsconfig.json` adicione os seguintes campos:
``` json
"compilerOptions": {
    "outDir": "dist",
    "target": "ES2022",
    "module": "ESNext",
    "baseUrl": ".",
    "moduleResolution": "Bundler"
  },
````
### Ja no arquivo `package.json`, adicione os seguintes itens:
```json
  {
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist"
  ],
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.js"
    },
    "./*": {
      "types": "./dist/*/index.d.ts",
      "import": "./dist/*.js",
      "require": "./dist/*.js"
    }
  },
  "scripts": {
    "build:law": "rollup -c"
  }
}
```
### Depois vamos criar o arquivo de configuração chamado rollup.config.js na raiz do projeto e vamos adicionar o seguinte código:
#### obs: Como nesse projeto estamos a utilizar o `@repo/tokens` e temos mais de uma marca, vamos fazer com que receba através do environment `set BRAND=geek` a marca escolhida para realizar o build. 
```js
import {glob} from 'glob';
import path from "path";

import typescript from "@rollup/plugin-typescript";
import postcss from 'rollup-plugin-postcss';
import sass from 'rollup-plugin-sass';
import {defineConfig} from "rollup";

const currentBrand = process.env.BRAND || "geek";
const brand = currentBrand.replace(/\s/g, '');

const createConfig = (brand) => defineConfig({
    input: glob.sync('src/**/index.ts'),
    output: [
        {
            dir: path.dirname(`dist/index.js`),
            format: 'esm',
            sourcemap: true,
            preserveModules: true,
            preserveModulesRoot: 'src',
            silenceDeprecations: ['legacy-js-api'],
        },
        {
            dir: path.dirname(`dist/index.js`),
            format: 'cjs',
            sourcemap: true,
            preserveModules: true,
            preserveModulesRoot: 'src',
            silenceDeprecations: ['legacy-js-api'],
        },
    ],
    external: ["react/jsx-runtime"],
    plugins: [
        typescript({ tsconfig: "./tsconfig.json" }),
        postcss({
            use: [
                ['sass', {
                    includePaths: [
                        'node_modules',
                        'src/styles',
                        `@geek/tokens/dist/${brand}/css/_variables.css`,
                        `@geek/tokens/dist/${brand}/scss/_variables.scss`,
                    ]
                }]
            ],
            extract: true,
            minimize: true,
            extensions: ['.css', '.scss'],
        }),
        sass({
            insert: true,
            include: ['**/*.scss', '**/*.css'],
            options: {
                includePaths: [
                    'node_modules',
                    'src/styles'
                ],
            }
        })
    ],
});

export default [
    createConfig(brand),
]
```