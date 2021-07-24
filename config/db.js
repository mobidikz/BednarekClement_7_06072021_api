// const mongoose = require("mongoose");

// mongoose
//     .connect("mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.er7qz.mongodb.net/projet7",
//     {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//         useCreateIndex: true,
//         useFindAndModify: false
//     }
//     )
//     .then(() => console.log("Connected to MongoDb"))
//     .catch((err) => console.log("Failed to connect to MongoDB", err));


// const { Sequelize } = require('sequelize');

// Option 1: Passing a connection URI
// module.exports = new Sequelize('sqlite::memory:') // Example for sqlite

// Option 2: Passing parameters separately (sqlite)
// module.exports = new Sequelize({
//   dialect: 'sqlite',
//   storage: './database.sqlite'
// });

// Option 2: Passing parameters separately (other dialects)
// const sequelize = new Sequelize('database', 'username', 'password', {
//   host: 'localhost',
//   dialect: /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
// });