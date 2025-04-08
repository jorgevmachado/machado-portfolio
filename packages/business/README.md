<div style="text-align: center;">
    <h1>business</h1>
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
### Módulo responsável por lidar com as regras de negócio em comum de todos os projetos (‘apps’). 

## Instalação do Ambiente
### Seguir as instruções do Readme Principal no ‘item’ Instalação do Ambiente [clique aqui](../../README.md). 

### Para usar o business dentro do projeto, basta adicionar o módulo no package.json do projeto.
```json
{
  "dependencies": {
    "@repo/business": "*"
  }      
}
```
### Depois é só importar a função do módulo desejado e navegar até o valor desejado
```typescript
import { User } from '@repo/business/auth/interface';
```

## 🏠  Comandos
#### Todos os comandos aqui listados, devem ser executados na raiz do módulo (./packages/business).

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

### Lint
```bash
# Irá executar o lint no módulo.
# Veja `@repo/eslint-config` para personalizar o comportamento.
npm run lint
```
### test
```bash
# Irá executar todos os testes do módulo.
npm run test
```
#### Módulos
#### base:
```
    npm run test -- --findRelatedTests src/shared/base.spec.ts                                 
```
#### paginate:
```bash
    npm run test -- --findRelatedTests src/paginate/paginate.spec.ts                                 
    npm run test -- --findRelatedTests src/paginate/config.spec.ts                                 
```
#### POKE-API
```
  npm run test -- --findRelatedTests src/api/poke-api/pokeApi.spec.ts
```
#### NEST
```bash
    npm run test -- --findRelatedTests src/api/nest/nest.spec.ts                                 
    
    npm run test -- --findRelatedTests src/api/nest/nestModuleAbstract.spec.ts
```
##### - AUTH
```bash
    npm run test -- --findRelatedTests src/api/nest/auth/auth.spec.ts
```
##### - POKEMON
```bash
    npm run test -- --findRelatedTests src/api/nest/pokemon/pokemon.spec.ts   
```
###### - ABILITY 
```bash    
    npm run test -- --findRelatedTests src/api/nest/pokemon/pokemon-ability/pokemonAbility.spec.ts
```
###### - MOVE
```bash                                         
    npm run test -- --findRelatedTests src/api/nest/pokemon/pokemon-move/pokemonMove.spec.ts    
```
###### - TYPE
```bash                                                                                 
    npm run test -- --findRelatedTests src/api/nest/pokemon/pokemon-type/pokemonType.spec.ts
```
##### - FINANCE
```bash
    npm run test -- --findRelatedTests src/api/nest/finance/finance.spec.ts   
```
###### - SUPPLIER TYPE
```bash
  npm run test -- --findRelatedTests src/api/nest/finance/supplier-type/supplierType.spec.ts
```

###### - SUPPLIER
```bash
  npm run test -- --findRelatedTests src/api/nest/finance/supplier/supplier.spec.ts
```

###### - BANK
```bash
  npm run test -- --findRelatedTests src/api/nest/finance/bank/bank.spec.ts
```

###### - EXPENSE
```bash
  npm run test -- --findRelatedTests src/api/nest/finance/expense/expense.spec.ts
```

###### - BILL
```bash
  npm run test -- --findRelatedTests src/api/nest/finance/bill/bill.spec.ts
```
#### AUTH:
##### - ENTITY
```bash 
 npm run test -- --findRelatedTests src/auth/user.spec.ts                                                                           
```
##### - BUSINESS
```bash  
 npm run test -- --findRelatedTests src/auth/business.spec.ts                                                                           
```
##### - SERVICE
```bash  
 npm run test -- --findRelatedTests src/auth/service.spec.ts                                                                           
```
##### - CONFIG
```bash  
 npm run test -- --findRelatedTests src/auth/config.spec.ts                                                                           
```
#### POKEMON
##### (POKE-API) - SERVICE
```bash   
   npm run test -- --findRelatedTests src/pokemon/externalService.spec.ts                                                                    
```
##### - SERVICE
```bash     
  npm run test -- --findRelatedTests src/pokemon/service.spec.ts                                                                       
```
##### - CONFIG
```bash     
  npm run test -- --findRelatedTests src/pokemon/config.spec.ts                                                                       
```
##### - ABILITY 
###### - ENTITY
```bash     
  npm run test -- --findRelatedTests src/pokemon/pokemon-ability/pokemonAbility.spec.ts                                                                       
```
##### - MOVE
######  - ENTITY
```bash     
  npm run test -- --findRelatedTests src/pokemon/pokemon-move/pokemonMove.spec.ts                                                                       
```
###### - CONFIG
```bash     
  npm run test -- --findRelatedTests src/pokemon/pokemon-move/config.spec.ts                                                                       
```
##### - TYPE 
###### - ENTITY
```bash     
  npm run test -- --findRelatedTests src/pokemon/pokemon-type/pokemonType.spec.ts                                                                       
```
#### FINANCE:
##### - SERVICE
```bash     
  npm run test -- --findRelatedTests src/finance/financeService.spec.ts                                                                       
```
##### SUPPLIER TYPE
###### - ENTITY
```bash     
  npm run test -- --findRelatedTests src/finance/supplier-type/supplierType.spec.ts                                                                       
``` 
###### - SERVICE
```bash     
  npm run test -- --findRelatedTests src/finance/supplier-type/supplierTypeService.spec.ts                                                                       
```
##### SUPPLIER 
###### - ENTITY
```bash     
  npm run test -- --findRelatedTests src/finance/supplier/supplier.spec.ts                                                                       
``` 
###### - SERVICE
```bash     
  npm run test -- --findRelatedTests src/finance/supplier/supplierService.spec.ts                                                                       
```
##### BANK 
###### - ENTITY
```bash     
  npm run test -- --findRelatedTests src/finance/bank/bank.spec.ts                                                                       
```
###### - SERVICE
```bash     
  npm run test -- --findRelatedTests src/finance/bank/bankService.spec.ts                                                                       
```
##### EXPENSE 
###### - ENTITY
```bash     
  npm run test -- --findRelatedTests src/finance/expense/expense.spec.ts                                                                       
```
###### - SERVICE
```bash     
  npm run test -- --findRelatedTests src/finance/expense/expenseService.spec.ts                                                                       
```
###### - BUSINESS
```bash     
  npm run test -- --findRelatedTests src/finance/expense/expenseBusiness.spec.ts                                                                       
```
##### BILL 
###### - ENTITY
```bash     
  npm run test -- --findRelatedTests src/finance/bill/bill.spec.ts                                                                       
```
###### - SERVICE
```bash     
  npm run test -- --findRelatedTests src/finance/bill/billService.spec.ts                                                                       
```
###### - BUSINESS
```bash     
  npm run test -- --findRelatedTests src/finance/bill/billBusiness.spec.ts                                                                       
```

### shared:
#### Funções utilitárias de recursos compartilhados de regras de negócios.
### paginate:
#### Funções utilitárias para construção de paginação.
### api:
#### Funções de configurações de apis externas.
### Nest
#### Funções de comunicação com a api em NEST.
### Módulos
#### AUTH:
#### Regras de negócios relacionadas a autenticação.
#### POKEMON
#### Regras de negócios relacionadas a api de pokemon tanto internas como externas(poke-api).
#### FINANCE:
#### Regras de negócios relacionadas a api de finanças.