const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
const postRoutes = require('./routes/post.routes');
require("dotenv").config();
const { checkUser, requireAuth } = require("./middleware/auth.middleware");
const cors = require('cors');

const app = express();

const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    'allowedHeaders': ['sessionId', 'Content-Type'],
    'exposedHeaders': ['sessionId'],
    'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
    'preflightContinue': false
}

app.use(express.static('public'));
app.use(cors(corsOptions));

app.use(express.json());
app.use(bodyParser.json()); //bodyPerser est peut-être rayé car bodyParser est intégré à express
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user.id + "")
});

//routes
app.use('/api/user', userRoutes);
app.use('/api/post', postRoutes);

//server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})