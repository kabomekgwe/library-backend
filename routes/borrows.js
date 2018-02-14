const express = require('express');
const router = express.Router();

const Connection = require('../db');
router

    .post('/', (req, res, next) => {
        Connection.query('INSERT INTO borrows(userid, bookid) VALUES(?,?)', [req.body.userid, req.body.bookid], (err, results, fields) => {
            if (err) throw err.message;
            res.status(200);
        })
    });
router
    .get('/:userid/:answer', (req, res, next) => {

        Connection.query('select books.title,borrows.created_on, books.subtitle, books.author from borrows ' +
            '  inner join books on books.id = borrows.bookid  ' +
            '  JOIN  users on users.id = ? where borrows.returned = ? '
            , [req.params.userid, req.params.answer], (err, results, fields) => {
                if (err) throw err.message;
                res.status(200).json(results)
            })
    })

router.patch('/', (req, res, next) => {
    Connection.query("UPDATE borrows SET returned = 'yes' where userid = ? AND bookid = ?",
        [req.body.userid, req.body.bookid], (err, results, fields) => {
            if (err) throw err.message;
            res.status(200).json(results)
            console.log(req.body);
        })
})

module.exports = router;