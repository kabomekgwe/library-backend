const express = require('express');
const router = express.Router();

const connection = require('../db');

router
    .get('/', (req, res, next) => {
        connection.query('Select uuid ,title, description from books', (err, results, fields) => {
            if (err) throw err;
            res.status(200).json(results)
        })
    }) 
  
router
    .get('/:id', (req, res, next) => {
        const id = req.params.id;

        connection.query('Select * from books where uuid = ?', [id], (err, results, fields) => {
            if (err) throw err;
            res.status(200).json(results)
        })

    })
 
module.exports = router;