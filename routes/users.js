const express = require('express');
const router = express.Router();
const connection = require('../db');
const bcrypt = require('bcrypt');

const lodash = require('lodash');
const config = require('../config');

const dotenv =require('dotenv');


const secretKey = require('crypto').randomBytes(256).toString('hex');


function getUserDB(email, done) {
    connection.query('SELECT * FROM users WHERE email = ? LIMIT 1', [email], function (err, rows, fields) {
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
        connection.query('SELECT email,name,id , password from users WHERE email = ?  LIMIT 1 ', [email], (err, results, fields) => {
            if (results.length > 0) {
                const passwordCompare = bcrypt.compareSync(password, results[0].password);
                if (passwordCompare) {
                    res.status(200).json({id: results[0].id, name: results[0].name});
                }
            } else
                res.status(400).json('Username password combination incorrect');
        })
    
    })

router.post('/register', (req, res, next) => {

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
                connection.query('INSERT INTO users (name,surname,email,password)  values(?,?,?,?) ;'
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
