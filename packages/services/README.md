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
#### Classe de utilitário para manipular ‘cookies’ do navegador.
#### testes
```bash
    npm run test -- --findRelatedTests src/cookies/cookies.spec.ts               
```

### date:
#### Utilitários ou manipuladores de datas.
#### testes
```bash
    npm run test -- --findRelatedTests src/date/date.spec.ts               
```
##### parseDay: Garante que o dia fornecido esta dentro dos limites 1 e 31.
##### parseYear: Garante que o ano fornecido esta dentro dos limites 1000 e 9999.
##### parseMonth: Garante que o mes fornecido esta dentro dos limites 0 e 12.
##### parseStartDate: Converte uma data em string para data.
##### calculateMaxDate: Calcula a data máxima de nascimento para alguém maior de idade.
##### isUnderMinimumAge: Valida se a data pertence a alguém  maior de idade.
##### parseDateFromString: Converte uma string em date.
##### parseDateFromStringWithSeparator: Converte uma string  com um separador customizado em date.
##### createDateFromYearMonthDay: Transforma os campos em uma data valida.

### formatter:
#### Funções que formatam dados (datas, números, strings, etc.).
#### testes
##### base: Responsável por todas as formatações basícas.
```bash
    npm run test -- --findRelatedTests src/formatter/formatter.spec.ts                 
```
###### sanitize: Responsável por realizar a higienização do texto.
###### cleanFormatter: Responsável por limpar a formatação do texto.

##### address: Responsável por todas as formatações relacionadas a endereço.
```bash 
    npm run test -- --findRelatedTests src/formatter/address/address.spec.ts                 
```
###### cepFormatter: Responsável por formatar um texto para cep.

##### contact: Responsável por todas as formatações relacionadas a contato.
```bash 
    npm run test -- --findRelatedTests src/formatter/contact/contact.spec.ts                 
```
###### phoneFormatter: Responsável por formatar um texto para Telefone.
###### mobileFormatter: Responsável por formatar um texto para Telefone Celular.

##### currency: Responsável por todas as formatações relacionadas a valor monetário.
```bash 
    npm run test -- --findRelatedTests src/formatter/currency/currency.spec.ts                 
```
###### currencyFormatter: Responsável por formatar um valor para valor monetário.
###### removeCurrencyFormatter: Responsável por remover a formatação de um valor monetário.

##### document: Responsável por todas as formatações relacionadas a documentos.
```bash 
    npm run test -- --findRelatedTests src/formatter/document/document.spec.ts                 
```
###### cpfFormatter: Responsável por formatar um valor para cpf.

### http:
#### Funções para realizar chamadas HTTP ou gerenciar requisições e respostas.
#### testes
```bash
    npm run test -- --findRelatedTests src/http/http.spec.ts               
```

### object:
#### Utilitários ou manipuladores de objetos.
```bash
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
##### convertSubPathUrl: Converte e constrói uma URL anexando subcaminhos e parâmetros com base nas opções fornecidas.
##### separateCamelCase: Separa palavras em camel case ('CamelCase') para uma versão com espaços e capitalização individual.
##### snakeCaseToNormal: Converte uma 'string' snake_case fornecida em uma string case normal legível por humanos.
##### extractLastItemFromUrl: Extrai o último segmento de uma URL.

### number:
#### Utilitários relacionados a manipulação ou validação de numbers.
```bash
    npm run test -- --findRelatedTests src/number/number.spec.ts               
```
##### isNumberEven: Verifica se um número é par. Também valida se o número é um inteiro e lança um erro caso não seja.
##### extractLastNumberFromUrl: Extraí o último segmento da URL e tenta convertê-lo para um número.

### validator:
#### Funções para validação de entrada de dados ou outros tipos de verificações.
##### base: Responsável por todas as validações basícas.
```bash
    npm run test -- --findRelatedTests src/validator/validator.spec.ts                 
```
###### numberValidator: Valida se é um número valido.
###### isEmptyValidator: Valida se validador está vazio.

##### address: Responsável por todas as validações de endereço.
```bash
    npm run test -- --findRelatedTests src/validator/address/address.spec.ts                 
```
###### cepValidator: Valida se o valor é um cep valido.

##### contact: Responsável por todas as validações de contato.
```bash
    npm run test -- --findRelatedTests src/validator/contact/contact.spec.ts                 
```
###### emailValidator: Valida se o valor é um e-mail valido.
###### phoneValidator: Valida se o valor é um telefone valido.
###### mobileValidator: Valida se o valor é um telefone celular valido.

##### document: Responsável por todas as validações de documento.
```bash
    npm run test -- --findRelatedTests src/validator/document/document.spec.ts                 
```
###### cpfValidator: Valida se o valor é um cpf valido.

##### password: Responsável por todas as validações de senha.
```bash
    npm run test -- --findRelatedTests src/validator/password/password.spec.ts                 
```
###### minLength: Valida se o valor possui o nũmero mínimo de caracteres.
###### leastOneLetter: Valida se o valor possui ao menos uma letra.
###### leastOneNumber: Valida se o valor possui ao menos um número.
###### passwordValidator: Valida se o valor é uma senha valida.
###### leastOneSpecialCharacter: Valida se o valor possui ao menos um caractere especial.
###### confirmPasswordValidator: Valida se o valor de uma confirmação de senha é uma senha valida.

##### personal: Responsável por todas as validações de atributos de uma pessoa.
```bash
    npm run test -- --findRelatedTests src/validator/personal/personal.spec.ts                 
```
###### nameValidator: Valida se o valor é um nome válido.
###### genderValidator: Valida se o valor é um gênero válido.

##### date: Responsável por todas as validações de datas.
```bash
    npm run test -- --findRelatedTests src/validator/date/date.spec.ts                 
```
###### dayValidator: Certifique-se de que o dia esteja dentro dos limites apropriados de ser maior que 1 e menor que e igual a 31.
###### yearValidator: Valida se o valor do ano passado é válido.
###### monthValidator: Valida se o valor do mês passado é válido.
###### dateOfBirthValidator: Valide se é uma data válida e é-se maior de idade

##### file: Responsável por todas as validações de arquivos.
```bash
    npm run test -- --findRelatedTests src/validator/file/file.spec.ts                 
```
###### imageTypeValidator: Valida se o tipo do arquivo é de uma imagem.

### window:
#### Funções relacionadas ao objeto `window` (provavelmente para navegadores).
```bash
    npm run test -- --findRelatedTests src/window/window.spec.ts               
```

### error:
#### Função relacionado a tratamento de erros.
```bash
    npm run test -- --findRelatedTests src/error/error.spec.ts               
```

### month:
#### Função relacionado a tratamento de meses.
```bash
    npm run test -- --findRelatedTests src/month/month.spec.ts              
```
##### getMonthIndex: Responsável por transformar o enum de mês em um índice de meses.
##### validateMonth: Verifica se é um mês valido.
##### getCurrentMonth: Responsável por retornar o mês atual.
##### getMonthByIndex: Responsável por transformar um índice em um enum de mês.

### entities
#### Função relacionado a tratamento entidades.
```bash
    npm run test -- --findRelatedTests src/entities/entities.spec.ts               
```
##### findEntityBy: Busca uma entidade a partir de uma lista e retorna o resultado.
##### transformObjectDateAndNulls: Formata uma entidade ou um grupo de entidades transformando tudo que for null em undefined e o que for data em Date.
