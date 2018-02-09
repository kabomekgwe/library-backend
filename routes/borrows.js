const express = require('express');
const router = express.Router();


router
    .get('/', (req, res, next) => {
        Book.find({})
            .select('title description _id')
            .then(books => {
                res.status(200).json(books);
            })
            .catch(err => {
                next(err)
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

        Book.findById(id)
         .exec()
         .then(data => {
             console.log(data);
             res.status(200).json(data);
         })
         
    })
    // .post('/:id', (req, res, next) => {

    // })
    // .delete('/:id', (req, res, next) => {

    // })
    // .put('/:id', (req, res, next) => {

    // });

module.exports = router;