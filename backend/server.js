
require('dotenv').config();
const express = require('express');
// var cookieParser = require('cookie-parser');
const router = require('./router/router');
// const adminRouter = require('./router/adminRouter');
const connect = require('./config/databaseconfig');
const tokenModal = require("./modals/tokenModal");
var cors = require('cors');
const Port = process.env.PORT

const app=express();

//cors
app.use(cors());


//cookieParser
// app.use(cookieParser());
app.use(express.static('./uploads'));
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

//connect to Database
const url = process.env.DATABASE_URL;
connect(url);

// json
app.use(express.json({limit: '5mb'}));

//load routs
app.use('/api' , router)

// routing
app.get('/', (req,res)=>{
    res.send("Hi , i'm Live")
})


// tokenModal.createIndexes();


//  start the server
const start = async( )=>{
    try {
            app.listen(Port , ()=>{
            console.log(`server port is ${Port}`);
        })
        
    } catch (error) {
        console.log(error);
    }
}
start();




