# Como usar o Turbo Repo

## CLI
### Para usá-lo globalmente, você deve instalar o repositório turbo globalmente. Você pode usar um dos comandos abaixo:
```sh
  npm install turbo --global 
```
ou
```sh
  yarn global add turbo 
```
----

## Criação
### Começando

#### Para começar a usar o turbo repo, usando a configuração padrão, você deve executar o seguinte comando
```sh
  npx create-turbo@latest 
```
#### Ao executar este comando ele fará algumas perguntas.
```sh
  Where would like to create your turborepo? 
  //Você deve inserir o nome do projeto
```
```sh
  Which package manager do you want to use? (Use arrow keys) 
  > npm 
  > yarn
  //Você pode escolher o que melhor combina com você
```
#### Após executar este comando, você pode escolher o IDE que melhor se adapta a você e abrir o projeto. Você verá que ele criou a seguinte árvore de arquivos.
```
├── apps
│   ├── docs (Um projeto front-end com react e next para documentar seu projeto)
│   ├── web (Um projeto front-end com react e next será o seu front-end)
├── packages
│   ├── eslint-config (Arquivo que não gera build para realizar tratamento de eslint para cada projeto)
│   ├── typescript-config (Arquivo que não gera build para realizar processamento typescript)
│   ├── ui (Arquivo que gera build para interface de usuário do seu projeto front-end)
```
#### para construir todos os projetos e apenas executar o comando
```sh
  // if you generated it with yarn
  yarn run build 
  // if you generated it with npm
  npm run build
```
#### Para executar todos os projetos em modo de desenvolvimento
```sh
  // if you generated it with yarn
  yarn run dev 
  // if you generated it with npm
  npm run dev
```
#### Para executar o lint para todos os projetos
```sh
  // if you generated it with yarn
  yarn run lint 
  // if you generated it with npm
  npm run lint
```
#### A partir daqui você pode personalizar o seu projeto como achar melhor, no meu caso mudarei o nome do projeto packages/typescript-config para packages/eslint e packages/typescript e removerei o app/docs projeto

----

## Workspace
### Para criar um workspace com turbo, primeiro você precisa instalar o repositório turbo globalmente e, em seguida, usar o comando para gerar um workspace em branco:
```sh
  turbo gen workspace 
```
### Este comando lhe dará uma seleção de opções, onde você deve escolher o local onde será criado o workspace, entre app ou pacotes.
```
>>> Add an empty workspace to "my-turborepo"
? What type of workspace should be added ?
    app
    packages
```
### Em seguida, será solicitado que você escolha o nome do pacote, onde deverá inserir um nome.
```
>>> Add an empty workspace to "my-turborepo"
? What is the name of the package ?
```
### Em seguida confirmará o local onde o espaço de trabalho deve ser adicionado, caso nada seja preenchido ele continuará com as configurações adicionadas acima, caso contrário irá alterar o local.
```
>>> Add an empty workspace to "my-turborepo"
? Where should "workspace-name" be added ?
```
### Finalmente, você será perguntado se deseja adicionar alguma dependência ao espaço de trabalho.
```
>>> Add an empty workspace to "my-turborepo"
? add workspace dependencies to  "workspace-name" ?
```
#### Se você escolher a opção `y`, um novo questionário será aberto, perguntando que tipo de dependência você deseja adicionar com base nos workspaces existentes.
```
? Select all dependencies types to modify for "tokens" (Press <space> to select, <a> to toggle all, <i> to invert selection, and <enter> to proceed)
>( ) dependencies
 ( ) devDependencies
 ( ) peerDependencies
 ( ) optionalDependencies
```
#### Ao final irá gerar uma pasta no repositório escolhido com o nome escolhido contendo o package.json e um arquivo README.md