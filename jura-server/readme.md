# Jura (tasks manager) : Server

- graphql
- apollo-server
- typescript
- type-graphql
- typeorm
- jsonwebtoken
- argon2
- mysql

1- Créer la base de données dans MYSQL

CREATE SCHEMA jura ;

2- Commande pour générer une migration :

(après avoir créer le script suivant dans le package.json : "typeorm:cli": "ts-node ./node_modules/typeorm/cli")

```sh
npm run typeorm:cli -- migration:generate -n <migration-name>
```

(ex : "npm run typeorm:cli -- migration:generate -n InitDataBase" => création de la migration nommée InitDataBase)

3- Commande pour lancer la migration :

```sh
npm run typeorm:cli -- migration:run
```

=> Le MPD de la base de données créée sera le suivant :

![physical data model](https://imgur.com/3iaLT6i.png)

4- Lancement du serveur :

(nb: En amont, il faut configurer le fichier ".env".)

```sh
npm run start:dev
```

## Docker

```sh
docker-compose -f docker-compose.dev.yml up --build
```

Dans un autre terminal :

```sh
docker ps (pour lister les containers en marche)

```

puis copier l'id du container "server"

```sh
docker exec -it (id du container)
```

=> ouvre "/app #" (commande pour entrer dans le container)

```sh
npm run typeorm:cli -- migration:run
```
