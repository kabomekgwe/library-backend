const express = require('express');
const router = express.Router();

const Connection = require('../db');
router
    .get('/', (req, res, next) => {
        Connection.query('Select uuid ,title, description from books', (err, results, fields) => {
            if (err) throw err;
            res.status(200).json(results)
        })
    }) 
    .post('/', (req, res, next) => {
        Connection.query('INSERT INTO borrows(userid, bookid) VALUES(?,?)', [req.body.userid, req.body.bookid], (err, results, fields) => {
            if (err) throw err.message;
            res.status(200);
        })
    })
router
    .get('/:id', (req, res, next) => {
        const id = req.params.id;

        Connection.query('Select * from books where uuid = ?', [id], (err, results, fields) => {
            if (err) throw err;
            res.status(200).json(results)
        })

    })
 
module.exports = router;