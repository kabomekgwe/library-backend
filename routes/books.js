const express = require('express');
const router = express.Router();

const Connection = require('../db');
router
    .get('/', (req, res, next) => {
        Connection.query('Select uuid ,title, description from books', (err, results, fields) => {
            if(err) throw err;
            res.status(200).json(results)
        })
    })
    // .post('/', (req, res, next) => {
    //     res.status(200).json({
    //         message: 'works'
    //     })
    // });

router
    .get('/:id', (req, res, next) => {
        const id = req.params.id;

        Connection.query('Select * from books where uuid = ?', [id], (err, results, fields) => {
            if(err) throw err;
            res.status(200).json(results)
        })
         
    })
    // .post('/:id', (req, res, next) => {

    // })
    // .delete('/:id', (req, res, next) => {

    // })
    // .put('/:id', (req, res, next) => {

    // });

module.exports = router;