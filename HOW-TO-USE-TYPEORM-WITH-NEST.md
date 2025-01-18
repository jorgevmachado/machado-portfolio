# Como usar o `typeorm` para conexão com banco de dados

## TypeORM
### TypeORM é uma biblioteca de mapeamento objeto-relacional (ORM) para TypeScript e JavaScript, criada para interagir com bancos de dados relacionais, como MySQL, PostgreSQL, MariaDB, SQLite e Microsoft SQL Server. Aqui está uma visão geral:
### Características
#### 1. Mapeamento objeto-relacional: Converte objetos JavaScript em tabelas de banco de dados.
#### 2. Suporte a vários bancos de dados: MySQL, PostgreSQL, MariaDB, SQLite, Microsoft SQL Server.
#### 3. Tipagem forte: Utiliza TypeScript para garantir segurança e consistência.
#### 4. API simples e intuitiva: Facilita a interação com o banco de dados.
#### 5. Suporte a transações: Gerencia transações para garantir consistência.
#### 6. Suporte a migrações: Gerencia alterações no esquema do banco de dados.
#### 7. Suporte a relacionamentos: Gerencia relacionamentos entre entidades.
#### 8. Cache: Melhora desempenho com cache interno.
### Vantagens
#### 1. Reduz complexidade: Simplifica interações com o banco de dados.
#### 2. Melhora produtividade: Fornece API intuitiva e fácil de usar.
#### 3. Aumenta segurança: Garante tipagem forte e validação.
#### 4. Facilita manutenção: Gerencia migrações e alterações no esquema.
#### 5. Suporte a transações: Garante consistência em operações.
#### 6. Compatibilidade: Suporte a vários bancos de dados.
### Uso comum
#### 1. Desenvolvimento de APIs: TypeORM é amplamente utilizado em projetos de API.
#### 2. Desenvolvimento de aplicações web: Utilizado em frameworks como NestJS e Angular.
#### 3. Desenvolvimento de aplicações móveis: Utilizado em projetos com React Native.
#### 4. Microserviços: Utilizado para gerenciar bancos de dados em microserviços.
### Comparação com outras ferramentas
#### 1. Sequelize: Outra ORM popular para JavaScript. TypeORM oferece melhor suporte a TypeScript.
#### 2. Mongoose: ORM para MongoDB. TypeORM suporta bancos de dados relacionais.
#### 3. Prisma: ORM moderna para bancos de dados relacionais. TypeORM oferece melhor suporte a migrações.
#### 4. Knex.js: Biblioteca de query builder. TypeORM oferece mapeamento objeto-relacional.

## Instalação
#### O comando para instalar o typeorm no projeto
```sh
  npm install typeorm --save 
```
### Será necessário instalar também o `reflect-metadata`
```sh
  npm install reflect-metadata --save 
```
### Deverá escolher o banco de dados que mais lhe interessa para instalar no projeto aqui vai algumas opções:
```sh
  npm install mysql --save // MySql 
  
  npm install pg --save // PostgreSQL
  
  npm install sqlite3 --save // SQlite
  
  npm install mssql --save  // Microsoft SQL Server 
  
  npm install oracledb --save // Oracle
```