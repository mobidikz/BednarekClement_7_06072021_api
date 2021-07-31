# API

Ce projet contient l'API, elle est basée sur Node.js, Express, Sequelize et SQLite.

## Installation du projet

1. cloner le dépôt
2. installer les dépendance avec `npm i`

## Mémoire

### Créer un modèle
Cette commande créé également le fichier de migration.

```sh
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
```

### Exécuter les migrations
```sh
npx sequelize-cli db:migrate
```

### Annuler la dernière migration
```sh
npx sequelize-cli db:migrate:undo
```

### Générer un seeder
```sh
npx sequelize-cli seed:generate --name demo-user
```

### Exécuter les seeders
```sh
npx sequelize-cli db:seed:all
```
