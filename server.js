const express = require("express");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/user.routes');
require("dotenv").config({path: './config/.env'});
require('./config/db');
const {checkUser, requireAuth} = require("./middleware/auth.middleware");
const app = express();

app.use(express.json());
app.use(bodyParser.json()); //bodyPerser est peut-être rayé car bodyParser est intégré à express
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

//jwt
app.get('*', checkUser);
app.get('/jwtid', requireAuth, (req, res) => {
    res.status(200).send(res.locals.user._id)
});

//routes
app.use('/api/user', userRoutes);

//server
app.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
})