const express = require('express');
const router = express.Router();

const connection = require('../db');

function checkIfBookBorrowed(userid, bookid, done) {
    connection.query('SELECT * FROM borrows WHERE userid = ? AND bookid = ? AND returned = "No" LIMIT 1', [userid, bookid], function (err, rows, fields) {
        if (err) throw err;
        done(rows[0]);
    });
}

router.post('/', (req, res, next) => {

    checkIfBookBorrowed(req.body.userid, req.body.bookid, (borrow) => {
        if (!borrow) {
            connection.query('INSERT INTO borrows(userid, bookid) VALUES(?,?)', [req.body.userid, req.body.bookid], (err, results, fields) => {
                if (err) throw err.message;
                res.status(200).json(results);
            })
        } else {
            res.status(400).json('Book Already Borrowed');
        }
    })

})
  router  .get('/:userid', (req, res, next) => {
        connection.query('select books.title, books.author, books.publisher, books.website, borrows.returned, borrows.created_on, borrows.updated_on  from borrows  ' +
        '  inner join books on books.id = borrows.bookid   ' +
        '  JOIN  users on users.id = ?  order by  borrows.id', [req.params.userid], (err, results, fields) => {
            if (err) throw err.message;
            res.status(200).json(results);
           
        })
    })

router
    .get('/:userid/:answer', (req, res, next) => {
        connection.query('select books.title,borrows.created_on, books.id, books.subtitle, books.author from borrows ' +
            '  inner join books on books.id = borrows.bookid  ' +
            '  JOIN  users on users.id = ? where borrows.returned = ? '
            , [req.params.userid, req.params.answer], (err, results, fields) => {
                if (err) throw err.message;
                res.status(200).json(results)
            })
    })

router.patch('/', (req, res, next) => {
    connection.query("UPDATE borrows SET returned = 'yes' where userid = ? AND bookid = ?",
        [req.body.userid, req.body.bookid], (err, results, fields) => {
            if (err) throw err.message;
            res.status(200).json(results)
            console.log(req.body);
        })
})

module.exports = router;