const mongoose = require("mongoose");

mongoose
    .connect("mongodb+srv://" + process.env.DB_USER_PASS + "@cluster0.er7qz.mongodb.net/projet7",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
    }
    )
    .then(() => console.log("Connected to MongoDb"))
    .catch((err) => console.log("Failed to connect to MongoDB", err));