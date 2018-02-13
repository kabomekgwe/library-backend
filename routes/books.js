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
    .get('/:page', (req, res, next) => {
        current_page = request.params.page || 1
        items_per_page = 3
        start_index = (current_page - 1) * items_per_page
        total_items = Connection.query('SELECT * FROM books')
        total_pages = ceil(total_items / items_per_page)
       
      
    })
    .post('/', (req, res, next) => {
        const book = {
            bookdid: req.body.bookid,
            userid: +req.body.userid,

        };
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
    
// .put('/:id', (req, res, next) => {

// });

module.exports = router;