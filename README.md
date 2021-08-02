# API

Ce projet contient l'API, elle est basée sur Node.js, Express, Sequelize et SQLite.

## Installation du projet

1. cloner le dépôt
2. installer les dépendance avec `npm i`
3. créer un fichier .env à la racine du projet et y ajouter les variables d'environnement suivantes:
```sh
PORT=5000
CLIENT_URL=http://localhost:3000
TOKEN_SECRET=ftnuyby354344hhfttff
```
4. Créer la base de donnée avec la commande suivante :
```sh
npx sequelize-cli db:migrate
```
5. Créer les faux ulisateurs avec la commande suivante :
```sh
npx sequelize-cli db:seed:all
```
5. Lancer l'api avec la commande suivante :
```sh
npm start
```


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




https://sequelize.org/master/class/lib/model.js~Model.html#static-method-findOne