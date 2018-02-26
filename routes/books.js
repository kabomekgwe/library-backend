const express = require('express');
const router = express.Router();

const connection = require('../db');

router
    .get('/', (req, res, next) => {
        connection.query('Select uuid ,title, description from books ', (err, results) => {
            if (err) {
                return next(err);
            }
            return res.status(200).json(results)
        })
    }) 
  
router
    .get('/:id', (req, res, next) => {
        const id = req.params.id;
        console.log("Got an ID: " + id);
        connection.query('Select * from books where uuid = ?', [id], (err, results) => {
            if (err) {
              
                return next(err);
            }
        //     if(results.length < 0) {
        //    return res.json(results);
         
        //     } 
        //     else {
        //      return  res.status(404).json(`User with id: ${id} not found`);
        //        console.log(`User with id: ${id} not found`);
         
               
        //     }
        if(results.length == 0)
        return  res.status(404).json(`User with id: ${id} not found`);
        else
        return res.json(results);
            
        })

    })
 
module.exports = router;