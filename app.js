const express = require('express')
const app = express()
const ejslayout = require('express-ejs-layouts')
const ejs = require('ejs')
const path = require('path')
const bodyParser = require('body-parser')
const session = require('express-session')
const NodeCache = require("node-cache");
require('dotenv').config()
const cors= require('cors');
const  http  =require("http");



// cache data setup
const myCache = new NodeCache();
app.set('myCache', myCache)

// body parser
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//session setup
app.use(session({ secret: process.env.APPSKU, saveUninitialized: true, resave: true, name: process.env.APPSKU }));

// public path set
app.use(express.static('public'));

app.use(cors({
    origin: '*',
  }));
  
// ejs setup
app.set('views', path.join(__dirname, '/views'))
app.set('view engine', 'ejs')
app.use(ejslayout)

// routes setup
require('./routes/web')(app);
require('./routes/api')(app);

let server = http.createServer(app);

const port = process.env.PORT
server.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})



