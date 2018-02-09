const express = require('express'),
      bodyParser = require('body-parser'),
      cors  =   require('cors'),
      
      morgan = require('morgan');
      const expressValidator = require('express-validator');
      


//instantiation
const app = express();   

//route
const bookRoutes = require('./routes/books');
const userRoutes = require('./routes/users');
const borrowrRoutes = require('./routes/borrows');
const Connection = require('./db');



app.use( (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:4200");
    res.setHeader("Access-Control-Allow-Headers", 
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials, Allow-File-Access-From-Files");
    res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'DELETE', 'PUT');
    res.setHeader('Access-Control-Allow-Credentials','true');
    
    next();
})
//middleware 
    //parse application/x-www-form-urlencoded and parse application/json

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json())

app.use(morgan('dev'));
app.use(expressValidator());
 //cors
 //app.use(cors());


app.use('/books', bookRoutes);
app.use('/user', userRoutes);
app.use('/borrow', borrowrRoutes);

   





const port = 3000;
app.listen( process.env.PORT || port);
console.log(`running on port ${port}`);