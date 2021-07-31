
const models = require('../models');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require("../utils/errors.utils");
const bcrypt = require('bcrypt');

const maxAge =  3 * 24 * 60 * 60 * 1000; // = 3 journées en milliseconde 

const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
};

module.exports.signUp = async (req, res) => {
    const {pseudo, email, password} = req.body // écrit en destructuring

    try {
        const user = await models.User.create({ pseudo, email, password })
        res.status(201).json({ user: user.id})
    }
    catch(err) {
        const errors = signUpErrors(err);
        res.status(200).send({ errors })
    }
}

module.exports.signIn = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await models.User.findOne({ where: { email } });

        if (!user) {
            throw Error('incorrect email')
        }

        const auth = await bcrypt.compare(password, user.password);


        if (!auth) {
            throw Error('incorrect password');
        }

        const token = createToken(user.id);
        res.cookie('jwt', token, { httpOnly : true, maxAge });
        res.status(200).json({user: user.id})
    } catch (err){
        const errors = signInErrors(err);
        res.status(200).json({ errors });
    }
}

module.exports.logout = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
}