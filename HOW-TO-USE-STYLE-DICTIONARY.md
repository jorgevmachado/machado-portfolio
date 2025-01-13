# Como usar o `style-dictionary`

## style-dictionary 
### É uma ferramenta para gerenciamento e sincronização de estilos visuais em projetos de design e desenvolvimento.
### Características:
#### 1 - Gerenciamento de variáveis de estilo (cores, tipografia, espaçamento, etc.).
#### 2 - Sincronização de estilos entre diferentes plataformas (Web, mobile e Desktop).
#### 3 - Suporte a múltiplos formats (JSON, CSS, SCSS, Less, JavaScript, etc).
#### 4 -Integração com ferramentas de design (Sketch, Figma, Adobe XD).
#### 5 - Personalização e extensibilidade.
### Funcionalidades: 
#### 1 - Criação de um dicionário de estilos centralizado.
#### 2 - Geração automática de códigos CSS/SCSS/Less.
#### 3 - Atualização em tempo real de estilos nos projetos.
#### 4 - Validação de consistência de estilos.
### Considerações finais:
#### 1 - Padrão de design: Ajuda a manter consistência visual.
#### 2 - Eficiência: Reduz tempo de desenvolvimento e manutenção.
#### 3 - Flexibilidade: Suporte a múltiplos formatos e plataformas.
#### 4 - Integração: Compatível com ferramentas de design e desenvolvimento populares.
#### 5 - Documentação: Geração automática de documentação de estilos.
### Uso comum
#### 1 - Instalação: npm install style-dictionary ou yarn add style-dictionary.
#### 2 - Configuração: Crie um arquivo de configuração (style-dictionary.json).
#### 3 - Uso: Execute comandos para gerar estilos (style-dictionary build).

----

## Instalação
### Para usá-lo globalmente, é necessário instalar de forma global. Podemos utilizar o comando:
```sh
  npm install style-dictionary --global 
```
ou
```sh
  yarn global add style-dictionary 
```
### Para usá-lo no projeto, devemos instalar como dependência de desenvolvimento com o seguinte comando:
```sh
  npm install style-dictionary --save-dev 
```
ou
```sh
  yarn add style-dictionary -D 
```

----

## Iniciando
### Para iniciar o projeto com o `style-dictionary`, Temos 2 formas:
#### 1 - De forma Automática utilizando o CLI, (necessário a instalação global), onde devemos escolher entre:
##### 1.1 - basic: código de exemplo básico para mostrar o que esta estrutura pode fazer. Use isto se quiser brincar com o que o Dicionário de Estilo pode fazer.
##### [ver no github](https://github.com/amzn/style-dictionary/tree/main/examples/basic)
```sh
  style-dictionary init basic 
```
##### 1.2 - complete: este é um pacote mais completo e deve ter tudo que você precisa para começar. Este pacote pode ser consumido como Cocoapod no iOS, como módulo de nó para web e como biblioteca local para Android.
```sh
  style-dictionary init complete 
```
##### [ver no github](https://github.com/amzn/style-dictionary/tree/main/examples/complete)

----
#### 2 - De forma mais avançada criando todos de forma manual, podendo pegar como base alguns exemplos.
##### [Ver exemplos](https://github.com/amzn/style-dictionary/tree/main/examples/advanced)