const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
const stickersRoutes = require('./api/routes/stickers');

mongoose.connect(
    "mongodb://localhost:27017/stickerio",
    {
       useNewUrlParser: true
    }
);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Prevent CORS ERROR
app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header('Access-Control-Allow-Headers',
    'Origin,X-Requested-With, Content-Type,Accept,Authorization'
    );
    if(req.method === 'OPTIONS')
    {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});

//Handling all routes
app.use('/stickers',stickersRoutes);

//Handling all Errors
app.use((req,res,next)=>{
    const error = new Error('Not found');
    error.status= 404;
    next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message: error.message
        }
    });
})

module.exports = app;