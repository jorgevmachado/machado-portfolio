# Como usar o `storybook` com o React

## Storybook
### É uma ferramenta de desenvolvimento de interfaces de usuário (UI) que permite criar, testar e documentar componentes de interface em isolamento. Aqui está uma explicação resumida:
### Características:
#### 1 - Criação de componentes UI reutilizáveis.
#### 2 - Testes unitários e de integração.
#### 3 - Documentação automática.
#### 4 - Suporte a múltiplos frameworks (React, Angular, Vue.js, etc.).
#### 5 - Integração com ferramentas de design (Figma, Sketch, Adobe XD).
### Vantagens:
#### 1 - Acelera o desenvolvimento de interfaces.
#### 2 - Melhora a consistência visual.
#### 3 - Facilita a colaboração em equipe.
#### 4 - Reduz erros e bugs.
#### 5 - Ajuda a manter a documentação atualizada.
### Considerações finais:
#### 1 - Escalabilidade: Storybook é ideal para projetos complexos.
#### 2 - Integração: Compatível com diversas tecnologias.
#### 3 - Documentação: Automática e personalizável.
#### 4 - Colaboração: Facilita trabalho em equipe.
#### 5 - Manutenção: Fácil atualização de componentes.
#### 6 - Acessibilidade: Testes de acessibilidade integrados.
#### 7 - Custo: Gratuito e de código aberto.

## Instalação
### No terminal, na raiz do projeto, execute o comando de inicialização
### Obs: a lib react deverá estar como dependência.
```sh
  npx storybook init 
```
### Após a execução desse comando, será questionado se gostaria de ja instalar as dependências do storybook, é so dar um enter.
### Caso não consiga detetar o builder, ele ira questionar qual builder deseja utilizar.
```
We where not able to detect the right builder for your project. Please select one:
Vite
Webpack 5
```
### No caso para esse projeto usarémos o `Webpack 5`