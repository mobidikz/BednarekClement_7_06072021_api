
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const models = require('../models')
const { signUpErrors, signInErrors } = require("../utils/errors.utils")

const maxAge =  3 * 24 * 60 * 60 * 1000; // = 3 journées en milliseconde 

const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
};

module.exports.signUp = async (req, res) => {
    const {pseudo, email, password} = req.body // écrit en destructuring

    try {
        if (password.length < 6) {
            const err = new Error();
            err.errors = [{message: 'password'}]
            throw err
        }

        const user = await models.User.create({ pseudo, email, password, picture: "uploads/profil/random-user.jpg" })
        res.status(201).json({ user: user.id})
    } catch (err) {
        const errors = signUpErrors(err);
        res.status(200).send({ errors })
    }
}

module.exports.signIn = async (req, res) => {
    const { email, password } = req.body

    try {
        const hashEmail = await bcrypt.hash(email, process.env.HASH_KEY);
        const user = await models.User.findOne({ where: { email: hashEmail } });

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