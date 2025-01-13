# How to Install and using docker with this project

## Install Docker 

If you are using Windows or macOS to install Docker you need to download Docker Desktop from the following [link](https://docs.docker.com/desktop/setup/install/windows-install/)
Follow all installer instructions

obs: After installation it will ask to restart the computer

## Download postgres image

In this project we will use the postgres database but the concept will be the same for any database we use

After restarting your machine, open the terminal of your choice

And run the following command

```sh
  docker pull postgres 
```

The above command will download an image from postgres

To check if the download was successful, run the following command

```sh
  docker images 
```

After executing the command above, the basic information of the image will be displayed and confirm that it has been downloaded, see the example below:

```sh
  REPOSITORY   TAG       IMAGE ID       CREATED       SIZE
  postgres     latest    fe4efc6901dd   3 weeks ago   614MB 
```

It is also possible to view the image through Docker Desktop in the images tab

## building postgres container

For this project we will use the default settings, we will only define the login and password and the name of our database

```sh
  docker run --name postgresDB -p 5432:5432 -e POSTGRES_USER=localhost -e POSTGRES_PASSWORD=localhost -e POSTGRES_DB=postgressDB -d postgres 
```

the Command `--name postgresDB` will name the container

the Command `-p 5432:5432`  will define the access port to be used, here we will use the Postgres default which is 5432

the command `-e POSTGRES_USER=localhost` will define the username to authenticate to the database in this case we will use the localhost value

the command `-e POSTGRES_PASSWORD=localhost`  will define the access password to authenticate to the database in this case we will use the localhost value

the command `-e POSTGRES_DB=postgressDB`  will define the name of our database in which we chose the name postgresDB

the command `-d`  will run our container detached, i.e. in the background without locking your terminal

the command `postgres`  indicates the container to be executed

After executing these commands in the terminal, the id of the container being executed will be displayed.

example: 

```sh
  6e1e77c56b8d4223828fbb7c1a6b0c7ce2f1e0a9db69b1fec32a95f20bc1aea4 
```

To confirm whether the container is actually running you can run the following command

```sh
  docker ps 
```

After executing this command, the following information will be displayed

```sh
  CONTAINER ID   IMAGE      COMMAND                  CREATED         STATUS         PORTS                    NAMES
6e1e77c56b8d   postgres   "docker-entrypoint.s…"   2 minutes ago   Up 2 minutes   0.0.0.0:5432->5432/tcp   postgresDB 
```

It is also possible to see this information in Docker Desktop and just open the container tab

In our project we created a database called `portfolio`, in this case you can use any program to create the database.

Note: If you turn off your computer or close Docker, you will need to open and run Docker so you can access the database.

