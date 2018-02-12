const express = require('express');
const router = express.Router();

const Connection = require('../db');
router
    
    .post('/', (req, res, next) => {
            const book = {
                bookdid: req.body.bookid ,
                userid: +req.body.userid,
              
            };

            Connection.query('INSERT INTO borrows(userid, bookid) VALUES(?,?)', [ req.body.userid, req.body.bookid], (err, results, fields) =>{
                if(err) throw err.message;

                res.status(200);
            })
            //console.log(book)
        });

router  
    .get('/:userid', (req, res, next) => {
       
    Connection.query('select books.title, books.subtitle, books.author from borrows ' + 
      '  inner join books on books.id = borrows.bookid  ' +
      '  JOIN  users on users.id = ? where borrows.returned = "No" '
    ,[req.params.userid], (err, results, fields) => {
        if(err) throw err.message;
        res.status(200).json(results)
    })
       
    })
 
module.exports = router;