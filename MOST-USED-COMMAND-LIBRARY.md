# MOST USED COMMAND LIBRARY

## npm

### init
#### Inicia um arquivo `package.json`.
##### A `flag` -y é para aceitar a construção padrão sem precisar aceitar algo no terminal.
```sh
  npm init -y 
```

### kill ports
#### No terminal execute esse comando para derrubar qualquer serviço rodando naquela porta
### Nesse exemplo ele derruba a porta 9000
```sh
  sudo kill -9 `sudo lsof -t -i:9000`
  sudo kill -9 $(lsof -t -i:9000) 
```
