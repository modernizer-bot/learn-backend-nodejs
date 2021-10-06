const express = require('express');
const morgan = require('morgan');
const bodyparser = require("body-parser")
const path = require('path')
const connectDB = require('./server/database/connection');

require('dotenv').config();


const app = express();

// dotenv.config
const PORT = process.env.PORT || 8080

//log requests
app.use(morgan('tiny'))

//connection mongodb
connectDB()

// parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }))

//set view engine
app.set("view engine", "ejs")
// app.set("views", path.resolve(__dirname, "views/ejs"))

//load assets
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

//load routers
app.use('/', require('./server/routes/router'))


app.listen(PORT, () => console.log(`server is runing on http://localhost:${PORT}`))