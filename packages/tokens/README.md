# tokens com style-dictionary

Powered by

![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=falt&logo=node.js&logoColor=white)

## Para que serve?
### Tokens responsáveis por transformar e formatar Design Tokens para nossas marcas.

## Como foi criado?
### Foram instaladas as bibliotecas style-dictionary que irá gerenciar a consistência em estilos visuais.
#### Foi criado um arquivo chamado `config.mjs` onde esse arquivo vai conter as configurações de build.
#### No arquivo `pachage.json` o comando build irá criar uma pasta `dist` com todas as marcas e só dependerá de quem consumir, importar a marca que deseja.
#### Comando para executar o build
```sh
  npm run build 
```

## Marcas:
### Geek
### Law
### Finance

## Como usar?
### Para utilizar um token dentro do projeto, basta importar a lib e navegar até o valor desejado.
#### Neste exemplo está sendo importado o arquivo do tipo css da marca geek
```
  import '@repo/tokens/dist/geek/css/_variables.css'; 
```

## Como Funciona ?
### Neste projeto ele é dividido em 2 tipos:
### `brands`
#### Conterá tudo que for especifico para uma marca, onde pode ser colocado fontes, cores, etc.
#### Cores: 
#### Sempre conterá no mínimo 2 grupos de corés:
#### - primary: corés primarias para o projeto.
#### - secondary: corés secundarias para o projeto.

----

### `globals`
#### Conterá tudo que for consumido de forma global entre as marcas.

#### Cores:
##### Todo o projeto terá um grupo de cores globais, onde qualquer uma das marcas irá consumir, os grupos de cores são:
##### 1 - focus: somente uma cor para itens que precisam de foco.
##### 2 - black: transmitir a cor preta padrão do projeto.
##### 3 - white: transmitir a cor branca padrão do projeto.
##### 4 - info: cores relacionadas a informação contendo 5 tonalidades de cores (60,70,80,90 e 100).
##### 5 - error: cores relacionadas a erro contendo 5 tonalidades de cores (60,70,80,90 e 100).
##### 6 - neutral: cores neutras contendo 6 tonalidades de cores (50,60,70,80,90 e 100).
##### 7 - success: cores relacionadas a sucesso contendo 5 tonalidades de cores (60,70,80,90 e 100).
##### 8 - attention: cores relacionadas a atenção contendo 5 tonalidades de cores (60,70,80,90 e 100).
##### 9 - social: Cores relacionadas a redes sociais tendo 3 sub-grupos:
###### 9.1 - google: com 3 tonalidades de cores (80, 90 e 100).
###### 9.2 - facebook: com 3 tonalidades de cores (80, 90 e 100).
###### 9.3 - whatsup: com 3 tonalidades de cores (80, 90 e 100).

#### Dimensões:
##### Todo o projeto terá de forma global mapeada as dimensões separados em fixos e relativos.
##### 1 - Tamanhos Fixos, são tamanhos baseados em px exemplo 16px.
##### 2 - Tamanhos relativos, são tamanhos baseados em rem exemplo 1rem.

#### size
##### Todo o projeto terá de forma global mapeada os tamanhos (fixos e relativos) separados em:
##### 1 - none: tamanho zerado.
##### 2 - tiny: tamanhos minúsculos, possuindo 3 variações:
###### 2.1 - tiny
###### 2.2 - x-tiny
###### 2.3 - xx-tiny
##### 3 - small: tamanhos pequenos, possuindo 3 variações:
###### 3.1 - small
###### 3.2 - x-small
###### 3.3 - xx-small
##### 4 - regular: tamanhos padrões do projeto, possuindo 3 variações:
###### 4.1 - regular
###### 4.2 - x-regular
###### 4.3 - xx-regular
##### 5 - medium: tamanhos medianos (um pouco mair que o padrão), possuindo 3 variações:
###### 5.1 - medium
###### 5.2 - x-medium
###### 5.3 - xx-medium
##### 6 - large: tamanhos grandes possuindo 4 variações:
###### 6.1 - large
###### 6.2 - x-large
###### 6.3 - xx-large
###### 6.4 - xxx-large
##### 7 - big: tamanhos grandes (um pouco mair que o large) possuindo 4 variações:
###### 7.1 - big
###### 7.2 - x-big
###### 7.3 - xx-big
###### 7.4 - xxx-big
##### 8 - huge: tamanhos enormes, possuindo 3 variações:
###### 8.1 - huge
###### 8.2 - x-huge
###### 8.3 - xx-huge
##### 9 - giant: tamanho gigante
##### 10 - max: tamanho máximo.

#### breakpoints
##### Todo o projeto terá de forma global mapeada os tamanhos das telas para trabalhar a forma responsiva, tendo 5 tamanhos fixos:
##### 1 - xs (extra-small)  para telas muito pequenas, (smart watch etc).
##### 2 - sm (small)  para telas de smartphones menores.
##### 3 - md (medium)  para telas de smartphones maiores e tablets.
##### 4 - lg (large)  para telas de notebooks e monitores menores.
##### 5 - xl (extra-large)  para telas grandes.

#### fontes
##### Todo o projeto terá de forma global mapeado os font-family , line-height, font-size e font-weight. 