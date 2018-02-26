const express = require('express'),
      bodyParser = require('body-parser'),
      cors  =   require('cors'),
      dotenv    = require('dotenv');
      morgan = require('morgan');
//instantiation
const app = express();   
dotenv.config();  
//route
const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/users');
const borrowrRoutes = require('./routes/borrows');
const Connection = require('./db');

app.use( (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials, Allow-File-Access-From-Files");
    res.setHeader('Access-Control-Allow-Methods', "*");
    res.setHeader('Access-Control-Allow-Credentials','true');
    next();
})
//middleware 
    //parse application/x-www-form-urlencoded and parse application/json

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.use(morgan('dev'));
 //cors

app.use('/books', bookRoutes);
app.use('/user', userRoutes);
app.use('/borrow', borrowrRoutes);

app.use(function (err, req, res, next) {
//console.error(err.stack);    
    res.status(500).send('Something broke!')
  });


const port = 3000;
app.listen( process.env.PORT || port);
console.log(`running on port ${port}`);
module.exports = app;