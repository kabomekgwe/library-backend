const express = require('express');
const router = express.Router();
const Connection = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const lodash = require('lodash');
const config = require('../config');
const passport = require('passport');
const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const dotenv =require('dotenv');

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET_OR_KEY
};

const Strategy = new JwtStrategy(opts, (payload, next) => {
    const user = null;
    next(null, user);
})

const { body,check , validationResult } = require('express-validator/check');
const { matchedData, sanitize } = require('express-validator/filter');
const secretKey = require('crypto').randomBytes(256).toString('hex');

function createToken(user) {
    return jwt.sign(lodash.omit(user, 'password'), config.secretKey, { expiresIn: 60 * 60 * 5 });
}
function getUserDB(email, done) {
    Connection.query('SELECT * FROM users WHERE email = ? LIMIT 1', [email], function (err, rows, fields) {
        if (err) throw err;
        done(rows[0]);
    });
}


router.post('/login', (req, res, next) => {
    const password = req.body.password;
    const email = req.body.email;
    if ( !req.body.password  || !req.body.email ) {
        return res.status(400).send("You must send the username and the password");
    }else
        Connection.query('SELECT email,name,id , password from users WHERE email = ?  LIMIT 1 ', [email], (err, results, fields) => {
            if (results.length > 0) {
                const k = bcrypt.compareSync(password, results[0].password);
                if (k) {
                    res.status(200).json({id: results[0].id, name: results[0].name});
                }
            } else
                res.status(400).json('Username password combination incorrect');
        })
    
    })

router.post('/register',
    [check('name', 'Please Enter Your Name').isLength({min: 3, max: 35}).trim(),
    check('password', 'Password Must Contain UpperCase, LowerCase and numbers').isAlphanumeric(),
    check('email').isEmail().trim().withMessage('Incorrect Email format'),
    check('surname', 'Please Enter Your Surname').isLength({min: 3, max: 35}).trim()], (req, res, next) => {

    if (!req.body.name || !req.body.password || !req.body.email || !req.body.surname) {
        return res.status(400).send("You must send the username and the password");
    }
    getUserDB(req.body.email, (user) => {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
            if (!user) {
                const user = {
                    name: req.body.name,
                    surname: req.body.surname,
                    email: req.body.email,
                    password: hash
                };
                Connection.query('INSERT INTO users (name,surname,email,password)  values(?,?,?,?) ;'
                    , [user.name, user.surname, user.email, user.password], (err, results, fields) => {
                        res.status(200).json({ id: results.insertId, user: user.name});
                    });

            } else {
                res.status(400).json('A user with that email already exists');
            }
        })
    })
});

module.exports = router;
