# Jura (tasks manager) : Server

- graphql
- apollo-server
- typescript
- type-graphql
- typeorm
- jsonwebtoken
- argon2
- mysql

1- Create the database in MYSQL

CREATE SCHEMA jura ;

2- Command to generate a migration :

(after creating the following script in the package.json : "typeorm:cli": "ts-node ./node_modules/typeorm/cli")

```sh
npm run typeorm:cli -- migration:generate -n <migration-name>
```

(ex : "npm run typeorm:cli -- migration:generate -n InitDataBase" => creation of the migration named InitDataBase)

3- Command to start the migration :

```sh
npm run typeorm:cli -- migration:run
```

=> The PDM of the database created will be as follows :

![physical data model](https://imgur.com/3iaLT6i.png)

4- Server launch :

(nb: Before, you must configure the ".env" file.)

```sh
npm run start:dev
```

## Docker

```sh
docker-compose -f docker-compose.dev.yml up --build
```

In another terminal :

```sh
docker ps (to list the running containers)

```

then copy the container id "server"

```sh
docker exec -it (container id)
```

=> open "/app #" (command to enter the container)

```sh
npm run typeorm:cli -- migration:run
```
