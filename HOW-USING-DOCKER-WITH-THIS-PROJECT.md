# Como instalar e usar o `docker` com este projeto

## Instalação do Docker 

### Windows ou MacOS
Usando Windows ou macOS para instalar o Docker, você precisa baixar o Docker Desktop do seguinte [link](https://docs.docker.com/desktop/setup/install/windows-install/)
Siga todas as instruções do instalador

### Ubuntu
#### No Terminal atualize o sistema para garantir mais segurança e confiabilidade
```sh
  sudo apt update 
  sudo apt upgrade 
```
#### Instale pacotes de pré-requisitos
```sh
  sudo apt-get install  curl apt-transport-https ca-certificates software-properties-common
```
O Comando `curl` permite a transferência de dados.

O Comando `apt-transport-https` permite que o gerenciador de pacotes transfira os `tiles` e os dados através de https.

O Comando `ca-certificates` permite que o navegador da `web` e o sistema verifiquem certificados de segurança.

O Comando `software-properties-common` Adiciona scripts para gerenciar o software.

#### Adicione os repositórios do Docker
1 - Adicione uma chave GPG.
```sh
  curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -
 
```
2 - Adicione o repositório.
```sh
  sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" 
```
3 - Atualize as informações do repositório.
```sh
  sudo apt update  
```
4 - Garanta que você está instalando a partir do repositório do Docker, ao invés do repositório padrão do Ubuntu ao usar este comando:
```sh
  apt-cache policy docker-ce 
```
A saída correta vai ficar como o texto a seguir, com diferentes números de versões:
```sh
  docker-ce:
   Installed: (none)
   Candidate: 16.04.1~ce~4-0~ubuntu
   Version table:
       16.04.1~ce~4-0~ubuntu 500
            500 https://download.docker.com/linux/ubuntubionic/stableamd64packages 
```
#### Instalar o Docker no Ubuntu
```sh
  sudo apt install docker-ce 
```

#### Verificar Status do Docker
```sh
  sudo systemctl status docker 
```
obs: Após a instalação, em qualquer um dos `Sistemas Operacionais`, será necessário a reinicialização do computador

## ‘Download’ imagem do postgres

Neste projeto usaremos o banco de dados postgres, mas o conceito será o mesmo para qualquer banco de dados que quiser usar

Após reiniciar a sua máquina, abra o terminal da sua escolha

E execute o seguinte comando

```sh
  docker pull postgres 
  // ou se estiver usando ubuntu
  sudo docker pull postgres
```

O comando acima irá baixar uma imagem do postgres

Para verificar se o `download` foi bem-sucedido, execute o seguinte comando

```sh
  docker images
  // ou se estiver usando ubuntu
  sudo docker images 
```

Após executar o comando acima, serão exibidas as informações básicas da imagem e confirmará que ela foi baixada, veja o exemplo abaixo:

```sh
  REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
  postgres     latest    fe4efc6901dd   3 weeks ago   614MB 
```

Se estiver a utilizar o Windows ou o macOS é possível visualizar a imagem através do Docker ‘Desktop’ na aba de imagens

## building postgres container

Para este projeto usaremos as configurações padrão, definiremos apenas o login e a senha e o nome do nosso banco de dados

```sh
  docker run --name postgresDB -p 5432:5432 -e POSTGRES_USER=localhost -e POSTGRES_PASSWORD=localhost -e POSTGRES_DB=postgressDB -d postgres 
  // ou se estiver usando ubuntu
  sudo docker run --name postgresDB -p 5432:5432 -e POSTGRES_USER=localhost -e POSTGRES_PASSWORD=localhost -e POSTGRES_DB=postgressDB -d postgres 
```

O Comando `--name postgresDB` nomeará o container.

O Comando `-p 5432:5432`  definiremos a porta de acesso a ser utilizada, aqui utilizaremos o padrão do Postgres que é 5432.

O Comando `-e POSTGRES_USER=localhost` definirá o nome de usuário para autenticação no banco de dados, neste caso usaremos o valor localhost.

O Comando `-e POSTGRES_PASSWORD=localhost`  definiremos a senha de acesso para autenticação no banco de dados neste caso usaremos o valor localhost.

O Comando `-e POSTGRES_DB=postgressDB`  definirá o nome do nosso banco de dados no qual escolhemos o nome postgresDB.

O Comando `-d`  executará o nosso container detached, ou seja, em segundo plano, sem bloquear o seu terminal.

O Comando `postgres`  indica o container a ser executado

Após executar esses comandos no terminal, o id do container que está sendo executado será exibido.

example: 

```sh
  6e1e77c56b8d4223828fbb7c1a6b0c7ce2f1e0a9db69b1fec32a95f20bc1aea4 
```

Para confirmar se o container está realmente em execução, você pode executar o seguinte comando

```sh
  docker ps 
  // ou se estiver usando ubuntu
  sudo docker ps 
```

After executing this command, the following information will be displayed

```sh
  CONTAINER ID   IMAGE      COMMAND                  CREATED         STATUS         PORTS                    NAMES
6e1e77c56b8d   postgres   "docker-entrypoint.s…"   2 minutes ago   Up 2 minutes   0.0.0.0:5432->5432/tcp   postgresDB 
```

Se estiver a utilizar Windows ou macOS é possível ver essas informações no Docker ‘Desktop’ e apenas abrir a aba do container.


No nosso projeto criamos um banco de dados chamado `portfolio`, neste caso você pode usar qualquer programa para criar o banco de dados.

Observação: se você desligar o computador ou fechar o Docker, será necessário abrir e executar o Docker para poder acessar o banco de dados.



## Docker Compose
### O que é
O Docker Compose é uma ferramenta usada para definir e executar aplicativos Docker multi-contêineres.
Com o Compose, você pode usar um arquivo YAML para configurar todos os serviços que seu aplicativo precisa e,
em seguida, ativar todo o ambiente com um único comando.

### Como instalar
#### Windows ou macOS
Essa ferramenta ja é instalada por padrão.

#### Ubuntu
Para garantir que vamos obter a versão estável mais atualizada do Docker Compose,
faremos o download deste software a partir do seu [repositório oficial do Github](https://github.com/docker/compose).

Primeiro, confirme a versão mais recente disponível em sua [página de releases](https://github.com/docker/compose/releases).
A versão estável mais atual é a v2.33.0.

O comando a seguir irá baixar a release 2.33.0 e salvar o arquivo executável
em /usr/local/bin/docker-compose, 
que tornará este software globalmente acessível como docker-compose:
```sh
  sudo curl -L "https://github.com/docker/compose/releases/download/2.33.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose 
```

Em seguida, defina as permissões corretas para que o comando docker-compose seja executável:
```sh
  sudo chmod +x /usr/local/bin/docker-compose
```

Para verificar se a instalação foi bem-sucedida, execute:
```sh
  docker compose --version
```



### Como usar
#### Foi criado na raiz do projeto um arquivo chamado `docker-compose.yml`:
```yaml
  version: '3.8'

  services:
    postgres:
      container_name: postgresDB
      image: postgres:latest
      ports:
        - "5432:5432"
      environment:
        POSTGRES_USER: localhost
        POSTGRES_PASSWORD: localhost
        POSTGRES_DB: postgresDB
      volumes:
        - postgres_data:/var/lib/postgresql/data
      restart: unless-stopped

  volumes:
    postgres_data:
```
`services` Define um serviço chamado `postgres`.

`container_name` Define o nome do container como `postgresDB`.

`image` Usa a imagem oficial do PostgreSQL mais recente do Docker Hub.

`ports` Publica a porta 5432 do container para a porta 5432 no host.

`environment` Define as variáveis de ambiente:

  `POSTGRES_USER`: Nome do usuário do banco PostgreSQL.
 
  `POSTGRES_PASSWORD`: Senha para autenticar o usuário.

  `POSTGRES_DB`: Nome do banco de dados a ser criado.

`volumes` Garante que os dados ficarão persistidos em um volume chamado `postgres_data`, mesmo que você reinicie o container ou a máquina.

`restart` Define a política de reinício para o container. A opção `unless-stopped` faz com que o container reinicie automaticamente, a menos que seja explicitamente parado com um comando.


#### Para iniciar o docker pode ser utilizado o comando, na raiz do projeto.
```sh
  docker compose up -d
```
Isso iniciará o serviço em segundo plano (`-d` significa "detached").
#### Para parar o container pode ser utilizado o comando, na raiz do projeto.
```sh
  docker compose down
```